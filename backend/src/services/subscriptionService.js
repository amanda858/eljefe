/**
 * Subscription tier definitions and feature gates.
 */

const TIERS = {
  free: {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    features: {
      sports: ['nfl'],           // Only 1 sport visible
      maxMatchupsPerSport: 1,    // Only 1 game per sport
      showConfidence: false,
      showAdvancedStats: false,
      showAmericanOdds: false,
      showDrawOdds: false,
      liveUpdates: false,
    },
  },
  pro: {
    name: 'Pro',
    monthlyPrice: 19.99,
    annualPrice: 179.99,
    features: {
      sports: ['nfl', 'nba', 'mlb', 'nhl', 'soccer'],
      maxMatchupsPerSport: 4,
      showConfidence: true,
      showAdvancedStats: false,
      showAmericanOdds: true,
      showDrawOdds: true,
      liveUpdates: false,
    },
  },
  elite: {
    name: 'Elite',
    monthlyPrice: 49.99,
    annualPrice: 449.99,
    features: {
      sports: ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'tennis', 'mma'],
      maxMatchupsPerSport: Infinity,
      showConfidence: true,
      showAdvancedStats: true,
      showAmericanOdds: true,
      showDrawOdds: true,
      liveUpdates: true,
    },
  },
};

/**
 * Filter odds data based on the user's subscription tier.
 */
function applyTierFilter(allOdds, tierKey) {
  const tier = TIERS[tierKey] || TIERS.free;
  const { features } = tier;
  const filtered = {};

  for (const sport of features.sports) {
    if (!allOdds[sport]) continue;
    let games = allOdds[sport].slice(0, features.maxMatchupsPerSport);

    games = games.map((game) => {
      const g = { ...game, odds: { ...game.odds } };

      if (!features.showConfidence) {
        delete g.odds.confidence;
      }

      if (!features.showAmericanOdds) {
        if (g.odds.teamA) delete g.odds.teamA.americanOdds;
        if (g.odds.teamB) delete g.odds.teamB.americanOdds;
        if (g.odds.draw) delete g.odds.draw.americanOdds;
      }

      if (!features.showDrawOdds) {
        g.odds.draw = null;
      }

      if (!features.showAdvancedStats) {
        // Remove probability on free/pro (decimal odds still shown)
        // Free tier hides win probability too
        if (tierKey === 'free') {
          if (g.odds.teamA) delete g.odds.teamA.winProbability;
          if (g.odds.teamB) delete g.odds.teamB.winProbability;
        }
      }

      return g;
    });

    filtered[sport] = games;
  }

  return filtered;
}

module.exports = { TIERS, applyTierFilter };
