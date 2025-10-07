const fs = require('fs');
const path = require('path');
const { syncDatabase } = require('../models');

const safeReset = async () => {
  try {
    const dbPath = path.join(__dirname, '..', 'database.sqlite');

    // Check if database file exists
    if (fs.existsSync(dbPath)) {
      console.log('🗑️  Removing existing database...');
      fs.unlinkSync(dbPath);
      console.log('✅ Database file removed');
    }

    // Sync with force to create fresh tables
    console.log('🆕 Creating fresh database...');
    await syncDatabase({ force: true });
    console.log('✅ Fresh database created');

    // Run seed
    console.log('🌱 Seeding database...');
    const seedDatabase = require('./seed');
    await seedDatabase();

    console.log('\n🎉 Database reset and seeded successfully!');

  } catch (error) {
    console.error('❌ Safe reset failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  safeReset();
}

module.exports = safeReset;