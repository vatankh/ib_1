const { User, Post, syncDatabase } = require('../models');

const seedDatabase = async () => {
  try {
    // Ensure database is synced
    await syncDatabase();
    console.log('Database synchronized');

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Post.destroy({ where: {} });
    await User.destroy({ where: {} });
    console.log('Cleared existing data');

    // Create sample users one by one to ensure we get their IDs
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password_hash: 'Admin123!@#', // Will be hashed by the model hook
      role: 'admin'
    });

    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
      password_hash: 'User123!@#',
      role: 'user'
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
      password_hash: 'User123!@#',
      role: 'user'
    });

    console.log('Sample users created');

    // Create sample posts one by one
    await Post.create({
      title: 'Welcome to our API',
      content: 'This is a public post that everyone can see.',
      is_public: true,
      user_id: adminUser.id
    });

    await Post.create({
      title: 'Private Thoughts',
      content: 'This post is private and only visible to the author and admin.',
      is_public: false,
      user_id: user1.id
    });

    await Post.create({
      title: 'Another Public Post',
      content: 'This is another public post with some interesting content.',
      is_public: true,
      user_id: user2.id
    });

    console.log('Sample posts created');

    console.log('\n✅ Sample data created successfully!');
    console.log('\nDefault users created:');
    console.log('- admin / Admin123!@# (admin role)');
    console.log('- user1 / User123!@# (user role)');
    console.log('- user2 / User123!@# (user role)');
    console.log('\nYou can now test the API with these credentials.');

  } catch (error) {
    console.error('Error seeding database:', error);

    // More detailed error logging
    if (error.name === 'SequelizeValidationError') {
      error.errors.forEach(err => {
        console.error(`Validation error on ${err.path}: ${err.message}`);
      });
    }

    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Duplicate entry error:', error.message);
    }

    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;