# El Jefe Value Engine

This service is the first backend slice of the production-grade sports value-detection engine. It targets the MVP scope from the technical specification:

- one sport: NBA
- one market: moneyline
- ensemble probabilities
- positive-EV filtering
- fractional Kelly stake sizing
- reproducible audit metadata per recommendation

## Endpoints

- `GET /health`
- `GET /games/today`
- `GET /value-bets?min_edge=0.03&bankroll=10000`
- `POST /simulate`
- `GET /metrics/performance`
- `GET /metrics/accuracy`

## Service shape

- `app/main.py`: FastAPI app and public endpoints
- `app/repository.py`: live odds ingestion, file-backed recommendation tracking, and derived performance metrics
- `app/ensemble.py`: interpretable ensemble scoring logic
- `app/odds.py`: odds conversion, implied probability, and vig removal
- `app/risk.py`: bankroll sizing with fractional Kelly and exposure caps
- `app/schemas.py`: Pydantic contracts for reproducible recommendations
- `app/evaluation.py`: tracked recommendation accuracy and calibration metrics

## Run locally

```bash
cd services/value-engine
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```

## Live odds mode

Set `ODDS_API_KEY` before starting the service and `get_today_games()` will pull live NBA moneyline books from The Odds API. If the key is missing or the request fails, the service falls back to the seeded cards so the API remains available.

When the live service emits recommendations through `GET /value-bets` or `POST /simulate`, it now writes those recommendation snapshots into a local ledger file. `GET /metrics/performance` and `GET /metrics/accuracy` settle open recommendations against completed scores from The Odds API and derive ROI, hit rate, bankroll curve, and calibration from that tracked history.

Set `VALUE_ENGINE_TRACKING_FILE` if you want the ledger stored somewhere other than the default service-local `data/recommendation-tracker.json` path.

## Production notes

- Replace `repository.py` with ingestion-backed warehouse reads.
- Persist raw odds snapshots and feature snapshots with immutable version IDs.
- Swap the proxy ensemble with trained models from MLflow/model registry.
- Add Redis or Kafka between ingestion and scoring once live books are connected.