# El Jefe

El Jefe is a premium subscription platform for sports betting intelligence. The app now supports live sportsbook odds ingestion through The Odds API while still retaining seeded fallback data where parts of the product are not yet warehouse-backed.

The current product direction is explicitly premium bet analytics for serious enthusiasts: sport-first game selection, reviewed favorites and totals, sharp-vs-public context, book comparison, and prop-angle screening.

The self-learning direction is calibration-first rather than hype-first: intercept signals early, measure closing-line performance, reweight source quality, and improve confidence by sport and market family over time.

Current premium learning surfaces include a self-learning model lab, calibration tracker, results ledger, and version history so the product can explain how it is improving instead of pretending certainty.

## Stack

- Frontend: Next.js 16 + React 19 + TypeScript 5
- Frontend styling: current custom design system in `app/globals.css`
- Backend: Node.js + TypeScript + Express + Prisma in `backend/`
- Database target: Postgres via Prisma schema in `backend/prisma/schema.prisma`
- Infra scaffold: Docker Compose in `docker-compose.yml`
- Python FastAPI value-engine service in `services/value-engine`

The execution blueprint now exists directly in the repo structure:

- `backend/src/index.ts`
- `backend/src/routes/games.ts`
- `backend/src/routes/odds.ts`
- `backend/src/routes/edges.ts`
- `backend/src/routes/ingest.ts`
- `backend/src/services/gamesService.ts`
- `backend/src/services/oddsService.ts`
- `backend/src/services/edgesService.ts`
- `backend/src/lib/oddsMath.ts`
- `backend/prisma/schema.prisma`

The backend now reads from Prisma models backed by Postgres. The seed flow uses the original fixture set to initialize a working MVP dataset.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To run the new backend scaffold locally:

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The MVP backend exposes:

- `GET /games/today`
- `GET /games/:id/odds`
- `GET /edges/today`
- `POST /ingest/odds`

To run the frontend, backend, and Postgres together:

```bash
docker compose up --build
```

The Compose stack now does the database bootstrap work for you:

- Postgres waits until it is healthy before the backend starts.
- Prisma generates the client, applies migrations, and seeds the initial dataset only when the database is empty.
- The frontend talks to the backend over the internal Docker network instead of `localhost`, so server-rendered pages work correctly inside containers.

If you want Prisma migrations applied in a non-development environment, run:

```bash
cd backend
npm run prisma:deploy
```

Note: the frontend currently keeps the existing CSS system rather than Tailwind so the working product UI stays stable while the backend MVP is being built out.

To run the moneyline value-engine MVP:

