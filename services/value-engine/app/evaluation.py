from __future__ import annotations

from collections import defaultdict
from datetime import UTC, datetime
from math import log

from .repository import get_settled_recommendation_records
from .schemas import AccuracyMetrics, AccuracyModelMetrics, CalibrationBucket


def _clamp_probability(probability: float) -> float:
    return min(0.999, max(0.001, probability))


def _binary_log_loss(probability: float, outcome: bool) -> float:
    probability = _clamp_probability(probability)
    target = 1.0 if outcome else 0.0
    return -((target * log(probability)) + ((1 - target) * log(1 - probability)))


def _mean(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def _build_model_metric(model_name: str, probabilities: list[float], outcomes: list[bool]) -> AccuracyModelMetrics:
    picks = [(probability >= 0.5) == outcome for probability, outcome in zip(probabilities, outcomes, strict=True)]
    confidence_gaps = [abs(probability - (1.0 if outcome else 0.0)) for probability, outcome in zip(probabilities, outcomes, strict=True)]
    brier_scores = [((1.0 if outcome else 0.0) - probability) ** 2 for probability, outcome in zip(probabilities, outcomes, strict=True)]
    log_losses = [_binary_log_loss(probability, outcome) for probability, outcome in zip(probabilities, outcomes, strict=True)]

    return AccuracyModelMetrics(
        model_name=model_name,
        sample_count=len(probabilities),
        brier_score=round(_mean(brier_scores), 4),
        log_loss=round(_mean(log_losses), 4),
        pick_accuracy=round(_mean([1.0 if pick else 0.0 for pick in picks]), 4),
        mean_confidence_gap=round(_mean(confidence_gaps), 4),
    )


def _build_calibration_buckets(probabilities: list[float], outcomes: list[bool]) -> list[CalibrationBucket]:
    buckets: dict[str, list[tuple[float, bool]]] = defaultdict(list)

    for probability, outcome in zip(probabilities, outcomes, strict=True):
        floor = int(probability * 10) * 10
        ceil = floor + 10
        label = f"{floor}-{ceil}%"
        buckets[label].append((probability, outcome))

    ordered = sorted(buckets.items(), key=lambda item: int(item[0].split("-")[0]))
    return [
        CalibrationBucket(
            bucket=label,
            mean_predicted=round(_mean([value for value, _ in values]), 4),
            actual_rate=round(_mean([1.0 if outcome else 0.0 for _, outcome in values]), 4),
            count=len(values),
        )
        for label, values in ordered
    ]


def evaluate_accuracy(settled_recommendations: list[dict] | None = None) -> AccuracyMetrics:
    recommendations = settled_recommendations or get_settled_recommendation_records()
    outcomes = [bool(item.get("actual_home_win")) for item in recommendations]
    ensemble_probabilities: list[float] = []
    book_probabilities: list[float] = []
    per_model_probabilities: dict[str, list[float]] = defaultdict(list)

    for recommendation in recommendations:
        ensemble_probabilities.append(float(recommendation.get("home_win_probability", 0.5)))
        book_probabilities.append(float(recommendation.get("book_home_fair_probability", 0.5)))

        for model_output in recommendation.get("model_outputs", []):
            if not isinstance(model_output, dict):
                continue

            model_name = str(model_output.get("model_name") or "ensemble")
            per_model_probabilities[model_name].append(float(model_output.get("home_win_probability", 0.5)))

    models = [
        _build_model_metric(model_name, probabilities, outcomes)
        for model_name, probabilities in sorted(per_model_probabilities.items())
    ]
    ensemble_metric = _build_model_metric("ensemble", ensemble_probabilities, outcomes)
    sportsbook_metric = _build_model_metric("sportsbook_fair_baseline", book_probabilities, outcomes)

    if recommendations:
        notes = [
            "Accuracy now uses persisted recommendation outcomes settled against completed scores from The Odds API.",
            "The sportsbook baseline uses the tracked no-vig book probability captured when the recommendation was issued.",
            "Sample count reflects settled recommendations, so repeated books on the same game are measured as distinct opportunities.",
        ]
    else:
        notes = [
            "No settled recommendations have been tracked yet, so accuracy metrics are waiting on real outcomes instead of falling back to seeded backtests.",
            "Once tracked recommendations settle, this endpoint will roll forward automatically using the persisted ledger.",
        ]

    return AccuracyMetrics(
        generated_at=datetime.now(tz=UTC),
        sample_count=len(recommendations),
        ensemble=ensemble_metric,
        sportsbook_fair_baseline=sportsbook_metric,
        models=models,
        calibration_buckets=_build_calibration_buckets(ensemble_probabilities, outcomes),
        notes=notes,
    )