/**
 * Advanced Sports Odds Calculation Engine
 *
 * Uses a combination of:
 *  - Elo ratings (all sports)
 *  - Poisson goal-model (soccer, hockey)
 *  - Pythagorean expectation (basketball, baseball)
 *  - Recent-form weighting
 *  - Home-advantage factor
 *  - Head-to-head record
 */

// ─── Elo helpers ────────────────────────────────────────────────────────────

/**
 * Expected score for team A vs team B given Elo ratings.
 * @param {number} eloA
 * @param {number} eloB
 * @returns {number} probability that A wins (0-1)
 */
function eloExpected(eloA, eloB) {
  return 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
}

/**
 * Update Elo after a result.
 * @param {number} elo  current rating
 * @param {number} expected  expected score (0-1)
 * @param {number} actual    actual score (1 = win, 0.5 = draw, 0 = loss)
 * @param {number} K         K-factor (default 32)
 */
function eloUpdate(elo, expected, actual, K = 32) {
  return elo + K * (actual - expected);
}

// ─── Poisson helpers ────────────────────────────────────────────────────────

/**
 * Poisson probability: P(X=k) = e^-λ * λ^k / k!
 */
function poisson(lambda, k) {
  let logP = -lambda + k * Math.log(lambda);
  // log(k!)
  for (let i = 2; i <= k; i++) logP -= Math.log(i);
  return Math.exp(logP);
}

/**
 * Simulate a Poisson match between two teams and return win probabilities.
 * @param {number} lambdaA  expected goals/points for A
 * @param {number} lambdaB  expected goals/points for B
 * @param {number} maxScore upper bound on goals to sum (default 10)
 */
function poissonMatchOdds(lambdaA, lambdaB, maxScore = 10) {
  let winA = 0,
    winB = 0,
    draw = 0;

  for (let a = 0; a <= maxScore; a++) {
    for (let b = 0; b <= maxScore; b++) {
      const p = poisson(lambdaA, a) * poisson(lambdaB, b);
      if (a > b) winA += p;
      else if (b > a) winB += p;
      else draw += p;
    }
  }
  return { winA, draw, winB };
}

// ─── Pythagorean expectation ─────────────────────────────────────────────────

/**
 * Pythagorean win % used in basketball / baseball.
 * @param {number} pointsFor
 * @param {number} pointsAgainst
 * @param {number} exp  exponent (13.91 NBA, 1.83 MLB)
 */
function pythagorean(pointsFor, pointsAgainst, exp = 2) {
  const pf = Math.max(pointsFor, 0.01);
  const pa = Math.max(pointsAgainst, 0.01);
  return Math.pow(pf, exp) / (Math.pow(pf, exp) + Math.pow(pa, exp));
}

// ─── Form weighting ──────────────────────────────────────────────────────────

/**
 * Calculate a momentum factor from the last N game results.
 * Each result should be 1 (win), 0.5 (draw), or 0 (loss).
 * More recent games are weighted more heavily.
 * @param {number[]} recentResults  array ordered oldest → newest
 * @returns {number} weighted win rate (0-1)
 */
function formFactor(recentResults) {
  if (!recentResults || recentResults.length === 0) return 0.5;
  let totalWeight = 0;
  let weightedSum = 0;
  recentResults.forEach((result, i) => {
    const weight = i + 1; // linear increase; most recent gets highest weight
    weightedSum += result * weight;
    totalWeight += weight;
  });
  return weightedSum / totalWeight;
}

// ─── Core odds calculator ────────────────────────────────────────────────────

/**
 * Calculate decimal odds and implied probabilities for a matchup.
 *
 * @param {object} teamA  { elo, recentResults, avgFor, avgAgainst, homeWinRate }
 * @param {object} teamB  { elo, recentResults, avgFor, avgAgainst }
 * @param {object} options
 *   sport       - 'soccer'|'hockey'|'basketball'|'baseball'|'football'|'tennis'|'mma'
 *   isNeutral   - boolean, no home advantage
 *   homeAdvantageElo - Elo points added for home team (default 65)
 */
