from __future__ import annotations

import json
import os
            away_rest_days=1,
            home_travel_km=0,
            away_travel_km=530,
            home_injury_impact=-0.8,
            away_injury_impact=-1.7,
            home_off_rating=119.4,
            away_off_rating=118.8,
            home_def_rating=114.9,
            away_def_rating=111.2,
            pace_delta=-0.1,
        ),
        closing_quote=OddsQuote(
            game_id="nba-20260327-cle-mil",
            book_id="bet365",
            market_type=MarketType.MONEYLINE,
            timestamp=NOW - timedelta(days=7, hours=-1),
            source="closing",
            home_american=110,
            away_american=-120,
        ),
        actual_home_win=True,
    ),
    SettledGame(
        game=GameFeatures(
            game_id="nba-20260329-mem-den",
            league="NBA",
            commence_at=NOW - timedelta(days=5),
            home_team="Denver Nuggets",
            away_team="Memphis Grizzlies",
            venue="Ball Arena",
            home_elo=1760,
            away_elo=1568,
            home_rest_days=2,
            away_rest_days=1,
            home_travel_km=0,
            away_travel_km=1413,
            home_injury_impact=-1.0,
            away_injury_impact=-2.8,
            home_off_rating=120.4,
            away_off_rating=110.7,
            home_def_rating=112.7,
            away_def_rating=118.6,
            pace_delta=-1.3,
        ),
        closing_quote=OddsQuote(
            game_id="nba-20260329-mem-den",
            book_id="pinnacle",
            market_type=MarketType.MONEYLINE,
            timestamp=NOW - timedelta(days=5, hours=-1),
            source="closing",
            home_american=-310,
            away_american=255,
        ),
        actual_home_win=True,
    ),
    SettledGame(
        game=GameFeatures(
            game_id="nba-20260330-nyk-mia",
            league="NBA",
            commence_at=NOW - timedelta(days=4),
            home_team="Miami Heat",
            away_team="New York Knicks",
            venue="Kaseya Center",
            home_elo=1659,
            away_elo=1718,
            home_rest_days=2,
            away_rest_days=0,
            home_travel_km=0,
            away_travel_km=1757,
            home_injury_impact=-0.5,
            away_injury_impact=-1.9,
            home_off_rating=112.9,
            away_off_rating=117.8,
            home_def_rating=112.6,
            away_def_rating=112.4,
            pace_delta=-0.6,
        ),
        closing_quote=OddsQuote(
            game_id="nba-20260330-nyk-mia",
            book_id="fanduel",
            market_type=MarketType.MONEYLINE,
            timestamp=NOW - timedelta(days=4, hours=-1),
            source="closing",
            home_american=108,
            away_american=-118,
        ),
        actual_home_win=False,
    ),
    SettledGame(
        game=GameFeatures(
            game_id="nba-20260401-gsw-lac",
            league="NBA",
            commence_at=NOW - timedelta(days=2),
            home_team="Los Angeles Clippers",
            away_team="Golden State Warriors",
            venue="Intuit Dome",
            home_elo=1711,
            away_elo=1688,
            home_rest_days=1,
            away_rest_days=1,
            home_travel_km=0,
            away_travel_km=554,
            home_injury_impact=-1.7,
            away_injury_impact=-0.8,
            home_off_rating=117.3,
            away_off_rating=116.1,
            home_def_rating=112.8,
            away_def_rating=115.2,
            pace_delta=0.5,
        ),
        closing_quote=OddsQuote(
            game_id="nba-20260401-gsw-lac",
            book_id="circa",
            market_type=MarketType.MONEYLINE,
            timestamp=NOW - timedelta(days=2, hours=-1),
            source="closing",
            home_american=-145,
            away_american=130,
        ),
        actual_home_win=False,
    ),
    SettledGame(
        game=GameFeatures(
            game_id="nba-20260402-orl-bos",
            league="NBA",
            commence_at=NOW - timedelta(days=1),
            home_team="Boston Celtics",
            away_team="Orlando Magic",
            venue="TD Garden",
            home_elo=1791,
            away_elo=1662,
            home_rest_days=2,
            away_rest_days=2,
            home_travel_km=0,
            away_travel_km=1797,
            home_injury_impact=-0.7,
            away_injury_impact=-1.2,
            home_off_rating=121.6,
            away_off_rating=112.1,
            home_def_rating=109.6,
            away_def_rating=111.8,
            pace_delta=-0.9,
        ),
        closing_quote=OddsQuote(
            game_id="nba-20260402-orl-bos",
            book_id="betmgm",
            market_type=MarketType.MONEYLINE,
            timestamp=NOW - timedelta(days=1, hours=-1),
            source="closing",
            home_american=-265,
            away_american=220,
        ),
        actual_home_win=True,
    ),
]


