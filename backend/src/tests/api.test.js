/**
 * Integration tests for the API endpoints.
 * Uses Node.js built-in test runner.
 */
const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

// Use a random high port to avoid conflicts
const TEST_PORT = 14321;
process.env.JWT_SECRET = 'test_secret_key_123';
process.env.PORT = TEST_PORT;

// Point data store to a temp location
process.env.DATA_DIR_OVERRIDE = '/tmp/eljefe_test_data';

const app = require('../app');

let server;
let authToken;

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: TEST_PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
        ...headers,
      },
    };
    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', (c) => (raw += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, body: raw });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

before(
  () =>
    new Promise((resolve) => {
      server = app.listen(TEST_PORT, resolve);
    })
);

after(
  () =>
    new Promise((resolve) => {
      server.close(resolve);
      // Cleanup test data
      const fs = require('fs');
      try { fs.rmSync('/tmp/eljefe_test_data', { recursive: true, force: true }); } catch {}
    })
);

describe('Health', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request('GET', '/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
  });
});

describe('Auth', () => {
  it('POST /api/auth/register creates a new user', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'securepass1',
    });
    assert.equal(res.status, 201);
    assert.ok(res.body.token, 'Should return JWT token');
    assert.equal(res.body.user.tier, 'free');
    authToken = res.body.token;
  });

  it('POST /api/auth/register rejects duplicate email', async () => {
    const res = await request('POST', '/api/auth/register', {
      name: 'Duplicate',
      email: 'testuser@example.com',
      password: 'securepass1',
    });
    assert.equal(res.status, 409);
  });

  it('POST /api/auth/login returns token for valid credentials', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'testuser@example.com',
      password: 'securepass1',
    });
    assert.equal(res.status, 200);
    assert.ok(res.body.token);
  });

  it('POST /api/auth/login rejects bad password', async () => {
    const res = await request('POST', '/api/auth/login', {
      email: 'testuser@example.com',
      password: 'wrongpassword',
    });
    assert.equal(res.status, 401);
  });

  it('GET /api/auth/me returns current user', async () => {
    const res = await request('GET', '/api/auth/me', null, {
      Authorization: `Bearer ${authToken}`,
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.email, 'testuser@example.com');
  });
});

describe('Subscriptions', () => {
  it('GET /api/subscriptions/plans returns 3 plans', async () => {
    const res = await request('GET', '/api/subscriptions/plans');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.equal(res.body.length, 3);
    const names = res.body.map((p) => p.key);
    assert.ok(names.includes('free'));
    assert.ok(names.includes('pro'));
    assert.ok(names.includes('elite'));
  });

  it('POST /api/subscriptions/upgrade upgrades to pro', async () => {
    const res = await request(
      'POST',
      '/api/subscriptions/upgrade',
      { tier: 'pro', billing: 'monthly' },
      { Authorization: `Bearer ${authToken}` }
    );
    assert.equal(res.status, 200);
    assert.equal(res.body.tier, 'pro');
  });
});

describe('Odds', () => {
  it('GET /api/odds/sports returns sport list', async () => {
    const res = await request('GET', '/api/odds/sports');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length >= 4);
  });

  it('GET /api/odds requires auth', async () => {
    const res = await request('GET', '/api/odds');
    assert.equal(res.status, 401);
  });

  it('GET /api/odds returns odds filtered by tier', async () => {
    // Re-login to get a fresh token after tier upgrade
    const loginRes = await request('POST', '/api/auth/login', {
      email: 'testuser@example.com',
      password: 'securepass1',
    });
    // Note: token still has 'free' tier from JWT; upgrading doesn't refresh JWT in this test.
    // Use original authToken which was issued at free tier.
    const res = await request('GET', '/api/odds', null, {
      Authorization: `Bearer ${authToken}`,
    });
    assert.equal(res.status, 200);
    assert.ok(res.body.odds, 'Should have odds object');
  });
});
