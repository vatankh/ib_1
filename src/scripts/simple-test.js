const { Sequelize } = require('sequelize');
const path = require('path');

// Create a fresh sequelize instance for testing
const testSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'test-database.sqlite'),
  logging: console.log
});

// Define a simple test model
const TestPost = testSequelize.define('TestPost', {
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'test_posts'
});

const testDirect = async () => {
  try {
    console.log('🧪 Starting direct test...');

    // Sync the test model
    await testSequelize.sync({ force: true });
    console.log('✅ Test database synced');

    // Try to create a post directly
    const testData = {
      title: 'Direct Test Post',
      content: 'This is direct test content',
      user_id: 1
    };

    console.log('🔍 Creating post with data:', testData);

    const testPost = await TestPost.create(testData);
    console.log('✅ Direct test post created:', testPost.toJSON());

    // Clean up
    await testSequelize.close();
    console.log('🎉 Direct test passed!');

  } catch (error) {
    console.error('❌ Direct test failed:', error);
    if (error.errors) {
      error.errors.forEach(err => {
        console.error(`   - ${err.path}: ${err.message}, value: ${err.value}`);
      });
    }
  }
};

testDirect();