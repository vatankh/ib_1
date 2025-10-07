const { verifyToken, extractTokenFromHeader } = require('../utils/jwt');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'User not found'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Authentication failed',
      message: error.message
    });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = extractTokenFromHeader(req.headers.authorization);
      const decoded = verifyToken(token);
      const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['password_hash'] }
      });
      req.user = user;
    }
    next();
  } catch (error) {
    // Continue without authentication for optional routes
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth
};