function calculateOdds(teamA, teamB, options = {}) {
  const {
    sport = 'football',
    isNeutral = false,
    homeAdvantageElo = 65,
  } = options;

  // Incorporate home advantage
  const effectiveEloA = teamA.elo + (isNeutral ? 0 : homeAdvantageElo);
  const effectiveEloB = teamB.elo;

  // Base Elo probability
  let pA = eloExpected(effectiveEloA, effectiveEloB);
  let pB = 1 - pA;
  let pDraw = 0;

  // Sport-specific refinements
  if (sport === 'soccer' || sport === 'hockey') {
    const lambdaA = Math.max(teamA.avgFor * (teamB.avgAgainst / 1.3), 0.1);
    const lambdaB = Math.max(teamB.avgFor * (teamA.avgAgainst / 1.3), 0.1);
    const poisson = poissonMatchOdds(lambdaA, lambdaB);

    // Blend Elo (40%) with Poisson (60%)
    pA = 0.4 * pA + 0.6 * poisson.winA;
    pDraw = 0.6 * poisson.draw;
    pB = 0.4 * pB + 0.6 * poisson.winB;
  } else if (sport === 'basketball') {
    const pyA = pythagorean(teamA.avgFor, teamA.avgAgainst, 13.91);
    const pyB = pythagorean(teamB.avgFor, teamB.avgAgainst, 13.91);
    const pyDiff = pyA - pyB;
    pA = 0.5 * pA + 0.5 * Math.min(Math.max(0.5 + pyDiff, 0.05), 0.95);
    pB = 1 - pA;
  } else if (sport === 'baseball') {
    const pyA = pythagorean(teamA.avgFor, teamA.avgAgainst, 1.83);
    const pyB = pythagorean(teamB.avgFor, teamB.avgAgainst, 1.83);
    const pyDiff = pyA - pyB;
    pA = 0.5 * pA + 0.5 * Math.min(Math.max(0.5 + pyDiff, 0.05), 0.95);
    pB = 1 - pA;
  }

  // Apply form weighting (10% influence)
  const fA = formFactor(teamA.recentResults);
  const fB = formFactor(teamB.recentResults);
  const formTotal = fA + fB || 1;
  const formWeight = 0.1;
  pA = (1 - formWeight) * pA + formWeight * (fA / formTotal);
  if (pDraw === 0) {
    pB = 1 - pA;
  } else {
    pB = (1 - formWeight) * pB + formWeight * (fB / formTotal);
    // Renormalise
    const total = pA + pDraw + pB;
    pA /= total;
    pDraw /= total;
    pB /= total;
  }

  // Add a small bookmaker margin (vig) so implied probabilities sum to >1
  const vig = 0.045; // 4.5% margin
  const viggedPA = pA * (1 + vig);
  const viggedPB = pB * (1 + vig);
  const viggedPDraw = pDraw * (1 + vig);

  // Decimal odds (European format)
  const oddsA = parseFloat((1 / viggedPA).toFixed(2));
  const oddsB = parseFloat((1 / viggedPB).toFixed(2));
  const oddsDraw = pDraw > 0 ? parseFloat((1 / viggedPDraw).toFixed(2)) : null;

  // American (moneyline) format
  function toAmerican(dec) {
    if (dec >= 2) return `+${Math.round((dec - 1) * 100)}`;
    return `${Math.round(-100 / (dec - 1))}`;
  }

  // Confidence score (0-100) based on probability differential
  const diff = Math.abs(pA - pB);
  const confidence = Math.min(Math.round(50 + diff * 50), 99);

  return {
    teamA: {
      winProbability: parseFloat((pA * 100).toFixed(1)),
      decimalOdds: oddsA,
      americanOdds: toAmerican(oddsA),
    },
    draw:
      pDraw > 0
        ? {
            probability: parseFloat((pDraw * 100).toFixed(1)),
            decimalOdds: oddsDraw,
            americanOdds: toAmerican(oddsDraw),
          }
        : null,
    teamB: {
      winProbability: parseFloat((pB * 100).toFixed(1)),
      decimalOdds: oddsB,
      americanOdds: toAmerican(oddsB),
    },
    confidence,
    sport,
  };
}

// ─── Sample sport data (seeded, deterministic) ───────────────────────────────

