import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Authentication failed. Verify credentials.');
    } finally {
      setSubmitting(false);
    }
  }

  function fillAdminDemo() {
    setEmail('admin@smartcampus.dev');
    setPassword('admin123');
  }

  return (
    <div className="auth-page">
      {/* Big decorative ring accent (retro-futurist) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          border: '1px solid rgba(159, 179, 168, 0.04)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          border: '1px solid rgba(159, 179, 168, 0.055)',
          pointerEvents: 'none',
        }}
      />

      <div className="auth-card">
        {/* Diagonal directional tag */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-5)' }}>
          <span className="diagonal-tag">Portal Access · Secure</span>
        </div>

        {/* Hero headline */}
        <h1>
          Welcome
          <span className="accent-italic">back.</span>
        </h1>
        <p className="subtitle">Sign in to your Smart Campus workspace</p>

        {/* Hairline */}
        <div className="hairline" style={{ margin: 'var(--space-5) 0' }} />

        {/* Demo autofill chip */}
        <button
          type="button"
          onClick={fillAdminDemo}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-sage-muted)',
            border: '1px dashed rgba(159, 179, 168, 0.35)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--space-6)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-cream-muted)';
            e.currentTarget.style.borderColor = 'var(--color-border-cream)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--color-sage-muted)';
            e.currentTarget.style.borderColor = 'rgba(159, 179, 168, 0.35)';
          }}
          title="Click to auto-populate admin demo credentials"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {/* Circular icon badge */}
            <div
              className="icon-badge icon-badge-sm"
              style={{ width: 30, height: 30, fontSize: '14px' }}
            >
              ◈
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 800, color: 'var(--color-cream)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Autofill Admin Demo
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '2px' }}>
                admin@smartcampus.dev
              </div>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-sage)', letterSpacing: '0.06em' }}>
            Click ↵
          </span>
        </button>

        {error && (
          <div className="error-message">
            <span>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              className="input-field"
              placeholder="e.g. admin@smartcampus.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="input-field"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* CTA pill button with arrow */}
          <button
            type="submit"
            className="btn-cta"
            disabled={submitting}
            style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }}
          >
            {submitting ? 'Authenticating...' : 'Authorize & Enter'}
            <span className="btn-arrow">→</span>
          </button>
        </form>

        {/* Hairline */}
        <div className="hairline" style={{ margin: 'var(--space-6) 0 var(--space-5)' }} />

        <div className="auth-footer">
          New user?{' '}
          <Link to="/register" style={{ color: 'var(--color-cream)', fontWeight: 600, letterSpacing: '0.06em' }}>
            Create Account ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
