require('dotenv').config();
const app = require('./app');
const { syncDatabase } = require('./models');

const PORT = process.env.PORT || 3000;

// Initialize and start server
const startServer = async () => {
  try {
    // Sync database models (with safe options)
    const dbSynced = await syncDatabase({
      force: false,
      alter: false
    });

    if (dbSynced) {
      console.log('✅ Database ready');
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`
🚀 Server is running!
📍 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📊 Database: SQLite
🔐 Authentication: JWT
      `);
      console.log('\n📋 Available endpoints:');
      console.log('  POST /auth/login');
      console.log('  GET  /api/data');
      console.log('  POST /api/data');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();