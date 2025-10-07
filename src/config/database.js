const { Sequelize } = require('sequelize');
const path = require('path');

console.log('🔍 Loading database configuration...');

// Determine database storage path
const dbPath = process.env.DB_STORAGE || path.join(__dirname, '..', 'database.sqlite');
console.log('🔍 Database path:', dbPath);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: (msg) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 SQL:', msg);
    }
  },
  define: {
    timestamps: true,
    underscored: true,
  }
});

console.log('🔍 Sequelize instance created');

// Test database connection
const testConnection = async () => {
  try {
    console.log('🔍 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    return false;
  }
};

console.log('✅ Database configuration loaded');

module.exports = { sequelize, testConnection };