import { Link } from 'react-router-dom';
import './Landing.css';

const FEATURES = [
  { icon: '🧮', title: 'Advanced Odds Engine', desc: 'Elo ratings, Poisson goal models, and Pythagorean expectation combine to deliver near-perfect win probabilities.' },
  { icon: '📊', title: 'All Major Sports', desc: 'NFL, NBA, MLB, NHL, Soccer, Tennis, and MMA/UFC covered — with sport-specific statistical models.' },
  { icon: '⚡', title: 'Real-Time Updates', desc: 'Elite subscribers get live odds refreshed as game conditions change (injury reports, weather, lineups).' },
  { icon: '🔒', title: 'Subscription-Gated Intel', desc: 'Free previews for newcomers; unlock Pro or Elite tiers for full probability breakdowns and confidence scores.' },
  { icon: '💡', title: 'Confidence Scores', desc: 'Each matchup shows a 0–100 confidence score so you know exactly how strong the edge is.' },
  { icon: '💰', title: 'American & Decimal Odds', desc: 'See moneyline (+150/-130) and decimal (1.65) formats side-by-side for every game.' },
];

const SPORTS = [
  { emoji: '🏈', name: 'NFL' },
  { emoji: '🏀', name: 'NBA' },
  { emoji: '⚾', name: 'MLB' },
  { emoji: '🏒', name: 'NHL' },
  { emoji: '⚽', name: 'Soccer' },
  { emoji: '🎾', name: 'Tennis' },
  { emoji: '🥊', name: 'MMA/UFC' },
];

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">🎯 The Most Advanced Betting Odds Platform</div>
          <h1 className="hero-title">
            Near-Perfect Odds.<br />
            <span className="gradient-text">Every Sport. Every Game.</span>
          </h1>
          <p className="hero-subtitle">
            ElJefe uses multi-model statistical analysis — Elo ratings, Poisson distributions,
            Pythagorean expectation, and real-time form weighting — to deliver the sharpest
            betting probabilities available anywhere.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn--primary btn--lg">Start Free →</Link>
            <Link to="/subscriptions" className="btn btn--ghost btn--lg">View Plans</Link>
          </div>
          <div className="hero-sports">
            {SPORTS.map((s) => (
              <span key={s.name} className="sport-pill">{s.emoji} {s.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section">
        <h2 className="section-title">Why ElJefe?</h2>
        <p className="section-sub">Built for serious bettors who demand a statistical edge.</p>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section how-section">
        <h2 className="section-title">How Our Odds Engine Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Elo Ratings</h4>
            <p>Every team has a dynamic Elo rating updated after each game, accounting for margin of victory and opponent strength.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Sport-Specific Models</h4>
            <p>Soccer & Hockey use Poisson goal models. Basketball & Baseball use Pythagorean expectation. No one-size-fits-all guessing.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Form & Home Advantage</h4>
            <p>Recent performance (last 5 games weighted toward recency) and calibrated home-field advantages are blended in.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-num">04</div>
            <h4>Odds Output</h4>
            <p>Win probabilities, decimal odds, and American moneylines with a bookmaker-calibrated margin for realistic lines.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="cta-box">
          <h2>Ready to get the edge?</h2>
          <p>Join thousands of sharp bettors using ElJefe every week.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn--primary btn--lg">Create Free Account</Link>
            <Link to="/subscriptions" className="btn btn--outline btn--lg">See Pricing</Link>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 ElJefe · Sports Betting Intelligence · <em>For entertainment purposes only. Please gamble responsibly.</em></p>
      </footer>
    </div>
  );
}
