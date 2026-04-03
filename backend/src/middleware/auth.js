const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev_secret_change_in_production';

/**
 * Generate a signed JWT for a user.
 */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, tier: user.tier },
    SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Middleware: verify JWT from Authorization header.
 * Attaches decoded payload to req.user.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token expired or invalid' });
  }
}

/**
 * Middleware: require a minimum subscription tier.
 * Tier order: free < pro < elite
 */
const TIER_ORDER = { free: 0, pro: 1, elite: 2 };

function requireTier(minTier) {
  return (req, res, next) => {
    const userLevel = TIER_ORDER[req.user?.tier] ?? 0;
    const requiredLevel = TIER_ORDER[minTier] ?? 0;
    if (userLevel < requiredLevel) {
      return res.status(403).json({
        error: `This feature requires the '${minTier}' plan or higher.`,
        requiredTier: minTier,
        currentTier: req.user?.tier,
      });
    }
    next();
  };
}

module.exports = { generateToken, authenticate, requireTier };
