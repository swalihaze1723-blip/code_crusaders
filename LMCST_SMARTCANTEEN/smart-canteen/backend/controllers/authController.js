const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { id, password } = req.body;
    if (!id || !password) {
      return res.status(400).json({ success: false, message: 'Please provide ID and password' });
    }

    const user = await User.findOne({ id: id.trim() });
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        department: user.department,
        departmentFull: user.departmentFull,
        year: user.year,
        class: user.class,
        group: user.group,
        breakStart: user.breakStart,
        breakEnd: user.breakEnd,
        assignedDeparture: user.assignedDeparture,
        assignedArrival: user.assignedArrival
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
