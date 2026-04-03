# 🎯 ElJefe — Advanced Sports Betting Odds Platform

A full-stack, subscription-based sports betting intelligence platform that calculates near-perfect odds for all major sports using advanced statistical models.

## Features

- **Advanced Odds Engine** — Elo ratings, Poisson goal models (soccer/hockey), Pythagorean expectation (basketball/baseball), form weighting, and home-advantage calibration combine for near-perfect win probabilities
- **7 Sports Covered** — NFL, NBA, MLB, NHL, Soccer, Tennis, MMA/UFC
- **3 Subscription Tiers** — Free, Pro ($19.99/mo), Elite ($49.99/mo)
- **JWT Authentication** — Secure registration and login
- **Tier-gated Data** — Free users see limited data; Elite subscribers see all sports with full stats
- **American & Decimal Odds** — Both formats for every game
- **Confidence Scores** — 0-100 confidence rating per matchup

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend API | Node.js + Express |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Frontend | React 19 + Vite |
| Routing | React Router v7 |
| Styling | CSS Modules (dark theme) |

## Quick Start

### Prerequisites
- Node.js 18+

### Backend

```bash
cd backend
cp .env.example .env          # edit JWT_SECRET
npm install
npm start                     # runs on :4000
```

### Frontend

```bash
cd frontend
echo "VITE_API_URL=http://localhost:4000" > .env
npm install
npm run dev                   # runs on :5173
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | Register new user |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/me` | ✓ | Get current user |
| GET | `/api/odds` | ✓ | All odds (filtered by tier) |
| GET | `/api/odds/sports` | — | List available sports |
| GET | `/api/odds/:sport` | ✓ | Single sport odds |
| GET | `/api/subscriptions/plans` | — | List all plans |
| POST | `/api/subscriptions/upgrade` | ✓ | Upgrade subscription |
| POST | `/api/subscriptions/cancel` | ✓ | Cancel subscription |

## Subscription Tiers

| Feature | Free | Pro ($19.99/mo) | Elite ($49.99/mo) |
|---------|------|-----------------|-------------------|
| Sports | NFL only | NFL, NBA, MLB, NHL, Soccer | All 7 sports |
| Games per sport | 1 | 4 | Unlimited |
| Confidence scores | ✗ | ✓ | ✓ |
| American odds | ✗ | ✓ | ✓ |
| Draw odds | ✗ | ✓ | ✓ |
| Win probability | ✗ | ✓ | ✓ |
| Advanced stats | ✗ | ✗ | ✓ |
| Live updates | ✗ | ✗ | ✓ |

## Odds Model

The engine blends four statistical approaches per sport:

1. **Elo Ratings** — Dynamic team strength updated after every game
2. **Poisson Model** — Used for soccer & hockey to simulate goal distributions
3. **Pythagorean Expectation** — Used for basketball (exp=13.91) and baseball (exp=1.83)
4. **Form Weighting** — Last 5 games with recency bias (10% blend)
5. **Home Advantage** — Sport-specific Elo bonus (40–70 pts)

A 4.5% bookmaker margin is applied to produce realistic decimal and American odds.

## Running Tests

```bash
cd backend && npm test
```

18 tests covering the odds engine and all API endpoints.

---

> ⚠️ For entertainment purposes only. Please gamble responsibly.
