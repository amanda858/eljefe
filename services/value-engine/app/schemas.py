from __future__ import annotations

from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class MarketType(str, Enum):
    MONEYLINE = "moneyline"


class Side(str, Enum):
    HOME = "home"
    AWAY = "away"


class GameFeatures(BaseModel):
    game_id: str
    league: str
    commence_at: datetime
    home_team: str
    away_team: str
    venue: str
    neutral_site: bool = False
    home_elo: float
    away_elo: float
    home_rest_days: float
    away_rest_days: float
    home_travel_km: float
    away_travel_km: float
    home_injury_impact: float = Field(description="Negative values indicate missing value from injuries")
    away_injury_impact: float = Field(description="Negative values indicate missing value from injuries")
    home_off_rating: float
    away_off_rating: float
    home_def_rating: float
    away_def_rating: float
    pace_delta: float
    weather_impact: float = Field(default=0.0, description="Negative values suppress offense for outdoor sports")
    timezone_delta_hours: float = 0.0
    sample_size: int = 82
    data_version: str = "snapshot-2026-04-03"
    feature_version: str = "nba-moneyline-v1"


class OddsQuote(BaseModel):
    game_id: str
    book_id: str
    market_type: MarketType = MarketType.MONEYLINE
    timestamp: datetime
    source: str
    home_american: int
    away_american: int


class GameCard(BaseModel):
    game: GameFeatures
    quotes: list[OddsQuote]


class SettledGame(BaseModel):
    game: GameFeatures
    closing_quote: OddsQuote
    actual_home_win: bool


class ModelProbability(BaseModel):
    model_name: str
    home_win_probability: float


class ProbabilityBreakdown(BaseModel):
    home_win_probability: float
    away_win_probability: float
    confidence: float
    model_outputs: list[ModelProbability]
    disagreement: float
    model_version: str


class RiskRecommendation(BaseModel):
    stake_size: float
    bankroll_fraction: float
    kelly_fraction_used: float
    max_bet_pct: float
    max_daily_pct: float
    risk_flags: list[str]


class AuditInfo(BaseModel):
    generated_at: datetime
    model_version: str
    feature_version: str
    data_version: str
    quote_timestamp: datetime
    book_id: str
    source: str


class ValueBet(BaseModel):
    game_id: str
    league: str
    market: MarketType
    side: Side
    team: str
    book_id: str
    book_american_odds: int
    book_decimal_odds: float
    our_probability: float
    book_implied_probability: float
    book_fair_probability: float
    edge: float
    expected_value_per_unit: float
    confidence: float
    recommended_stake: RiskRecommendation
    audit: AuditInfo


class ValueBetResponse(BaseModel):
    generated_at: datetime
    count: int
    min_edge: float
    model_version: str
    bets: list[ValueBet]


class SimulateRequest(BaseModel):
    bankroll: float = 10000.0
    min_edge: float = 0.03
    kelly_fraction: float = 0.25
    max_bet_pct: float = 0.02
    max_daily_pct: float = 0.08


class PerformanceMetrics(BaseModel):
    roi_total: float
    roi_by_league: dict[str, float]
    hit_rate_by_edge_bucket: dict[str, float]
    bankroll_curve: list[float]
    calibration_by_model: dict[str, float]
    exposure_by_book: dict[str, float]


class CalibrationBucket(BaseModel):
    bucket: str
    mean_predicted: float
    actual_rate: float
    count: int


class AccuracyModelMetrics(BaseModel):
    model_name: str
    sample_count: int
    brier_score: float
    log_loss: float
    pick_accuracy: float
    mean_confidence_gap: float


class AccuracyMetrics(BaseModel):
    generated_at: datetime
    sample_count: int
    ensemble: AccuracyModelMetrics
    sportsbook_fair_baseline: AccuracyModelMetrics
    models: list[AccuracyModelMetrics]
    calibration_buckets: list[CalibrationBucket]
    notes: list[str]