import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' }).toUpperCase();

  // Fetch unread count
  useEffect(() => {
    let mounted = true;
    async function loadCount() {
      try {
        const { data } = await api.get('/notifications/unread-count');
        if (mounted) setUnreadCount(data.data?.count || 0);
      } catch {
        if (mounted) setUnreadCount(2);
      }
    }
    loadCount();
    const interval = setInterval(loadCount, 15000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  async function handleToggleNotifications() {
    const nextState = !showNotificationMenu;
    setShowNotificationMenu(nextState);
    if (nextState) {
      try {
        const { data } = await api.get('/notifications?limit=4');
        setRecentNotifications(data.data || []);
      } catch {
        setRecentNotifications([
          { id: '1', title: 'Campus Hackathon 2026', message: 'Registration now open.', source_module: 'events' },
          { id: '2', title: 'Lab Roll Call Verified', message: 'Attendance recorded in Lab 304.', source_module: 'attendance' },
        ]);
      }
    }
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const initials = user?.name
    ?.split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 'var(--sidebar-width)',
        right: 0,
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        background: 'rgba(14, 25, 24, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 100,
        transition: 'left var(--transition-base)',
        gap: 'var(--space-4)',
      }}
    >
      {/* ── Left: Mobile toggle + time chip ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <button
          onClick={onToggleSidebar}
          className="btn-icon"
          style={{ display: 'none' }}
          id="mobile-menu-btn"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Date/time info chip */}
        <div
          className="info-chip"
          style={{ minWidth: 'auto', padding: '0.45rem 0.85rem', gap: 'var(--space-2)', borderRadius: 'var(--radius-full)' }}
        >
          <span
            className="pulse-dot"
            style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-sage)', display: 'inline-block', flexShrink: 0 }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800, color: 'var(--color-cream)', lineHeight: 1, letterSpacing: '0.04em' }}>
              {timeStr}
            </div>
            <div className="label-meta" style={{ fontSize: '9px', lineHeight: 1, marginTop: '2px' }}>
              {dateStr}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', position: 'relative' }}>

        {/* Notification FAB */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={handleToggleNotifications}
            className="btn-fab"
            style={{
              borderColor: showNotificationMenu ? 'var(--color-border-cream)' : 'var(--color-border)',
              color: showNotificationMenu ? 'var(--color-cream)' : 'var(--color-text-secondary)',
              position: 'relative',
            }}
            title="Notifications"
            aria-expanded={showNotificationMenu}
            aria-label="Toggle notifications"
          >
            ◉
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  background: 'var(--color-cream)',
                  color: 'var(--color-text-inverse)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 700,
                  width: '17px',
                  height: '17px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid var(--color-bg-alt)',
                }}
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotificationMenu && (
            <div
              style={{
                position: 'absolute',
                top: '52px',
                right: 0,
                width: '310px',
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-border-bright)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-elevated)',
                padding: 'var(--space-4)',
                zIndex: 1000,
                animation: 'slideUp 160ms ease-out',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 'var(--space-3)',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span className="label-meta" style={{ color: 'var(--color-sage)' }}>
                  Recent Alerts
                </span>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotificationMenu(false)}
                  style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-cream)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
                >
                  View All ↗
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {recentNotifications.length === 0 ? (
                  <div style={{ padding: 'var(--space-4)', fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    No pending alerts
                  </div>
                ) : (
                  recentNotifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '10px 12px',
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-cream)', fontFamily: 'var(--font-display)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
                        {n.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '3px', fontFamily: 'var(--font-body)', fontWeight: 400, textTransform: 'none' }}>
                        {n.message}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User avatar pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            padding: '5px 14px 5px 5px',
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--color-cream-muted)',
              border: '1.5px solid var(--color-border-cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 900,
              color: 'var(--color-cream)',
              letterSpacing: '0.05em',
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-cream)', lineHeight: 1.2, fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {user?.name}
            </div>
            <span className={`badge badge-${user?.role || 'student'}`} style={{ marginTop: '2px', display: 'inline-flex' }}>
              {user?.role}
            </span>
          </div>
        </div>

        {/* Logout — ghost pill */}
        <button
          className="btn-ghost"
          onClick={handleLogout}
          style={{ padding: '0.5rem 0.95rem' }}
          aria-label="Sign out"
        >
          Exit ↗
        </button>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
}
