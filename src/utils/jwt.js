const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    issuer: 'secure-rest-api'
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) {
    throw new Error('Authorization header is required');
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    throw new Error('Authorization header format should be: Bearer [token]');
  }

  return parts[1];
};

module.exports = {
  generateToken,
  verifyToken,
  extractTokenFromHeader
};