# Sports Value-Detection MVP

## Initial scope

- Sport: NBA
- Market: moneyline only
- Models: baseline logistic, Elo, matchup proxy, rating-and-form proxy
- Ensemble: weighted average with calibration
- Risk: fractional Kelly with per-bet and per-day caps
- Output: API recommendations only, no automated placement

## Why this is the right MVP

The fastest route to a credible quantitative engine is narrowing the surface area while preserving the full decision chain:

1. ingest quotes
2. assemble features
3. produce an independent probability
4. remove vig
5. compute edge
6. size stake
7. log a reproducible recommendation

That proves the operating model before expansion into spreads, totals, props, and more sports.

## Current implementation in this repo

The MVP backend lives in [services/value-engine](../../services/value-engine).

It currently includes:

- seeded game and odds snapshots for NBA moneyline evaluation
- seeded settled-game snapshots for accuracy testing and calibration checks
- reproducible Pydantic schemas
- ensemble scoring logic
- no-vig fair probability calculation
- fractional Kelly stake sizing
- REST endpoints for games, value bets, simulation, performance metrics, and accuracy metrics

## Next implementation steps

1. Replace seeded repository data with warehouse-backed reads.
2. Add raw snapshot persistence for odds and features.
3. Train actual models in scikit-learn, XGBoost, or LightGBM.
4. Add MLflow tracking and registry promotion.
5. Add closing-line and realized-outcome evaluation tables.
6. Expand to spreads and totals after moneyline calibration is stable.