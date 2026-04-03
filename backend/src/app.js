require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const oddsRouter = require('./routes/odds');
const subscriptionsRouter = require('./routes/subscriptions');

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRouter);
app.use('/api/odds', oddsRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// 404 catch-all
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ElJefe API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