def get_today_games() -> list[GameCard]:
    live_games = _get_live_games()
    return live_games or GAMES


def get_performance_metrics() -> PerformanceMetrics:
    _sync_tracked_recommendations()
    settled_recommendations = _get_settled_recommendations()

    if not settled_recommendations:
        return PerformanceMetrics(
            roi_total=0.0,
            roi_by_league={},
            hit_rate_by_edge_bucket={},
            bankroll_curve=[DEFAULT_TRACKING_BANKROLL],
            calibration_by_model={},
            exposure_by_book={},
        )

    total_staked = sum(float(recommendation.get("stake_size", 0.0)) for recommendation in settled_recommendations)
    total_profit = sum(float(recommendation.get("profit", 0.0)) for recommendation in settled_recommendations)

    league_stake: dict[str, float] = defaultdict(float)
    league_profit: dict[str, float] = defaultdict(float)
    bucket_wins: dict[str, list[float]] = defaultdict(list)
    model_confidence_gap: dict[str, list[float]] = defaultdict(list)
    book_stake: dict[str, float] = defaultdict(float)

    bankroll = DEFAULT_TRACKING_BANKROLL
    bankroll_curve = [bankroll]

    for recommendation in sorted(
        settled_recommendations,
        key=lambda item: item.get("settled_at") or item.get("generated_at") or "",
    ):
        stake_size = float(recommendation.get("stake_size", 0.0))
        profit = float(recommendation.get("profit", 0.0))
        bankroll = round(bankroll + profit, 2)
        bankroll_curve.append(bankroll)

        league = str(recommendation.get("league") or "Unknown")
        league_stake[league] += stake_size
        league_profit[league] += profit

        bucket_wins[_edge_bucket(float(recommendation.get("edge", 0.0)))].append(
            1.0 if _recommendation_won(recommendation) else 0.0
        )

        model_version = str(recommendation.get("model_version") or "ensemble")
        model_confidence_gap[model_version].append(
            abs(float(recommendation.get("home_win_probability", 0.5)) - (1.0 if recommendation.get("actual_home_win") else 0.0))
        )

        book_id = str(recommendation.get("book_id") or "unknown")
        book_stake[book_id] += stake_size

    return PerformanceMetrics(
        roi_total=round((total_profit / total_staked), 4) if total_staked else 0.0,
        roi_by_league={
            league: round((league_profit[league] / stake), 4)
            for league, stake in league_stake.items()
            if stake
        },
        hit_rate_by_edge_bucket={
            bucket: round(sum(results) / len(results), 4)
            for bucket, results in sorted(bucket_wins.items())
            if results
        },
        bankroll_curve=bankroll_curve,
        calibration_by_model={
            model_name: round(sum(gaps) / len(gaps), 4)
            for model_name, gaps in sorted(model_confidence_gap.items())
            if gaps
        },
        exposure_by_book={
            book_id: round((stake / total_staked), 4)
            for book_id, stake in sorted(book_stake.items())
            if total_staked
        },
    )


def get_settled_games() -> list[SettledGame]:
    _sync_tracked_recommendations()

    settled_games: list[SettledGame] = []
    for recommendation in _get_settled_recommendations():
        game_payload = recommendation.get("game")
        quote_payload = recommendation.get("quote")

        if not isinstance(game_payload, dict) or not isinstance(quote_payload, dict):
            continue

        settled_games.append(
            SettledGame(
                game=_validate_model(GameFeatures, game_payload),
                closing_quote=_validate_model(OddsQuote, quote_payload),
                actual_home_win=bool(recommendation.get("actual_home_win")),
            )
        )

    settled_games.sort(key=lambda item: item.game.commence_at)
    return settled_games


def get_settled_recommendation_records() -> list[dict[str, Any]]:
    _sync_tracked_recommendations()
    return _get_settled_recommendations()