```bash
cd services/value-engine
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

If you want the Next.js app to read the Python service directly, set `VALUE_ENGINE_URL`, for example:

```bash
export VALUE_ENGINE_URL=http://127.0.0.1:8001
```

If that service is unavailable, the app falls back to seeded recommendation snapshots so the interface still renders.

To activate live odds across the Next.js market board, event cockpit, sport pages, homepage summaries, dashboard summaries, and odds-backed season schedule, set `ODDS_API_KEY`:

```bash
export ODDS_API_KEY=your_the_odds_api_key
```

If you also run the Python value-engine service with the same `ODDS_API_KEY`, its `get_today_games()` repository will ingest live NBA moneyline books instead of the three seeded example cards.

The season command board can also read from a dedicated live schedule endpoint. Set `SEASON_FEED_URL` to a JSON endpoint that returns either an array of season-game cards or an object with `games` and optional `source` metadata. If that endpoint is unavailable, the app will next try to derive a schedule from The Odds API when `ODDS_API_KEY` is present.

If the live season feed requires authentication, set `SEASON_FEED_TOKEN` and the app will send it as a bearer token.

Set `SEASON_FEED_STALE_MINUTES` to control when the UI marks a live feed as stale. The default is `180` minutes. The board surfaces whether the source is live, stale, configured but unavailable, or not configured.

The live schedule provider now accepts looser upstream field names such as `gameId`, `startTime`, `network`, `broadcastNetwork`, `marketName`, `recommendedBet`, `book`, `sportsbook`, `edgePct`, `confidenceScore`, `crowdSentiment`, `reasoning`, and `signals`, so you do not need a perfectly pre-shaped payload.

If you have a separate real context feed for network corrections or crowd inputs, set `SEASON_CONTEXT_FEED_URL`. That endpoint should return an array or `{ overlays: [...] }` keyed by `id`, `gameId`, or `eventId`. Supported overlay fields are `watchNetwork`, `watchWindow`, `crowdTemperature`, `rationale`, `tags`, and `crowdSignals`. If no overlay is present, the board now shows that crowd or network context is unavailable instead of implying seeded detail is live.

## Public access from Codespaces

For a shareable public URL from GitHub Codespaces, keep only port `3000` public. The backend can stay private because Next.js fetches it server-side.

1. Start the stack with `docker compose up --build`.
2. In the Ports panel, set port `3000` visibility to `Public`.
3. Share the forwarded URL for port `3000`.

The dev server is now configured to bind on `0.0.0.0` and allow common GitHub forwarded dev origins, which avoids the usual remote-host access failures.

## Stable deployment

If you want a permanent public URL instead of a temporary Codespaces forwarding URL, use a hosted frontend plus a hosted backend/database.

- Frontend: Vercel with the repo root as the project.
- Backend: Railway, Render, or Fly.io with `backend/` as the service root.
- Database: managed Postgres from the same provider or Neon.

Set `API_BASE_URL` on the frontend to your public backend URL, and set `DATABASE_URL` on the backend to the managed Postgres connection string.

The repo now includes deploy scaffolding for that split setup:

- `vercel.json` for the frontend project root
- `backend/Dockerfile` for container-based backend hosts

See [docs/deployment.md](docs/deployment.md) for the exact environment-variable matrix and deployment sequence.

## Routes

- `/` marketing landing page
- `/dashboard` premium app shell mockup
- `/subscribe` subscription and tier overview
- `/owner-login` owner authentication page with payment bypass
- `/status` season feed status page
- `/sports` sport hub index
- `/sports/[sport]` sport-specific information hub
- `/api/events` upcoming games selector API with live-odds fallback support
- `/api/events/[id]` event-level odds and market review API
- `/api/markets` market board API with live-odds fallback support
- `/api/markets/[id]` market detail API
- `/api/season-games` season command calendar API
- `/api/status/season-feed` season feed status API
- `/api/sports/[sport]` sport hub API with live market fallback support
- `/api/sports/[sport]/intel` sport-specific intel feed API
- `/api/value-bets` quant recommendation proxy
- `/api/value-bets/accuracy` quant accuracy proxy

The season command calendar supports sport, network, market-family, search, and time-window filtering with seeded windows like `today`, `next-30`, `summer`, `football`, and `full-year`.

## Owner access

Set these environment variables to enable owner login with a signed session:

- `OWNER_EMAIL`
- `OWNER_PASSWORD`
- `AUTH_SECRET`

In local development, the auth helper falls back to dev-only credentials if these are unset. In production, the app does not allow that fallback, so set all three before deploying.

## Product direction

- Real-time odds aggregation across sportsbooks and exchanges
- Fair-odds engine and edge scoring
- Subscription tiers for serious bettors
- Multi-sport coverage with alerting and bankroll tooling
- Competitive position above sportsbooks, prediction markets, and generic analytics tools
- Intelligence stack spanning books, experts, crowd sentiment, search trends, and simulation layers
- Quantitative value-detection engine with ensemble probabilities, no-vig comparison, and bankroll-aware stake sizing

See [docs/architecture.md](docs/architecture.md) for the suggested platform architecture.
See [docs/roadmap.md](docs/roadmap.md) for the execution sequence.
See [docs/competition.md](docs/competition.md) for the current market landscape.
See [docs/value-engine/architecture.md](docs/value-engine/architecture.md) for the production quant-system architecture.
See [docs/value-engine/mvp.md](docs/value-engine/mvp.md) for the current MVP scope and implementation path.