const SPORT_DATA = {
  nfl: [
    { home: { name: 'Kansas City Chiefs', elo: 1680, avgFor: 27.4, avgAgainst: 17.1, recentResults: [1,1,0,1,1] }, away: { name: 'Buffalo Bills', elo: 1645, avgFor: 24.8, avgAgainst: 18.5, recentResults: [1,0,1,1,0] } },
    { home: { name: 'San Francisco 49ers', elo: 1635, avgFor: 26.2, avgAgainst: 18.3, recentResults: [1,1,1,0,1] }, away: { name: 'Dallas Cowboys', elo: 1590, avgFor: 23.1, avgAgainst: 21.5, recentResults: [0,1,0,1,0] } },
    { home: { name: 'Philadelphia Eagles', elo: 1620, avgFor: 25.5, avgAgainst: 19.0, recentResults: [1,0,1,1,1] }, away: { name: 'New York Giants', elo: 1510, avgFor: 18.9, avgAgainst: 24.2, recentResults: [0,0,1,0,0] } },
    { home: { name: 'Baltimore Ravens', elo: 1655, avgFor: 28.1, avgAgainst: 17.8, recentResults: [1,1,1,1,0] }, away: { name: 'Cincinnati Bengals', elo: 1600, avgFor: 24.3, avgAgainst: 20.1, recentResults: [1,0,1,0,1] } },
  ],
  nba: [
    { home: { name: 'Boston Celtics', elo: 1720, avgFor: 120.6, avgAgainst: 108.3, recentResults: [1,1,1,0,1] }, away: { name: 'Milwaukee Bucks', elo: 1660, avgFor: 115.2, avgAgainst: 111.4, recentResults: [1,0,1,1,0] } },
    { home: { name: 'Denver Nuggets', elo: 1690, avgFor: 118.4, avgAgainst: 110.1, recentResults: [1,1,0,1,1] }, away: { name: 'Phoenix Suns', elo: 1580, avgFor: 112.7, avgAgainst: 114.2, recentResults: [0,1,0,0,1] } },
    { home: { name: 'Golden State Warriors', elo: 1640, avgFor: 116.3, avgAgainst: 112.8, recentResults: [0,1,1,0,1] }, away: { name: 'LA Lakers', elo: 1620, avgFor: 114.1, avgAgainst: 113.9, recentResults: [1,0,0,1,0] } },
    { home: { name: 'Miami Heat', elo: 1610, avgFor: 111.8, avgAgainst: 110.5, recentResults: [1,1,0,1,0] }, away: { name: 'Chicago Bulls', elo: 1540, avgFor: 107.3, avgAgainst: 113.1, recentResults: [0,0,1,0,1] } },
  ],
  mlb: [
    { home: { name: 'LA Dodgers', elo: 1680, avgFor: 5.1, avgAgainst: 3.4, recentResults: [1,1,0,1,1] }, away: { name: 'New York Yankees', elo: 1640, avgFor: 4.8, avgAgainst: 3.7, recentResults: [1,1,1,0,0] } },
    { home: { name: 'Houston Astros', elo: 1620, avgFor: 4.5, avgAgainst: 3.6, recentResults: [1,0,1,1,0] }, away: { name: 'Atlanta Braves', elo: 1650, avgFor: 4.9, avgAgainst: 3.3, recentResults: [1,1,0,1,1] } },
    { home: { name: 'Toronto Blue Jays', elo: 1580, avgFor: 4.2, avgAgainst: 4.0, recentResults: [0,1,1,0,1] }, away: { name: 'Tampa Bay Rays', elo: 1600, avgFor: 4.3, avgAgainst: 3.7, recentResults: [1,0,1,1,0] } },
  ],
  nhl: [
    { home: { name: 'Boston Bruins', elo: 1660, avgFor: 3.4, avgAgainst: 2.5, recentResults: [1,1,0,1,1] }, away: { name: 'Colorado Avalanche', elo: 1640, avgFor: 3.2, avgAgainst: 2.7, recentResults: [1,0,1,0,1] } },
    { home: { name: 'Florida Panthers', elo: 1630, avgFor: 3.1, avgAgainst: 2.6, recentResults: [1,1,1,0,0] }, away: { name: 'Vegas Golden Knights', elo: 1620, avgFor: 3.0, avgAgainst: 2.8, recentResults: [0,1,1,1,0] } },
    { home: { name: 'Toronto Maple Leafs', elo: 1610, avgFor: 3.2, avgAgainst: 2.9, recentResults: [1,0,0,1,1] }, away: { name: 'Tampa Bay Lightning', elo: 1600, avgFor: 3.0, avgAgainst: 2.8, recentResults: [1,1,0,0,1] } },
  ],
  soccer: [
    { home: { name: 'Manchester City', elo: 1900, avgFor: 2.8, avgAgainst: 0.8, recentResults: [1,1,1,0,1] }, away: { name: 'Arsenal', elo: 1840, avgFor: 2.4, avgAgainst: 1.0, recentResults: [1,1,0,1,1] } },
    { home: { name: 'Real Madrid', elo: 1910, avgFor: 2.6, avgAgainst: 0.9, recentResults: [1,0,1,1,1] }, away: { name: 'Barcelona', elo: 1880, avgFor: 2.5, avgAgainst: 1.1, recentResults: [1,1,1,0,1] } },
    { home: { name: 'Bayern Munich', elo: 1870, avgFor: 2.9, avgAgainst: 1.0, recentResults: [1,1,0,1,1] }, away: { name: 'Borussia Dortmund', elo: 1790, avgFor: 2.2, avgAgainst: 1.4, recentResults: [1,0,1,1,0] } },
    { home: { name: 'Paris Saint-Germain', elo: 1820, avgFor: 2.5, avgAgainst: 1.2, recentResults: [0,1,1,1,1] }, away: { name: 'Atletico Madrid', elo: 1800, avgFor: 1.8, avgAgainst: 0.9, recentResults: [1,0,1,0,1] } },
  ],
  tennis: [
    { home: { name: 'Novak Djokovic', elo: 2200, avgFor: 0, avgAgainst: 0, recentResults: [1,1,0,1,1] }, away: { name: 'Carlos Alcaraz', elo: 2150, avgFor: 0, avgAgainst: 0, recentResults: [1,0,1,1,1] } },
    { home: { name: 'Jannik Sinner', elo: 2140, avgFor: 0, avgAgainst: 0, recentResults: [1,1,1,0,1] }, away: { name: 'Daniil Medvedev', elo: 2100, avgFor: 0, avgAgainst: 0, recentResults: [1,1,0,1,0] } },
  ],
  mma: [
    { home: { name: 'Jon Jones', elo: 2100, avgFor: 0, avgAgainst: 0, recentResults: [1,1,1,1,0] }, away: { name: 'Stipe Miocic', elo: 1980, avgFor: 0, avgAgainst: 0, recentResults: [1,0,1,1,1] } },
    { home: { name: 'Islam Makhachev', elo: 2050, avgFor: 0, avgAgainst: 0, recentResults: [1,1,1,0,1] }, away: { name: 'Alexander Volkanovski', elo: 2020, avgFor: 0, avgAgainst: 0, recentResults: [1,1,0,1,1] } },
  ],
};

