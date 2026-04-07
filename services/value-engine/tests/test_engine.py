import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

from app.evaluation import evaluate_accuracy
from app.ensemble import score_game
from app.odds import american_to_decimal, american_to_implied_probability, remove_two_way_vig
from app.repository import get_performance_metrics, get_settled_recommendation_records, get_today_games, record_recommendations
from app.risk import fractional_kelly_stake


class OddsMathTests(unittest.TestCase):
    def test_american_to_decimal_positive(self):
        self.assertAlmostEqual(american_to_decimal(150), 2.5)

    def test_american_to_decimal_negative(self):
        self.assertAlmostEqual(american_to_decimal(-200), 1.5)

    def test_remove_two_way_vig_normalizes_market(self):
        home_fair, away_fair = remove_two_way_vig(-110, -110)
        self.assertAlmostEqual(home_fair + away_fair, 1.0)
        self.assertAlmostEqual(home_fair, 0.5)
        self.assertAlmostEqual(away_fair, 0.5)

    def test_implied_probability_positive_odds(self):
        self.assertAlmostEqual(american_to_implied_probability(150), 0.4)


class RiskSizingTests(unittest.TestCase):
    def test_fractional_kelly_respects_max_bet_cap(self):
        recommendation = fractional_kelly_stake(
            bankroll=10000,
            win_probability=0.60,
            decimal_odds=2.10,
            kelly_fraction=0.25,
            max_bet_pct=0.02,
            max_daily_pct=0.08,
        )
        self.assertLessEqual(recommendation.bankroll_fraction, 0.02)
        self.assertLessEqual(recommendation.stake_size, 200)


class RepositoryShapeTests(unittest.TestCase):
    def test_seeded_games_include_quotes(self):
        games = get_today_games()
        self.assertGreater(len(games), 0)
        for card in games:
            self.assertGreater(len(card.quotes), 0)
            self.assertTrue(card.game.game_id)


class AccuracyEvaluationTests(unittest.TestCase):
    def test_accuracy_metrics_have_expected_shape(self):
        metrics = evaluate_accuracy()
        self.assertGreaterEqual(metrics.sample_count, 0)
        self.assertGreaterEqual(metrics.ensemble.pick_accuracy, 0.0)
        self.assertLessEqual(metrics.ensemble.pick_accuracy, 1.0)
        self.assertGreaterEqual(len(metrics.models), 0)
        self.assertGreaterEqual(len(metrics.calibration_buckets), 0)


class RecommendationTrackingTests(unittest.TestCase):
    def test_tracked_recommendations_settle_and_drive_metrics(self):
        card = get_today_games()[0]
        quote = card.quotes[0]
        breakdown = score_game(card.game)
        home_fair, _ = remove_two_way_vig(quote.home_american, quote.away_american)

        tracked_recommendation = {
            "game_id": card.game.game_id,
            "league": card.game.league,
            "game": card.game.model_dump(mode="json"),
            "quote": quote.model_dump(mode="json"),
            "side": "home",
            "team": card.game.home_team,
            "book_id": quote.book_id,
            "book_american_odds": quote.home_american,
            "book_decimal_odds": round(american_to_decimal(quote.home_american), 4),
            "book_implied_probability": round(american_to_implied_probability(quote.home_american), 4),
            "book_fair_probability": round(home_fair, 4),
            "book_home_fair_probability": round(home_fair, 4),
            "our_probability": round(breakdown.home_win_probability, 4),
            "home_win_probability": round(breakdown.home_win_probability, 4),
            "away_win_probability": round(breakdown.away_win_probability, 4),
            "edge": round(breakdown.home_win_probability - home_fair, 4),
            "expected_value_per_unit": 0.05,
            "confidence": round(breakdown.confidence, 2),
            "stake_size": 100.0,
            "bankroll_fraction": 0.01,
            "model_version": breakdown.model_version,
            "generated_at": "2026-04-03T15:00:00+00:00",
            "quote_timestamp": quote.timestamp.isoformat(),
            "model_outputs": [item.model_dump(mode="json") for item in breakdown.model_outputs],
        }

        mocked_scores = [
            {
                "id": card.game.game_id,
                "completed": True,
                "scores": [
                    {"name": card.game.home_team, "score": "112"},
                    {"name": card.game.away_team, "score": "104"},
                ],
            }
        ]

        with TemporaryDirectory() as temp_dir:
            tracking_path = Path(temp_dir) / "recommendation-tracker.json"

            with patch.dict(
                "os.environ",
                {
                    "VALUE_ENGINE_TRACKING_FILE": str(tracking_path),
                    "ODDS_API_KEY": "test-key",
                },
                clear=False,
            ):
                with patch("app.repository._fetch_scores_payload", return_value=mocked_scores):
                    record_recommendations([tracked_recommendation, tracked_recommendation])

                    settled_records = get_settled_recommendation_records()
                    performance = get_performance_metrics()
                    accuracy = evaluate_accuracy()

        self.assertEqual(len(settled_records), 1)
        self.assertEqual(settled_records[0]["status"], "settled")
        self.assertTrue(settled_records[0]["actual_home_win"])
        self.assertGreater(float(settled_records[0]["profit"]), 0.0)
        self.assertGreater(performance.roi_total, 0.0)
        self.assertEqual(performance.roi_by_league.get("NBA"), performance.roi_total)
        self.assertEqual(len(performance.bankroll_curve), 2)
        self.assertEqual(accuracy.sample_count, 1)
        self.assertEqual(accuracy.ensemble.pick_accuracy, 1.0)
        self.assertTrue(any("persisted recommendation outcomes" in note for note in accuracy.notes))


if __name__ == "__main__":
    unittest.main()