# Sports Value-Detection Engine Architecture

## Objective

Build a quantitative betting intelligence system that ingests sportsbook odds and historical sports data, produces independent win probabilities, detects positive expected value, and emits structured recommendations with auditability and bankroll controls.

## Service map

1. Odds ingestion service
   - Pulls multi-book moneyline, spread, and totals feeds over REST and WebSocket.
   - Stores raw snapshots with immutable timestamps and source tags.

2. Sports data ingestion service
   - Loads schedules, game results, player availability, advanced team stats, and contextual features.
   - Backfills warehouse tables and feature-ready aggregates.

3. Feature pipeline
   - Builds rolling splits, Elo/Glicko ratings, travel and rest context, and matchup-level features.
   - Publishes versioned feature views to a feature store.

4. Model scoring service
   - Runs ensemble probabilities for each outcome and market type.
   - Applies calibration and disagreement-based confidence scoring.

5. Value engine service
   - Converts book prices to implied and no-vig fair probabilities.
   - Computes edge and expected value.
   - Filters opportunities by edge, model quality, and policy limits.

6. Risk engine service
   - Applies fractional Kelly and portfolio constraints.
   - Enforces bankroll caps, daily exposure caps, and risk flags.

7. API gateway and dashboard
   - Serves games, value bets, performance metrics, and simulations.
   - Surfaces ROI, calibration, hit rate by edge, and exposure.

## Data model

Core warehouse tables:

- `games`
- `teams`
- `players`
- `stats_game_team`
- `injuries`
- `odds`
- `model_predictions`
- `value_bets`
- `bet_decisions`

## Versioning requirements

Every recommendation should log:

- data snapshot version
- feature version
- model version
- quote timestamp
- sportsbook/source identifier
- recommendation timestamp

That is the minimum needed for reproducibility.

## Recommended production stack

- ingestion and scoring: Python with FastAPI and Celery workers
- orchestration: Dagster or Airflow
- warehouse: Postgres for OLTP plus BigQuery/ClickHouse/Snowflake for analytics scale
- object storage: S3 or GCS for raw immutable snapshots
- feature store: Feast or versioned warehouse feature tables
- experiment tracking and registry: MLflow
- streaming: Kafka or Redpanda once ingestion volume grows
- monitoring: Prometheus plus Grafana, or Datadog

## Latency target

For pregame and live pricing workflows, design for sub-10-second odds-to-recommendation latency. The live path should eventually move toward sub-2-second evaluation for markets where books reprice quickly.