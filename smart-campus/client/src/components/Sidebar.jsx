import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = {
  student: [
    { label: 'Dashboard',      path: '/dashboard',     icon: '◈', tag: 'CORE' },
    { label: 'Notifications',  path: '/notifications', icon: '◉', tag: 'INBOX' },
  ],
  faculty: [
    { label: 'Dashboard',      path: '/dashboard',     icon: '◈', tag: 'CORE' },
    { label: 'Notifications',  path: '/notifications', icon: '◉', tag: 'INBOX' },
  ],
  admin: [
    { label: 'Dashboard',      path: '/dashboard',     icon: '◈', tag: 'CORE' },
    { label: 'Users Directory', path: '/users',        icon: '◎', tag: 'ADMIN' },
    { label: 'Notifications',  path: '/notifications', icon: '◉', tag: 'INBOX' },
  ],
};

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const items = navItems[user?.role] || navItems.student;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 20, 19, 0.82)',
            backdropFilter: 'blur(6px)',
            zIndex: 105,
          }}
        />
      )}

      <aside
        className={`sidebar-root ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'var(--sidebar-width)',
          height: '100vh',
          background: 'var(--color-bg-alt)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 110,
          transition: 'transform var(--transition-smooth)',
          overflow: 'hidden',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: 'var(--navbar-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {/* Circular icon badge — brand mark */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'transparent',
                border: '1.5px solid var(--color-border-cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: 'var(--color-cream)',
                flexShrink: 0,
              }}
            >
              ⬡
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  color: 'var(--color-cream)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                Smart<span style={{ color: 'var(--color-sage)' }}>Campus</span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}
              >
                Digital OS · v2.0
              </div>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="btn-fab"
            style={{ width: '30px', height: '30px', fontSize: '13px', display: 'none' }}
            id="sidebar-close-btn"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Vertical rail label */}
        <div
          style={{
            padding: 'var(--space-5) var(--space-5) var(--space-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <div style={{ height: '1px', flex: 1, background: 'var(--color-border)' }} />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              whiteSpace: 'nowrap',
            }}
          >
            Navigation
          </span>
          <div style={{ height: '1px', flex: 1, background: 'var(--color-border)' }} />
        </div>

        {/* Nav items */}
        <nav
          style={{
            flex: 1,
            padding: '0 var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}
        >
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: '0.7rem 0.9rem',
                borderRadius: 'var(--radius-full)',  /* pill shape */
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                background: isActive
                  ? 'var(--color-cream)'
                  : 'transparent',
                border: isActive
                  ? '1px solid var(--color-cream)'
                  : '1px solid transparent',
                transition: 'all var(--transition-fast)',
                textDecoration: 'none',
              })}
              onMouseEnter={(e) => {
                if (!e.currentTarget.classList.contains('active')) {
                  e.currentTarget.style.background = 'var(--color-cream-muted)';
                  e.currentTarget.style.color = 'var(--color-cream)';
                  e.currentTarget.style.borderColor = 'var(--color-border-cream)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.getAttribute('aria-current')) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              {/* Circular icon */}
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: '1px solid currentColor',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  flexShrink: 0,
                  opacity: 0.9,
                }}
              >
                {item.icon}
              </span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {/* Tag chip */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '9px',
                  fontWeight: 500,
                  padding: '2px 7px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(159, 179, 168, 0.12)',
                  color: 'var(--color-sage)',
                  border: '1px solid rgba(159, 179, 168, 0.2)',
                  letterSpacing: '0.1em',
                }}
              >
                {item.tag}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Hairline + status footer */}
        <div style={{ height: '1px', background: 'var(--color-border)', margin: '0 var(--space-4)' }} />

        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Engine label */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Supabase PG17
          </span>
          {/* Status pill */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 500,
              color: 'var(--color-success)',
              background: 'var(--color-success-bg)',
              border: '1px solid rgba(108, 184, 154, 0.25)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-success)',
                display: 'inline-block',
              }}
            />
            Online
          </span>
        </div>
      </aside>

      <style>{`
        @media (max-width: 860px) {
          .sidebar-root {
            transform: translateX(-100%);
          }
          .sidebar-root.open {
            transform: translateX(0);
          }
          #sidebar-close-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
