from __future__ import annotations

from .schemas import RiskRecommendation


def fractional_kelly_stake(
    *,
    bankroll: float,
    win_probability: float,
    decimal_odds: float,
    kelly_fraction: float,
    max_bet_pct: float,
    max_daily_pct: float,
    current_daily_exposure: float = 0.0,
) -> RiskRecommendation:
    profit_multiple = decimal_odds - 1
    lose_probability = 1 - win_probability
    raw_fraction = 0.0
    risk_flags: list[str] = []

    if bankroll <= 0:
        risk_flags.append("invalid_bankroll")
        return RiskRecommendation(
            stake_size=0.0,
            bankroll_fraction=0.0,
            kelly_fraction_used=kelly_fraction,
            max_bet_pct=max_bet_pct,
            max_daily_pct=max_daily_pct,
            risk_flags=risk_flags,
        )

    if profit_multiple > 0:
        raw_fraction = ((profit_multiple * win_probability) - lose_probability) / profit_multiple

    applied_fraction = max(0.0, raw_fraction * kelly_fraction)

    if applied_fraction <= 0:
        risk_flags.append("non_positive_kelly")

    if applied_fraction > max_bet_pct:
        risk_flags.append("max_bet_pct_clipped")
        applied_fraction = max_bet_pct

    remaining_daily_capacity = max(0.0, max_daily_pct - current_daily_exposure)
    if applied_fraction > remaining_daily_capacity:
        risk_flags.append("daily_exposure_clipped")
        applied_fraction = remaining_daily_capacity

    stake_size = round(bankroll * applied_fraction, 2)

    if stake_size == 0.0 and remaining_daily_capacity == 0.0:
        risk_flags.append("daily_limit_reached")

    return RiskRecommendation(
        stake_size=stake_size,
        bankroll_fraction=round(applied_fraction, 6),
        kelly_fraction_used=kelly_fraction,
        max_bet_pct=max_bet_pct,
        max_daily_pct=max_daily_pct,
        risk_flags=risk_flags,
    )