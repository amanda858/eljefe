const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const store = require('../utils/dataStore');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }
    if (store.findUserByEmail(email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = store.createUser({
      id: uuidv4(),
      name,
      email: email.toLowerCase().trim(),
      passwordHash,
      tier: 'free',
      createdAt: new Date().toISOString(),
      subscriptionExpiresAt: null,
    });

    const token = generateToken(user);
    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, tier: user.tier },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = store.findUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, tier: user.tier },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me  (protected)
router.get('/me', require('../middleware/auth').authenticate, (req, res) => {
  const user = store.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    tier: user.tier,
    createdAt: user.createdAt,
    subscriptionExpiresAt: user.subscriptionExpiresAt,
  });
});

module.exports = router;
