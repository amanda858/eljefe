const express = require('express');
const store = require('../utils/dataStore');
const { authenticate } = require('../middleware/auth');
const { TIERS } = require('../services/subscriptionService');

const router = express.Router();

// GET /api/subscriptions/plans  – public, list all plans
router.get('/plans', (_req, res) => {
  const plans = Object.entries(TIERS).map(([key, tier]) => ({
    key,
    name: tier.name,
    monthlyPrice: tier.monthlyPrice,
    annualPrice: tier.annualPrice,
    features: {
      sports: tier.features.sports,
      showConfidence: tier.features.showConfidence,
      showAdvancedStats: tier.features.showAdvancedStats,
      showAmericanOdds: tier.features.showAmericanOdds,
      showDrawOdds: tier.features.showDrawOdds,
      liveUpdates: tier.features.liveUpdates,
      maxMatchupsPerSport:
        tier.features.maxMatchupsPerSport === Infinity
          ? 'Unlimited'
          : tier.features.maxMatchupsPerSport,
    },
  }));
  return res.json(plans);
});

// POST /api/subscriptions/upgrade  – protected
// Body: { tier: 'pro'|'elite', billing: 'monthly'|'annual' }
router.post('/upgrade', authenticate, (req, res) => {
  const { tier, billing = 'monthly' } = req.body;
  if (!TIERS[tier] || tier === 'free') {
    return res.status(400).json({ error: 'Invalid tier. Must be "pro" or "elite".' });
  }
  if (!['monthly', 'annual'].includes(billing)) {
    return res.status(400).json({ error: 'billing must be "monthly" or "annual"' });
  }

  const price =
    billing === 'annual' ? TIERS[tier].annualPrice : TIERS[tier].monthlyPrice;

  // In a real system, payment processing (Stripe etc.) would happen here.
  // We simulate a successful payment and update the user record.
  const daysToAdd = billing === 'annual' ? 365 : 30;
  const expiresAt = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();

  const updatedUser = store.updateUser(req.user.id, {
    tier,
    subscriptionExpiresAt: expiresAt,
    billingCycle: billing,
  });

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({
    message: `Successfully upgraded to ${TIERS[tier].name} (${billing})`,
    tier,
    billing,
    price,
    subscriptionExpiresAt: expiresAt,
  });
});

// POST /api/subscriptions/cancel  – protected
router.post('/cancel', authenticate, (req, res) => {
  const updatedUser = store.updateUser(req.user.id, {
    tier: 'free',
    subscriptionExpiresAt: null,
    billingCycle: null,
  });
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ message: 'Subscription cancelled. You are now on the Free plan.' });
});

module.exports = router;
