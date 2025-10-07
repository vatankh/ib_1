const request = require('supertest');
const app = require('../src/app');

describe('Security Headers Tests', () => {
  test('Helmet security headers should be present', async () => {
    const response = await request(app).get('/health');

    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('SAMEORIGIN');
    expect(response.headers['x-download-options']).toBe('noopen');
    expect(response.headers['x-xss-protection']).toBe('0');
  });

  test('API should not expose sensitive headers', async () => {
    const response = await request(app).get('/health');

    // Should not contain server technology information
    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});