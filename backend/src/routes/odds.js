const express = require('express');
const { authenticate } = require('../middleware/auth');
const { getAllOdds, getOddsForSport, SPORT_CONFIG } = require('../services/oddsEngine');
const { applyTierFilter } = require('../services/subscriptionService');

const router = express.Router();

// GET /api/odds  – protected, returns odds filtered by user's tier
router.get('/', authenticate, (req, res) => {
  const tier = req.user.tier || 'free';
  const allOdds = getAllOdds();
  const filtered = applyTierFilter(allOdds, tier);
  return res.json({ tier, odds: filtered });
});

// GET /api/odds/sports  – public, list available sports
router.get('/sports', (_req, res) => {
  const sports = Object.entries(SPORT_CONFIG).map(([key, cfg]) => ({
    key,
    label: cfg.label,
  }));
  return res.json(sports);
});

// GET /api/odds/:sport  – protected, single sport
router.get('/:sport', authenticate, (req, res) => {
  const { sport } = req.params;
  if (!SPORT_CONFIG[sport]) {
    return res.status(404).json({ error: `Unknown sport: ${sport}` });
  }

  const tier = req.user.tier || 'free';
  const sportOdds = getOddsForSport(sport);
  const filtered = applyTierFilter({ [sport]: sportOdds }, tier);

  if (!filtered[sport]) {
    return res.status(403).json({
      error: 'This sport is not available on your current plan.',
      requiredTier: 'pro',
      currentTier: tier,
    });
  }

  return res.json({ tier, sport, odds: filtered[sport] });
});

module.exports = router;