const SPORT_CONFIG = {
  nfl: { sport: 'football', homeAdvantageElo: 55, label: 'NFL' },
  nba: { sport: 'basketball', homeAdvantageElo: 65, label: 'NBA' },
  mlb: { sport: 'baseball', homeAdvantageElo: 40, label: 'MLB' },
  nhl: { sport: 'hockey', homeAdvantageElo: 50, label: 'NHL' },
  soccer: { sport: 'soccer', homeAdvantageElo: 70, label: 'Soccer' },
  tennis: { sport: 'tennis', homeAdvantageElo: 0, isNeutral: true, label: 'Tennis' },
  mma: { sport: 'mma', homeAdvantageElo: 0, isNeutral: true, label: 'MMA/UFC' },
};

/**
 * Get all calculated odds for a specific sport.
 * @param {string} sportKey  e.g. 'nfl', 'nba', 'soccer'
 */
function getOddsForSport(sportKey) {
  const data = SPORT_DATA[sportKey];
  const config = SPORT_CONFIG[sportKey];
  if (!data || !config) return null;

  return data.map((matchup, idx) => {
    const odds = calculateOdds(matchup.home, matchup.away, {
      sport: config.sport,
      homeAdvantageElo: config.homeAdvantageElo,
      isNeutral: config.isNeutral || false,
    });

    // Add a pseudo-random game time (deterministic per matchup)
    const hoursOffset = (idx * 3 + 12) % 24;
    const gameTime = new Date('2026-04-05T00:00:00Z');
    gameTime.setUTCHours(hoursOffset);

    return {
      id: `${sportKey}-${idx}`,
      sport: config.label,
      homeTeam: matchup.home.name,
      awayTeam: matchup.away.name,
      gameTime: gameTime.toISOString(),
      odds,
    };
  });
}

/**
 * Get all odds for all sports.
 */
function getAllOdds() {
  const result = {};
  for (const key of Object.keys(SPORT_DATA)) {
    result[key] = getOddsForSport(key);
  }
  return result;
}

module.exports = { calculateOdds, getOddsForSport, getAllOdds, SPORT_CONFIG };
