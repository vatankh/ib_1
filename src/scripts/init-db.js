const { sequelize, testConnection } = require('../config/database');

const initializeDatabase = async () => {
  try {
    await testConnection();
    console.log('Database connection test passed');

    // Sync will create tables based on models (to be created in Phase 2)
    // await sequelize.sync({ force: false });
    // console.log('Database synchronized');

    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
};

initializeDatabase();