def record_recommendations(recommendations: list[dict[str, Any]]) -> None:
    if not recommendations:
        return

    store = _load_tracking_store()
    existing_by_id = {
        str(item.get("recommendation_id")): item
        for item in store["recommendations"]
        if isinstance(item, dict) and item.get("recommendation_id")
    }

    changed = False
    for recommendation in recommendations:
        recommendation_id = _build_recommendation_id(recommendation)
        current = existing_by_id.get(recommendation_id)

        if current is not None:
            current["last_seen_at"] = recommendation.get("generated_at")
            changed = True
            continue

        store["recommendations"].append(
            {
                **recommendation,
                "recommendation_id": recommendation_id,
                "status": "open",
                "tracked_at": recommendation.get("generated_at"),
                "last_seen_at": recommendation.get("generated_at"),
                "actual_home_win": None,
                "settled_at": None,
                "profit": None,
            }
        )
        changed = True

    if changed:
        _save_tracking_store(store)


def _get_live_games() -> list[GameCard]:
    api_key = os.getenv("ODDS_API_KEY", "").strip()

    if not api_key:
        return []

    global _live_games_cache, _live_games_cache_expires_at
    now = datetime.now(tz=UTC)

    if _live_games_cache is not None and _live_games_cache_expires_at is not None and now < _live_games_cache_expires_at:
        return _live_games_cache

    try:
        payload = _fetch_live_odds_payload(api_key)
        live_games = _build_live_game_cards(payload)
        if live_games:
            _live_games_cache = live_games
            _live_games_cache_expires_at = now + timedelta(seconds=ODDS_API_CACHE_TTL_SECONDS)
        return live_games
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError) as exc:
        print(f"[value-engine.repository] live odds fetch failed: {exc}")
        return _live_games_cache or []


def _fetch_live_odds_payload(api_key: str) -> list[dict[str, Any]]:
    params = urlencode(
        {
            "apiKey": api_key,
            "regions": "us,eu",
            "markets": "h2h",
            "oddsFormat": "american",
        }
    )
    request = Request(f"{ODDS_API_BASE_URL}/sports/{ODDS_API_SPORT}/odds?{params}")

    with urlopen(request, timeout=10) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if not isinstance(payload, list):
        raise ValueError("Unexpected odds payload shape")

    return [item for item in payload if isinstance(item, dict)]


def _fetch_scores_payload(api_key: str) -> list[dict[str, Any]]:
    params = urlencode(
        {
            "apiKey": api_key,
            "daysFrom": str(ODDS_API_SCORES_LOOKBACK_DAYS),
        }
    )
    request = Request(f"{ODDS_API_BASE_URL}/sports/{ODDS_API_SPORT}/scores?{params}")

    with urlopen(request, timeout=10) as response:
        payload = json.loads(response.read().decode("utf-8"))

    if not isinstance(payload, list):
        raise ValueError("Unexpected scores payload shape")

    return [item for item in payload if isinstance(item, dict)]


def _build_live_game_cards(payload: list[dict[str, Any]]) -> list[GameCard]:
    cards: list[GameCard] = []

    for event in payload:
        card = _build_live_game_card(event)
        if card is not None:
            cards.append(card)

    cards.sort(key=lambda card: card.game.commence_at)
    return cards


def _build_live_game_card(event: dict[str, Any]) -> GameCard | None:
    event_id = str(event.get("id") or "").strip()
    home_team = str(event.get("home_team") or "").strip()
    away_team = str(event.get("away_team") or "").strip()
    commence_at = _parse_timestamp(event.get("commence_time"))
    bookmakers = event.get("bookmakers")

    if not event_id or not home_team or not away_team or commence_at is None or not isinstance(bookmakers, list):
        return None

    quotes: list[OddsQuote] = []
    fair_probabilities: list[tuple[float, float]] = []

    for bookmaker in bookmakers:
        quote = _build_quote(event_id, home_team, away_team, bookmaker)
        if quote is None:
            continue

        quotes.append(quote)
        fair_probabilities.append(_remove_vig(quote.home_american, quote.away_american))

    if not quotes:
        return None

    home_consensus_probability = sum(home for home, _ in fair_probabilities) / len(fair_probabilities)
    away_consensus_probability = sum(away for _, away in fair_probabilities) / len(fair_probabilities)

    features = _build_features_from_market_consensus(
        event_id=event_id,
        home_team=home_team,
        away_team=away_team,
        commence_at=commence_at,
        home_consensus_probability=home_consensus_probability,
        away_consensus_probability=away_consensus_probability,
        quote_count=len(quotes),
    )

    return GameCard(game=features, quotes=quotes)


