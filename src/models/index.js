const { sequelize } = require('../config/database');

console.log('🔍 Starting model initialization...');

// Import models
const User = require('./User');
const Post = require('./Post');

console.log('🔍 Models imported, setting up relationships...');

// Define relationships
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});

console.log('🔍 Relationships defined');

// Sync database with better error handling
// Sync database with better error handling
const syncDatabase = async (options = {}) => {
  try {
    const syncOptions = {
      force: false, // Never use force in production
      alter: false, // Disable alter to prevent the backup table issue
      ...options
    };

    console.log('🔍 Starting database sync...');

    // Test if tables exist first
    const tableCheck = await sequelize.query(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name IN ('users', 'posts')
    `);

    const existingTables = tableCheck[0].map(row => row.name);
    console.log('📊 Existing tables:', existingTables);

    if (existingTables.length === 0) {
      // No tables exist, create them
      console.log('🆕 Creating new tables...');
      await sequelize.sync({ force: false, alter: false });
    } else {
      // Tables exist, just authenticate
      console.log('✅ Tables already exist, skipping sync');
      await sequelize.authenticate();
    }

    console.log('✅ Database synchronized successfully');
    return true;

  } catch (error) {
    console.error('❌ Database synchronization failed:', error);

    if (error.name === 'SequelizeConnectionError') {
      console.error('Database connection error. Please check your database configuration.');
    }

    // For sync errors, we'll just authenticate instead
    console.log('🔄 Falling back to authentication only...');
    try {
      await sequelize.authenticate();
      console.log('✅ Database authentication successful (sync skipped)');
      return true;
    } catch (authError) {
      console.error('❌ Database authentication also failed:', authError);
      throw authError;
    }
  }
};

console.log('✅ Model initialization complete');

module.exports = {
  sequelize,
  User,
  Post,
  syncDatabase
};