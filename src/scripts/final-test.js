// Clear the module cache to ensure fresh imports
delete require.cache[require.resolve('../models')];

const { User, Post, syncDatabase } = require('../models');

const finalTest = async () => {
  try {
    console.log('🎯 Starting final test...');

    // Sync database
    await syncDatabase();
    console.log('✅ Database synced');

    // Create a user
    console.log('👤 Creating user...');
    const user = await User.create({
      username: 'finaltest',
      email: 'final@test.com',
      password_hash: 'Final123!'
    });
    console.log('✅ User created:', user.id);

    // Create a post with the user
    console.log('📝 Creating post...');
    const postData = {
      title: 'Final Test Post',
      content: 'This is the final test content',
      user_id: user.id
    };
    console.log('🔍 Post data:', postData);

    const post = await Post.create(postData);
    console.log('✅ Post created:', post.toJSON());

    // Test relationship
    const userWithPosts = await User.findByPk(user.id, {
      include: [{ model: Post, as: 'posts' }]
    });

    console.log('✅ Relationship test passed');
    console.log(`User "${userWithPosts.username}" has ${userWithPosts.posts.length} posts`);

    // Clean up
    await post.destroy();
    await user.destroy();

    console.log('\n🎉 FINAL TEST PASSED! Everything is working correctly.');

  } catch (error) {
    console.error('❌ Final test failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);

    if (error.errors) {
      console.error('Validation errors:');
      error.errors.forEach(err => {
        console.error(`  - ${err.path}: ${err.message}`);
        console.error(`    Value: ${err.value}`);
        console.error(`    Instance:`, err.instance);
      });
    }

    process.exit(1);
  }
};

finalTest();