def _build_quote(event_id: str, home_team: str, away_team: str, bookmaker: Any) -> OddsQuote | None:
    if not isinstance(bookmaker, dict):
        return None

    markets = bookmaker.get("markets")
    if not isinstance(markets, list):
        return None

    moneyline_market = next((market for market in markets if isinstance(market, dict) and market.get("key") == "h2h"), None)
    if not isinstance(moneyline_market, dict):
        return None

    outcomes = moneyline_market.get("outcomes")
    if not isinstance(outcomes, list):
        return None

    home_outcome = next((outcome for outcome in outcomes if isinstance(outcome, dict) and outcome.get("name") == home_team), None)
    away_outcome = next((outcome for outcome in outcomes if isinstance(outcome, dict) and outcome.get("name") == away_team), None)

    if not isinstance(home_outcome, dict) or not isinstance(away_outcome, dict):
        return None

    home_price = home_outcome.get("price")
    away_price = away_outcome.get("price")
    if not isinstance(home_price, int) or not isinstance(away_price, int):
        return None

    last_update = _parse_timestamp(moneyline_market.get("last_update")) or _parse_timestamp(bookmaker.get("last_update")) or datetime.now(tz=UTC)
    book_id = str(bookmaker.get("key") or bookmaker.get("title") or "unknown").strip() or "unknown"

    return OddsQuote(
        game_id=event_id,
        book_id=book_id,
        market_type=MarketType.MONEYLINE,
        timestamp=last_update,
        source="odds-api",
        home_american=home_price,
        away_american=away_price,
    )


def _build_features_from_market_consensus(
    *,
    event_id: str,
    home_team: str,
    away_team: str,
    commence_at: datetime,
    home_consensus_probability: float,
    away_consensus_probability: float,
    quote_count: int,
) -> GameFeatures:
    home_probability = min(0.94, max(0.06, home_consensus_probability))
    away_probability = min(0.94, max(0.06, away_consensus_probability))
    elo_gap = _probability_to_elo_gap(home_probability)
    home_elo = 1700 + (elo_gap / 2)
    away_elo = 1700 - (elo_gap / 2)
    probability_edge = (home_probability - away_probability) * 100
    offensive_shift = probability_edge * 0.08
    defensive_shift = probability_edge * 0.05

    return GameFeatures(
        game_id=event_id,
        league="NBA",
        commence_at=commence_at,
        home_team=home_team,
        away_team=away_team,
        venue="Venue pending",
        home_elo=round(home_elo, 1),
        away_elo=round(away_elo, 1),
        home_rest_days=1.0,
        away_rest_days=1.0,
        home_travel_km=0.0,
        away_travel_km=0.0,
        home_injury_impact=0.0,
        away_injury_impact=0.0,
        home_off_rating=round(114.0 + offensive_shift, 1),
        away_off_rating=round(114.0 - offensive_shift, 1),
        home_def_rating=round(114.0 - defensive_shift, 1),
        away_def_rating=round(114.0 + defensive_shift, 1),
        pace_delta=0.0,
        sample_size=max(quote_count, 1),
        data_version="odds-api-live-v1",
        feature_version="nba-moneyline-consensus-v1",
    )


def _parse_timestamp(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None

    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _american_to_implied_probability(odds: int) -> float:
    if odds > 0:
        return 100 / (odds + 100)
    return abs(odds) / (abs(odds) + 100)


def _remove_vig(home_american: int, away_american: int) -> tuple[float, float]:
    home_implied = _american_to_implied_probability(home_american)
    away_implied = _american_to_implied_probability(away_american)
    total = home_implied + away_implied
    return home_implied / total, away_implied / total


def _probability_to_elo_gap(home_probability: float) -> float:
    clamped_probability = min(0.97, max(0.03, home_probability))
    return 400 * log10(clamped_probability / (1 - clamped_probability))


def _tracking_store_path() -> str:
    configured = os.getenv("VALUE_ENGINE_TRACKING_FILE", "").strip()
    if configured:
        return configured

    return os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "recommendation-tracker.json")


def _load_tracking_store() -> dict[str, Any]:
    path = _tracking_store_path()
    if not os.path.exists(path):
        return {"schema_version": TRACKING_STORE_SCHEMA_VERSION, "recommendations": []}

    try:
        with open(path, "r", encoding="utf-8") as handle:
            payload = json.load(handle)
    except (OSError, json.JSONDecodeError):
        return {"schema_version": TRACKING_STORE_SCHEMA_VERSION, "recommendations": []}

    recommendations = payload.get("recommendations")
    if not isinstance(recommendations, list):
        recommendations = []

    return {
        "schema_version": payload.get("schema_version", TRACKING_STORE_SCHEMA_VERSION),
        "recommendations": recommendations,
    }


