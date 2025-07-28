// Example test file to demonstrate test structure
const request = require('supertest');
const app = require('../src/index');

describe('Example API Tests', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Dream Skeleton API' });
  });

  test('Server should handle invalid routes', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});