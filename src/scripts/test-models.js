const { User, Post, syncDatabase } = require('../models');

const testModels = async () => {
  try {
    await syncDatabase();

    // Test User model
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password_hash: 'Test123!'
    });

    console.log('✅ User model test passed');
    console.log('User created:', testUser.toSafeObject());

    // Test Post model
    const testPost = await Post.create({
      title: 'Test Post',
      content: 'This is a test post content.',
      is_public: true,
      user_id: testUser.id
    });

    console.log('✅ Post model test passed');
    console.log('Post created:', testPost.get({ plain: true }));

    // Test password checking
    const isPasswordValid = await testUser.checkPassword('Test123!');
    console.log('✅ Password check test:', isPasswordValid ? 'PASSED' : 'FAILED');

    // Clean up
    await testPost.destroy();
    await testUser.destroy();

    console.log('\n🎉 All model tests passed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Model test failed:', error);
    process.exit(1);
  }
};

testModels();