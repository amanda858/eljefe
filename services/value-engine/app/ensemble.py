from __future__ import annotations

from math import exp, sqrt
from statistics import mean, pstdev

from .schemas import GameFeatures, ModelProbability, ProbabilityBreakdown

MODEL_VERSION = "moneyline-ensemble-v1"


def _sigmoid(value: float) -> float:
    return 1 / (1 + exp(-value))


def _clamp_probability(value: float) -> float:
    return min(0.97, max(0.03, value))


def baseline_logistic_model(game: GameFeatures) -> float:
    elo_signal = (game.home_elo - game.away_elo) / 400
    rating_signal = ((game.home_off_rating - game.away_def_rating) - (game.away_off_rating - game.home_def_rating)) / 18
    schedule_signal = ((game.home_rest_days - game.away_rest_days) * 0.08) - ((game.home_travel_km - game.away_travel_km) / 8000)
    injury_signal = (game.home_injury_impact - game.away_injury_impact) / 12
    home_court_signal = 0.12 if not game.neutral_site else 0.0
    weather_signal = game.weather_impact * 0.03

    return _clamp_probability(_sigmoid(elo_signal + rating_signal + schedule_signal + injury_signal + home_court_signal + weather_signal))


def elo_model(game: GameFeatures) -> float:
    expected = 1 / (1 + 10 ** ((game.away_elo - game.home_elo) / 400))
    home_court_bump = 0.025 if not game.neutral_site else 0.0
    return _clamp_probability(expected + home_court_bump)


def matchup_tree_proxy(game: GameFeatures) -> float:
    pace_pressure = game.pace_delta * 0.015
    defense_delta = (game.away_def_rating - game.home_def_rating) * 0.01
    travel_penalty = (game.away_travel_km - game.home_travel_km) / 12000
    timezone_penalty = game.timezone_delta_hours * 0.025
    injury_delta = (game.home_injury_impact - game.away_injury_impact) / 10

    raw = 0.5 + pace_pressure + defense_delta + travel_penalty + timezone_penalty + injury_delta
    return _clamp_probability(raw)


def rating_plus_form_model(game: GameFeatures) -> float:
    efficiency_gap = ((game.home_off_rating - game.home_def_rating) - (game.away_off_rating - game.away_def_rating)) / 40
    rest_gap = (game.home_rest_days - game.away_rest_days) * 0.03
    sample_stability = min(0.03, sqrt(max(game.sample_size, 1)) / 300)
    raw = 0.5 + efficiency_gap + rest_gap + sample_stability
    return _clamp_probability(raw)


def calibrate(probability: float) -> float:
    centered = probability - 0.5
    return _clamp_probability(0.5 + (centered * 0.93))


def score_game(game: GameFeatures) -> ProbabilityBreakdown:
    model_outputs = [
        ModelProbability(model_name="baseline_logistic", home_win_probability=baseline_logistic_model(game)),
        ModelProbability(model_name="elo_rating", home_win_probability=elo_model(game)),
        ModelProbability(model_name="matchup_tree_proxy", home_win_probability=matchup_tree_proxy(game)),
        ModelProbability(model_name="rating_plus_form", home_win_probability=rating_plus_form_model(game)),
    ]

    weights = {
        "baseline_logistic": 0.25,
        "elo_rating": 0.30,
        "matchup_tree_proxy": 0.20,
        "rating_plus_form": 0.25,
    }

    ensemble_probability = sum(item.home_win_probability * weights[item.model_name] for item in model_outputs)
    calibrated_home_probability = calibrate(ensemble_probability)
    disagreement = pstdev(item.home_win_probability for item in model_outputs)
    sample_quality = min(1.0, game.sample_size / 82)
    confidence = max(35.0, min(97.0, (1 - disagreement) * 72 + (sample_quality * 18)))

    return ProbabilityBreakdown(
        home_win_probability=round(calibrated_home_probability, 4),
        away_win_probability=round(1 - calibrated_home_probability, 4),
        confidence=round(confidence, 2),
        model_outputs=model_outputs,
        disagreement=round(disagreement, 4),
        model_version=MODEL_VERSION,
    )


def summarize_portfolio_confidence(probabilities: list[ProbabilityBreakdown]) -> dict[str, float]:
    if not probabilities:
        return {"average_confidence": 0.0, "average_disagreement": 0.0}

    return {
        "average_confidence": round(mean(item.confidence for item in probabilities), 2),
        "average_disagreement": round(mean(item.disagreement for item in probabilities), 4),
    }