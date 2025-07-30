const request = require('supertest');
const app = require('../src/index');

describe('Hello World Endpoint Tests', () => {
  test('GET /hello should return hello world message', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello world' });
  });

  test('GET /hello should return JSON content type', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  test('GET /hello should not accept POST requests', async () => {
    const response = await request(app).post('/hello');
    expect(response.status).toBe(404);
  });

  test('GET /hello should not accept PUT requests', async () => {
    const response = await request(app).put('/hello');
    expect(response.status).toBe(404);
  });

  test('GET /hello should not accept DELETE requests', async () => {
    const response = await request(app).delete('/hello');
    expect(response.status).toBe(404);
  });

  test('GET /hello should not accept PATCH requests', async () => {
    const response = await request(app).patch('/hello');
    expect(response.status).toBe(404);
  });

  test('GET /hello should handle query parameters gracefully', async () => {
    const response = await request(app).get('/hello?param=value');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello world' });
  });

  test('GET /hello should handle multiple query parameters', async () => {
    const response = await request(app).get('/hello?param1=value1&param2=value2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello world' });
  });

  test('GET /hello should return consistent response structure', async () => {
    const response = await request(app).get('/hello');
    expect(response.body).toHaveProperty('message');
    expect(typeof response.body.message).toBe('string');
  });

  test('GET /hello should be accessible without authentication', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
  });

  test('GET /hello should handle HEAD requests appropriately', async () => {
    const response = await request(app).head('/hello');
    expect([200, 404]).toContain(response.status);
  });

  test('GET /hello should return proper error for malformed path', async () => {
    const response = await request(app).get('/hello/');
    expect([200, 404]).toContain(response.status);
  });
});