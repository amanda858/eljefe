# Deployment

El Jefe can run with a split deployment:

- Frontend on Vercel
- Backend on Railway, Render, or Fly.io
- Postgres on Railway, Render, Neon, or another managed provider

This gives you a stable public URL and avoids keeping a GitHub Codespace running.

## Recommended topology

1. Deploy Postgres first.
2. Deploy the backend from `backend/`.
3. Deploy the Next.js frontend from the repo root.
4. Point the frontend at the backend with `API_BASE_URL`.

## Frontend settings

The repo includes [vercel.json](../vercel.json) so Vercel can use the intended install and build commands without extra dashboard setup.

Project root:

```bash
/
```

Build command:

```bash
npm ci && npm run build
```

Start command:

```bash
npm run start
```

Required environment variables:

```bash
API_BASE_URL=https://your-backend-domain.example.com
AUTH_SECRET=replace-with-a-long-random-secret
OWNER_EMAIL=owner@your-domain.com
OWNER_PASSWORD=replace-with-a-strong-password
```

Optional environment variables:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.example.com
ODDS_API_KEY=
VALUE_ENGINE_URL=
SEASON_FEED_URL=
SEASON_FEED_TOKEN=
SEASON_CONTEXT_FEED_URL=
SEASON_FEED_STALE_MINUTES=180
```

Notes:

- `API_BASE_URL` is the important one for server-rendered data fetches.
- `NEXT_PUBLIC_API_BASE_URL` is optional and only needed if you later add browser-side direct backend calls.
- Do not deploy with empty `AUTH_SECRET`, `OWNER_EMAIL`, or `OWNER_PASSWORD`.

## Backend settings

The repo includes [backend/Dockerfile](../backend/Dockerfile) for hosts that deploy from a container image.

Service root:

```bash
backend/
```

Build command:

```bash
npm ci && npm run build && npm run prisma:generate
```

Start command:

```bash
npm run prisma:deploy && npm run start
```

Required environment variables:

```bash
HOST=0.0.0.0
PORT=4000
DATABASE_URL=postgresql://...
```

Notes:

- `DATABASE_URL` must point to your managed Postgres instance, not `localhost`.
- If your host injects `PORT`, keep it and do not hardcode another external port mapping.
- The backend exposes `GET /health` for health checks.
- The container command runs `npm run prisma:deploy && npm run start`, so the migration step stays part of boot.

## Deployment order

1. Provision Postgres and copy its connection string.
2. Deploy the backend with `DATABASE_URL` set.
3. Wait for the backend health endpoint to return `200` at `/health`.
4. Deploy the frontend with `API_BASE_URL` set to the backend base URL.
5. Open the frontend URL and confirm the dashboard loads live backend data.

## Production checklist

- Use strong values for `OWNER_PASSWORD` and `AUTH_SECRET`.
- Keep `.env` files out of git.
- Verify the backend can reach Postgres before deploying the frontend.
- If you use the optional Python value engine, deploy it separately and set `VALUE_ENGINE_URL` on the frontend.
- If you use live schedule feeds or The Odds API, configure those variables on the frontend host.

## Codespaces versus hosted deployment

Codespaces forwarding is suitable for demos and temporary reviews.
Hosted deployment is the correct option for a permanent public link because the URL remains available when your development environment is offline.