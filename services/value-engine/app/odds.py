from __future__ import annotations


def american_to_decimal(american_odds: int) -> float:
    if american_odds == 0:
        raise ValueError("American odds cannot be zero")

    if american_odds > 0:
        return 1 + (american_odds / 100)

    return 1 + (100 / abs(american_odds))


def american_to_implied_probability(american_odds: int) -> float:
    if american_odds == 0:
        raise ValueError("American odds cannot be zero")

    if american_odds > 0:
        return 100 / (american_odds + 100)

    return abs(american_odds) / (abs(american_odds) + 100)


def remove_two_way_vig(home_american: int, away_american: int) -> tuple[float, float]:
    home_implied = american_to_implied_probability(home_american)
    away_implied = american_to_implied_probability(away_american)
    total = home_implied + away_implied

    if total <= 0:
        raise ValueError("Invalid implied probability total")

    return home_implied / total, away_implied / total


def expected_value_per_unit(win_probability: float, decimal_odds: float) -> float:
    return (win_probability * decimal_odds) - 1