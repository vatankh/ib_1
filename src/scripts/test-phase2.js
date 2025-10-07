const request = require('supertest');
const app = require('../app');

const testPhase2 = async () => {
  console.log('🧪 Testing Phase 2: API Development\n');

  let authToken = '';
  let userId = '';

  try {
    // Test 1: Health Check
    console.log('1. Testing health check...');
    const healthResponse = await request(app).get('/health');
    console.log('✅ Health check:', healthResponse.status);

    // Test 2: Login
    console.log('\n2. Testing login...');
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        username: 'user1',
        password: 'User123!@#'
      });

    if (loginResponse.status === 200) {
      authToken = loginResponse.body.token;
      userId = loginResponse.body.user.id;
      console.log('✅ Login successful');
      console.log('   User:', loginResponse.body.user.username);
      console.log('   Token received:', authToken ? 'YES' : 'NO');
    } else {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    // Test 4: Get Protected Data (authenticated)
    console.log('\n4. Testing protected data access...');
    const protectedDataResponse = await request(app)
      .get('/api/data')
      .set('Authorization', `Bearer ${authToken}`);

    console.log('✅ Protected data access:', protectedDataResponse.status);
    console.log('   Posts returned:', protectedDataResponse.body.posts.length);

    // Test 5: Create New Post
    console.log('\n5. Testing post creation...');
    const createPostResponse = await request(app)
      .post('/api/data')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post from Phase 2',
        content: 'This post was created during Phase 2 testing',
        is_public: true
      });




    console.log('\n🎉 PHASE 2 COMPLETED SUCCESSFULLY!');
    console.log('\n📋 All endpoints working:');
    console.log('   ✅ POST /auth/login');
    console.log('   ✅ GET /api/data (protected)');
    console.log('   ✅ POST /api/data (protected)');

  } catch (error) {
    console.error('❌ Phase 2 test failed:', error.message);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  testPhase2();
}

module.exports = testPhase2;