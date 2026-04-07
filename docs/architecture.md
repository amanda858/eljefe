# El Jefe Architecture

## Product scope

El Jefe should be built as a subscription intelligence platform, not as a sportsbook. The product value is speed, pricing quality, and signal delivery.

## Core services

1. Feed ingestion
   - Sportsbook API adapters
   - Exchange order book adapters
   - Official score and event-state providers
   - WebSocket-first transport with polling fallback

2. Market normalization
   - Canonical event, team, player, and market mapping
   - Timezone and scheduling normalization
   - Deduplication and stale-line detection

3. Pricing engine
   - Vig removal and implied probability conversion
   - Fair-odds models per sport
   - In-play recalibration on score, possession, clock, and player state

4. Signal engine
   - Positive EV detection
   - Arbitrage and middle detection
   - Sharp line movement alerts
   - Confidence and latency scoring

5. Commercial layer
   - Stripe subscriptions
   - Feature entitlements by tier
   - Team accounts and API metering

## Suggested stack

- Frontend: Next.js
- API gateway: NestJS or Go
- Streaming backbone: Kafka or Redpanda
- Cache: Redis
- OLTP database: Postgres
- Analytics database: ClickHouse
- Model services: Python with FastAPI
- Infrastructure: Kubernetes with multi-region failover

## Initial milestones

1. Launch public site and premium dashboard shell
2. Add auth and subscription billing
3. Add normalized odds ingestion for 2 to 3 sports
4. Add first EV and alerting engine
5. Add mobile notifications and API access

## Production blockers

El Jefe should be treated as blocked for production if it fails the shared realtime contract in [lib/el-jefe-spec.ts](lib/el-jefe-spec.ts).

Current hard gaps versus that spec:

1. Ingestion is not WebSocket-first yet; the current app still relies on request-time reads and mocked or batch-style providers.
2. Movement tracking is incomplete; there is no 24-hour odds-history analysis for steam, reverse line movement, or stale-number detection.
3. Latency SLOs are not enforced end to end; there is no $p95$ monitoring path proving feed-to-edge under 300 ms.
4. Monitoring and alerting are not implemented for feed health, stale odds, engine errors, or latency spikes.
5. Test coverage does not yet satisfy the required unit, integration, load, and regression gates.

Engineering rule:

Build El Jefe to satisfy `ElJefeSpec`. If any of these constraints fail in production, treat it as a blocker rather than a nice-to-have.