const request = require('supertest');
const app = require('../src/index');

describe('GET /hello-world endpoint', () => {
  test('GET /hello-world should return hello world', async () => {
    const response = await request(app).get('/hello-world');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello world');
  });

  test('GET /hello-world should return plain text content type', async () => {
    const response = await request(app).get('/hello-world');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/plain/);
  });

  test('GET /hello-world should not accept POST requests', async () => {
    const response = await request(app).post('/hello-world');
    expect(response.status).toBe(404);
  });

  test('GET /hello-world should not accept PUT requests', async () => {
    const response = await request(app).put('/hello-world');
    expect(response.status).toBe(404);
  });

  test('GET /hello-world should not accept DELETE requests', async () => {
    const response = await request(app).delete('/hello-world');
    expect(response.status).toBe(404);
  });

  test('GET /hello-world should ignore query parameters', async () => {
    const response = await request(app).get('/hello-world?param=value');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello world');
  });

  test('GET /hello-world should handle trailing slash', async () => {
    const response = await request(app).get('/hello-world/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('hello world');
  });
});