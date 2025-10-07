require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  },
  database: {
    storage: process.env.DB_STORAGE || 'src/database.sqlite'
  }
};