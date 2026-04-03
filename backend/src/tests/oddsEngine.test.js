/**
 * Tests for the odds calculation engine.
 * Uses Node.js built-in test runner (node --test).
 */
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { calculateOdds, getOddsForSport, getAllOdds } = require('../services/oddsEngine');

describe('oddsEngine', () => {
  it('returns teamA and teamB odds for a football matchup', () => {
    const teamA = { elo: 1600, avgFor: 25, avgAgainst: 18, recentResults: [1, 1, 0, 1, 1] };
    const teamB = { elo: 1550, avgFor: 22, avgAgainst: 21, recentResults: [0, 1, 0, 1, 0] };
    const result = calculateOdds(teamA, teamB, { sport: 'football' });

    assert.ok(result.teamA, 'teamA odds should exist');
    assert.ok(result.teamB, 'teamB odds should exist');
    assert.ok(result.teamA.decimalOdds >= 1, 'teamA decimal odds >= 1');
    assert.ok(result.teamB.decimalOdds >= 1, 'teamB decimal odds >= 1');
  });

  it('probabilities sum to approximately 100% for non-draw sport', () => {
    const teamA = { elo: 1700, avgFor: 28, avgAgainst: 17, recentResults: [1, 1, 1, 1, 0] };
    const teamB = { elo: 1600, avgFor: 23, avgAgainst: 20, recentResults: [0, 1, 0, 0, 1] };
    const result = calculateOdds(teamA, teamB, { sport: 'basketball' });

    const sum = result.teamA.winProbability + result.teamB.winProbability;
    // Due to vig the implied probabilities won't sum to exactly 100
    assert.ok(sum > 90 && sum < 115, `Probabilities sum (${sum}) should be ~100`);
  });

  it('includes draw odds for soccer', () => {
    const teamA = { elo: 1800, avgFor: 2.4, avgAgainst: 1.0, recentResults: [1, 1, 0, 1, 0] };
    const teamB = { elo: 1780, avgFor: 2.2, avgAgainst: 1.1, recentResults: [0, 1, 1, 0, 1] };
    const result = calculateOdds(teamA, teamB, { sport: 'soccer' });

    assert.ok(result.draw !== null, 'draw odds should exist for soccer');
    assert.ok(result.draw.probability > 0, 'draw probability > 0');
  });

  it('higher elo team has higher win probability (home advantage)', () => {
    const strong = { elo: 1800, avgFor: 26, avgAgainst: 18, recentResults: [1, 1, 1, 1, 1] };
    const weak = { elo: 1500, avgFor: 19, avgAgainst: 25, recentResults: [0, 0, 0, 0, 0] };
    const result = calculateOdds(strong, weak, { sport: 'football' });

    assert.ok(
      result.teamA.winProbability > result.teamB.winProbability,
      'Stronger team should have higher win probability'
    );
  });

  it('confidence score is in range 0-100', () => {
    const teamA = { elo: 1700, avgFor: 25, avgAgainst: 18, recentResults: [1, 1, 1, 0, 1] };
    const teamB = { elo: 1600, avgFor: 22, avgAgainst: 20, recentResults: [0, 1, 0, 1, 0] };
    const result = calculateOdds(teamA, teamB, { sport: 'football' });

    assert.ok(result.confidence >= 0 && result.confidence <= 100, 'Confidence in 0-100 range');
  });

  it('getOddsForSport returns array of matchups for nfl', () => {
    const odds = getOddsForSport('nfl');
    assert.ok(Array.isArray(odds), 'Should return array');
    assert.ok(odds.length > 0, 'Should have at least one matchup');
    assert.ok(odds[0].homeTeam, 'Matchup should have homeTeam');
    assert.ok(odds[0].awayTeam, 'Matchup should have awayTeam');
  });

  it('getAllOdds returns all sports', () => {
    const all = getAllOdds();
    const expectedSports = ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'tennis', 'mma'];
    for (const sport of expectedSports) {
      assert.ok(all[sport], `Should have odds for ${sport}`);
    }
  });
});
