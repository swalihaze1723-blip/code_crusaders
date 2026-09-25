const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { studentId, studentName, department, items, total, paymentMethod, departureTime, arrivalTime } = req.body;

    const tokenNumber = Math.floor(100 + Math.random() * 900);
    const token = `SC-${tokenNumber}`;

    const newOrder = new Order({
      token,
      studentId,
      studentName,
      department,
      items,
      total,
      paymentMethod,
      paymentStatus: paymentMethod.includes('UPI') ? 'Completed' : 'Pending',
      departureTime: departureTime || '11:04 AM',
      arrivalTime: arrivalTime || '11:09 AM',
      status: 'Preparing'
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Food reservation confirmed',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrdersByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const orders = await Order.find({ studentId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { token } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { token },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order token not found' });
    }

    res.json({ success: true, message: `Status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
