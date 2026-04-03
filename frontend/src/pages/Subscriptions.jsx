import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { api } from '../api';
import './Subscriptions.css';

const FEATURE_LABELS = {
  sports: 'Sports covered',
  showConfidence: 'Confidence scores',
  showAdvancedStats: 'Advanced stats',
  showAmericanOdds: 'American (moneyline) odds',
  showDrawOdds: 'Draw / 3-way odds',
  liveUpdates: 'Live odds updates',
  maxMatchupsPerSport: 'Games per sport',
};

const PLAN_COLORS = {
  free: { accent: '#64748b', glow: 'rgba(100,116,139,0.15)' },
  pro: { accent: '#6366f1', glow: 'rgba(99,102,241,0.2)' },
  elite: { accent: '#a855f7', glow: 'rgba(168,85,247,0.2)' },
};

function FeatureValue({ value }) {
  if (value === true) return <span className="feat-yes">✓</span>;
  if (value === false) return <span className="feat-no">✗</span>;
  if (Array.isArray(value)) return <span className="feat-val">{value.join(', ')}</span>;
  return <span className="feat-val">{value}</span>;
}

export default function Subscriptions() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [billing, setBilling] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getPlans().then(setPlans).finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (tierKey) => {
    setError('');
    setMessage('');
    setUpgrading(tierKey);
    try {
      const res = await api.upgrade(tierKey, billing);
      setMessage(res.message);
      await refreshUser();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpgrading('');
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    setError('');
    setMessage('');
    try {
      const res = await api.cancel();
      setMessage(res.message);
      await refreshUser();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="subs-loading"><div className="spinner" /><p>Loading plans…</p></div>;

  const currentTier = user?.tier || 'free';

  return (
    <div className="subs-page">
      <div className="subs-header">
        <h1>Choose your plan</h1>
        <p>Unlock sharper odds, more sports, and deeper analytics</p>

        <div className="billing-toggle">
          <button
            className={`billing-btn ${billing === 'monthly' ? 'billing-btn--active' : ''}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            className={`billing-btn ${billing === 'annual' ? 'billing-btn--active' : ''}`}
            onClick={() => setBilling('annual')}
          >
            Annual <span className="save-badge">Save ~25%</span>
          </button>
        </div>
      </div>

      {message && <div className="subs-success">{message}</div>}
      {error && <div className="subs-error">{error}</div>}

      <div className="plans-grid">
        {plans.map((plan) => {
          const colors = PLAN_COLORS[plan.key] || PLAN_COLORS.free;
          const isCurrent = currentTier === plan.key;
          const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const perLabel = billing === 'annual' ? '/yr' : '/mo';

          return (
            <div
              key={plan.key}
              className={`plan-card ${isCurrent ? 'plan-card--current' : ''}`}
              style={{ '--accent': colors.accent, '--glow': colors.glow }}
            >
              {isCurrent && <div className="current-badge">Current Plan</div>}
              {plan.key === 'elite' && <div className="popular-badge">⭐ Most Popular</div>}

              <h2 className="plan-name" style={{ color: colors.accent }}>{plan.name}</h2>
              <div className="plan-price">
                {price === 0 ? (
                  <span className="price-value">Free</span>
                ) : (
                  <>
                    <span className="price-value">${price.toFixed(2)}</span>
                    <span className="price-period">{perLabel}</span>
                  </>
                )}
              </div>

              <ul className="features-list">
                {Object.entries(FEATURE_LABELS).map(([key, label]) => (
                  <li key={key} className="feature-row">
                    <span className="feature-name">{label}</span>
                    <FeatureValue value={plan.features[key]} />
                  </li>
                ))}
              </ul>

              <div className="plan-action">
                {isCurrent ? (
                  <div className="current-plan-box">
                    <span>✓ Your current plan</span>
                    {currentTier !== 'free' && (
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel subscription
                      </button>
                    )}
                  </div>
                ) : plan.key === 'free' ? (
                  <button className="plan-btn plan-btn--outline" onClick={() => navigate('/dashboard')}>
                    Continue Free
                  </button>
                ) : (
                  <button
                    className="plan-btn plan-btn--primary"
                    style={{ background: `linear-gradient(135deg, ${colors.accent}, #a855f7)` }}
                    onClick={() => handleUpgrade(plan.key)}
                    disabled={upgrading === plan.key}
                  >
                    {upgrading === plan.key ? 'Processing…' : `Upgrade to ${plan.name}`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="subs-disclaimer">
        * In this demo, payments are simulated. In production, Stripe payment processing would be integrated.
        Responsible gambling: always bet within your means.
      </p>
    </div>
  );
}
