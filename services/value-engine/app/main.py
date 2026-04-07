from __future__ import annotations

from datetime import UTC, datetime

from fastapi import FastAPI, Query

from .ensemble import MODEL_VERSION, score_game, summarize_portfolio_confidence
from .evaluation import evaluate_accuracy
from .odds import american_to_decimal, american_to_implied_probability, expected_value_per_unit, remove_two_way_vig
from .repository import get_performance_metrics, get_today_games, record_recommendations
from .risk import fractional_kelly_stake
from .schemas import AuditInfo, SimulateRequest, Side, ValueBet, ValueBetResponse

app = FastAPI(
    title="El Jefe Value Engine",
    version="0.1.0",
    summary="Moneyline value-detection MVP for production-grade sports pricing workflows",
)


def _generate_value_bets(
    *,
    bankroll: float,
    min_edge: float,
    kelly_fraction: float,
    max_bet_pct: float,
    max_daily_pct: float,
) -> ValueBetResponse:
    generated_at = datetime.now(tz=UTC)
    current_daily_exposure = 0.0
    bets: list[ValueBet] = []
    scored_games = []
    tracked_recommendations: list[dict[str, object]] = []

    for card in get_today_games():
        breakdown = score_game(card.game)
        scored_games.append(breakdown)

        for quote in card.quotes:
            home_fair, away_fair = remove_two_way_vig(quote.home_american, quote.away_american)
            candidate_sides = [
                (Side.HOME, card.game.home_team, quote.home_american, breakdown.home_win_probability, american_to_implied_probability(quote.home_american), home_fair),
                (Side.AWAY, card.game.away_team, quote.away_american, breakdown.away_win_probability, american_to_implied_probability(quote.away_american), away_fair),
            ]

            for side, team, american_odds, our_probability, book_implied_probability, book_fair_probability in candidate_sides:
                edge = our_probability - book_fair_probability
                decimal_odds = american_to_decimal(american_odds)
                unit_ev = expected_value_per_unit(our_probability, decimal_odds)

                if edge < min_edge or unit_ev <= 0 or breakdown.confidence < 55:
                    continue

                stake = fractional_kelly_stake(
                    bankroll=bankroll,
                    win_probability=our_probability,
                    decimal_odds=decimal_odds,
                    kelly_fraction=kelly_fraction,
                    max_bet_pct=max_bet_pct,
                    max_daily_pct=max_daily_pct,
                    current_daily_exposure=current_daily_exposure,
                )
                current_daily_exposure += stake.bankroll_fraction

                value_bet = ValueBet(
                    game_id=card.game.game_id,
                    league=card.game.league,
                    market="moneyline",
                    side=side,
                    team=team,
                    book_id=quote.book_id,
                    book_american_odds=american_odds,
                    book_decimal_odds=round(decimal_odds, 4),
                    our_probability=round(our_probability, 4),
                    book_implied_probability=round(book_implied_probability, 4),
                    book_fair_probability=round(book_fair_probability, 4),
                    edge=round(edge, 4),
                    expected_value_per_unit=round(unit_ev, 4),
                    confidence=round(breakdown.confidence, 2),
                    recommended_stake=stake,
                    audit=AuditInfo(
                        generated_at=generated_at,
                        model_version=breakdown.model_version,
                        feature_version=card.game.feature_version,
                        data_version=card.game.data_version,
                        quote_timestamp=quote.timestamp,
                        book_id=quote.book_id,
                        source=quote.source,
                    ),
                )
                bets.append(value_bet)
                tracked_recommendations.append(
                    {
                        "game_id": card.game.game_id,
                        "league": card.game.league,
                        "game": card.game.model_dump(mode="json"),
                        "quote": quote.model_dump(mode="json"),
                        "side": side.value,
                        "team": team,
                        "book_id": quote.book_id,
                        "book_american_odds": american_odds,
                        "book_decimal_odds": round(decimal_odds, 4),
                        "book_implied_probability": round(book_implied_probability, 4),
                        "book_fair_probability": round(book_fair_probability, 4),
                        "book_home_fair_probability": round(home_fair, 4),
                        "our_probability": round(our_probability, 4),
                        "home_win_probability": round(breakdown.home_win_probability, 4),
                        "away_win_probability": round(breakdown.away_win_probability, 4),
                        "edge": round(edge, 4),
                        "expected_value_per_unit": round(unit_ev, 4),
                        "confidence": round(breakdown.confidence, 2),
                        "stake_size": round(stake.stake_size, 4),
                        "bankroll_fraction": round(stake.bankroll_fraction, 6),
                        "model_version": breakdown.model_version,
                        "generated_at": generated_at.isoformat(),
                        "quote_timestamp": quote.timestamp.isoformat(),
                        "model_outputs": [item.model_dump(mode="json") for item in breakdown.model_outputs],
                    }
                )

    bets.sort(key=lambda bet: (bet.edge, bet.confidence, bet.expected_value_per_unit), reverse=True)
    _ = summarize_portfolio_confidence(scored_games)
    record_recommendations(tracked_recommendations)

    return ValueBetResponse(
        generated_at=generated_at,
        count=len(bets),
        min_edge=min_edge,
        model_version=MODEL_VERSION,
        bets=bets,
    )


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "value-engine", "model_version": MODEL_VERSION}


@app.get("/games/today")
def get_games_today():
    return {"generated_at": datetime.now(tz=UTC), "games": get_today_games()}


@app.get("/value-bets", response_model=ValueBetResponse)
def get_value_bets(
    min_edge: float = Query(default=0.03, ge=0.0, le=0.25),
    bankroll: float = Query(default=10000.0, gt=0.0),
    kelly_fraction: float = Query(default=0.25, gt=0.0, le=1.0),
    max_bet_pct: float = Query(default=0.02, gt=0.0, le=0.2),
    max_daily_pct: float = Query(default=0.08, gt=0.0, le=0.5),
) -> ValueBetResponse:
    return _generate_value_bets(
        bankroll=bankroll,
        min_edge=min_edge,
        kelly_fraction=kelly_fraction,
        max_bet_pct=max_bet_pct,
        max_daily_pct=max_daily_pct,
    )


@app.post("/simulate", response_model=ValueBetResponse)
def simulate_portfolio(request: SimulateRequest) -> ValueBetResponse:
    return _generate_value_bets(
        bankroll=request.bankroll,
        min_edge=request.min_edge,
        kelly_fraction=request.kelly_fraction,
        max_bet_pct=request.max_bet_pct,
        max_daily_pct=request.max_daily_pct,
    )


@app.get("/metrics/performance")
def get_performance():
    return get_performance_metrics()


@app.get("/metrics/accuracy")
def get_accuracy_metrics():
    return evaluate_accuracy()