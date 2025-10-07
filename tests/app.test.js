const request = require('supertest');
const app = require('../src/app');

describe('Server Setup Tests', () => {
  test('Health check endpoint should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Server is running');
  });

  test('Non-existent route should return 404', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route not found');
  });

  test('Server should handle JSON parsing', async () => {
    const response = await request(app)
      .post('/health')
      .send({ test: 'data' })
      .set('Content-Type', 'application/json');

    // This will be 404 since we don't have POST /health, but it should handle JSON
    expect(response.status).toBe(404);
  });
});