import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api';
import './Dashboard.css';

const SPORT_EMOJI = {
  NFL: '🏈', NBA: '🏀', MLB: '⚾', NHL: '🏒',
  Soccer: '⚽', Tennis: '🎾', 'MMA/UFC': '🥊',
};

function OddsCard({ game }) {
  const { homeTeam, awayTeam, odds, gameTime } = game;
  const gameDate = new Date(gameTime);
  const timeStr = gameDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const favTeam = odds.teamA.winProbability != null
    ? (odds.teamA.winProbability > (odds.teamB.winProbability || 0) ? 'A' : 'B')
    : null;

  return (
    <div className="odds-card">
      <div className="odds-card-header">
        <span className="game-time">{timeStr}</span>
        {odds.confidence != null && (
          <span className={`confidence confidence--${odds.confidence >= 70 ? 'high' : odds.confidence >= 55 ? 'mid' : 'low'}`}>
            {odds.confidence}% confidence
          </span>
        )}
      </div>

      <div className="matchup">
        <TeamBlock
          name={homeTeam}
          side={odds.teamA}
          isFav={favTeam === 'A'}
          label="HOME"
        />

        <div className="vs-block">
          <span className="vs">VS</span>
          {odds.draw && (
            <div className="draw-block">
              <span className="draw-label">Draw</span>
              {odds.draw.probability != null && (
                <span className="draw-prob">{odds.draw.probability}%</span>
              )}
              <span className="draw-odds">{odds.draw.decimalOdds}</span>
              {odds.draw.americanOdds && (
                <span className="draw-ml">{odds.draw.americanOdds}</span>
              )}
            </div>
          )}
        </div>

        <TeamBlock
          name={awayTeam}
          side={odds.teamB}
          isFav={favTeam === 'B'}
          label="AWAY"
        />
      </div>
    </div>
  );
}

function TeamBlock({ name, side, isFav, label }) {
  return (
    <div className={`team-block ${isFav ? 'team-block--fav' : ''}`}>
      <span className="team-label">{label}</span>
      <span className="team-name">{name}</span>
      {side.winProbability != null && (
        <div className="prob-bar-wrap">
          <div className="prob-bar" style={{ width: `${side.winProbability}%` }} />
          <span className="prob-text">{side.winProbability}%</span>
        </div>
      )}
      <div className="team-odds">
        <span className="dec-odds">{side.decimalOdds}</span>
        {side.americanOdds && <span className="ml-odds">{side.americanOdds}</span>}
      </div>
      {isFav && <span className="fav-badge">⭐ Favored</span>}
    </div>
  );
}

const SPORT_LABEL_MAP = {
  nfl: 'NFL', nba: 'NBA', mlb: 'MLB', nhl: 'NHL',
  soccer: 'Soccer', tennis: 'Tennis', mma: 'MMA/UFC',
};

export default function Dashboard() {
  const { user } = useAuth();
  const [oddsData, setOddsData] = useState(null);
  const [activeSport, setActiveSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getOdds()
      .then((data) => {
        setOddsData(data);
        const keys = Object.keys(data.odds);
        if (keys.length) setActiveSport(keys[0]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const tier = user?.tier || 'free';

  const tierInfo = {
    free: { label: 'Free', color: '#64748b', next: 'pro', cta: 'Upgrade to Pro for 5 sports + confidence scores' },
    pro: { label: 'Pro', color: '#6366f1', next: 'elite', cta: 'Upgrade to Elite for all 7 sports + advanced stats + live updates' },
    elite: { label: 'Elite', color: '#a855f7', next: null, cta: null },
  }[tier] || {};

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
        <p>Calculating odds…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>⚠️ {error}</p>
        <Link to="/login">Re-login</Link>
      </div>
    );
  }

  const sports = oddsData ? Object.keys(oddsData.odds) : [];
  const activeGames = activeSport ? oddsData.odds[activeSport] : [];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Your Odds Dashboard</h1>
          <p className="dashboard-sub">
            Showing {sports.length} sport{sports.length !== 1 ? 's' : ''} for your{' '}
            <span className="tier-label" style={{ color: tierInfo.color }}>{tierInfo.label}</span> plan
          </p>
        </div>
        {tierInfo.cta && (
          <Link to="/subscriptions" className="upgrade-banner">
            ⚡ {tierInfo.cta} →
          </Link>
        )}
      </div>

      {/* Sport Tabs */}
      <div className="sport-tabs">
        {sports.map((key) => (
          <button
            key={key}
            className={`sport-tab ${activeSport === key ? 'sport-tab--active' : ''}`}
            onClick={() => setActiveSport(key)}
          >
            {SPORT_EMOJI[SPORT_LABEL_MAP[key]] || '🏆'} {SPORT_LABEL_MAP[key]}
          </button>
        ))}
      </div>

      {/* Games */}
      {activeGames && activeGames.length > 0 ? (
        <div className="odds-grid">
          {activeGames.map((game) => (
            <OddsCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="no-games">No games available for this sport.</div>
      )}

      {/* Locked sports hint */}
      {tier === 'free' && (
        <div className="locked-hint">
          <span>🔒 NBA, MLB, NHL, Soccer, Tennis, MMA are locked on Free.</span>
          <Link to="/subscriptions" className="locked-link">Upgrade to unlock →</Link>
        </div>
      )}
      {tier === 'pro' && (
        <div className="locked-hint">
          <span>🔒 Tennis and MMA/UFC require the Elite plan.</span>
          <Link to="/subscriptions" className="locked-link">Upgrade to Elite →</Link>
        </div>
      )}
    </div>
  );
}