def _save_tracking_store(store: dict[str, Any]) -> None:
    path = _tracking_store_path()
    os.makedirs(os.path.dirname(path), exist_ok=True)

    with open(path, "w", encoding="utf-8") as handle:
        json.dump(store, handle, indent=2, sort_keys=True)


def _sync_tracked_recommendations() -> None:
    api_key = os.getenv("ODDS_API_KEY", "").strip()
    if not api_key:
        return

    store = _load_tracking_store()
    open_recommendations = [
        recommendation
        for recommendation in store["recommendations"]
        if isinstance(recommendation, dict) and recommendation.get("status") == "open"
    ]

    if not open_recommendations:
        return

    try:
        scores_payload = _fetch_scores_payload(api_key)
    except (HTTPError, URLError, TimeoutError, ValueError, KeyError) as exc:
        print(f"[value-engine.repository] scores sync failed: {exc}")
        return

    scores_by_event_id = {
        str(item.get("id")): item
        for item in scores_payload
        if isinstance(item, dict) and item.get("id")
    }
    settled_at = datetime.now(tz=UTC).isoformat()
    changed = False

    for recommendation in open_recommendations:
        event = scores_by_event_id.get(str(recommendation.get("game_id") or ""))
        actual_home_win = _resolve_actual_home_win(recommendation, event)
        if actual_home_win is None:
            continue

        recommendation["status"] = "settled"
        recommendation["actual_home_win"] = actual_home_win
        recommendation["settled_at"] = settled_at
        recommendation["profit"] = round(_calculate_profit(recommendation, actual_home_win), 4)
        changed = True

    if changed:
        _save_tracking_store(store)


def _get_settled_recommendations() -> list[dict[str, Any]]:
    store = _load_tracking_store()
    return [
        recommendation
        for recommendation in store["recommendations"]
        if isinstance(recommendation, dict) and recommendation.get("status") == "settled"
    ]


def _resolve_actual_home_win(recommendation: dict[str, Any], event: dict[str, Any] | None) -> bool | None:
    if not isinstance(event, dict) or not event.get("completed"):
        return None

    scores = event.get("scores")
    game_payload = recommendation.get("game")
    if not isinstance(scores, list) or not isinstance(game_payload, dict):
        return None

    home_team = str(game_payload.get("home_team") or "")
    away_team = str(game_payload.get("away_team") or "")
    home_score = _extract_team_score(scores, home_team)
    away_score = _extract_team_score(scores, away_team)

    if home_score is None or away_score is None or home_score == away_score:
        return None

    return home_score > away_score


def _extract_team_score(scores: list[Any], team_name: str) -> int | None:
    for item in scores:
        if not isinstance(item, dict) or item.get("name") != team_name:
            continue

        raw_score = item.get("score")
        try:
            return int(raw_score)
        except (TypeError, ValueError):
            return None

    return None


def _recommendation_won(recommendation: dict[str, Any]) -> bool:
    actual_home_win = bool(recommendation.get("actual_home_win"))
    return (recommendation.get("side") == "home" and actual_home_win) or (
        recommendation.get("side") == "away" and not actual_home_win
    )


def _calculate_profit(recommendation: dict[str, Any], actual_home_win: bool) -> float:
    stake_size = float(recommendation.get("stake_size", 0.0))
    if stake_size <= 0:
        return 0.0

    if not _recommendation_won({**recommendation, "actual_home_win": actual_home_win}):
        return -stake_size

    decimal_odds = float(recommendation.get("book_decimal_odds", 1.0))
    return stake_size * max(decimal_odds - 1.0, 0.0)


def _edge_bucket(edge: float) -> str:
    edge_pct = edge * 100
    if edge_pct < 3:
        return "0-3%"
    if edge_pct < 5:
        return "3-5%"
    if edge_pct < 7:
        return "5-7%"
    return "7%+"


def _build_recommendation_id(recommendation: dict[str, Any]) -> str:
    digest = sha1()
    digest.update(str(recommendation.get("game_id") or "").encode("utf-8"))
    digest.update(str(recommendation.get("side") or "").encode("utf-8"))
    digest.update(str(recommendation.get("book_id") or "").encode("utf-8"))
    digest.update(str(recommendation.get("book_american_odds") or "").encode("utf-8"))
    digest.update(str(recommendation.get("quote_timestamp") or "").encode("utf-8"))
    digest.update(str(recommendation.get("model_version") or "").encode("utf-8"))
    return digest.hexdigest()


def _validate_model(model_class: Any, payload: dict[str, Any]) -> Any:
    if hasattr(model_class, "model_validate"):
        return model_class.model_validate(payload)
    return model_class.parse_obj(payload)