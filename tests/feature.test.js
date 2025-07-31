const request = require('supertest');
const app = require('../src/index');

describe('Hello World Endpoint Tests', () => {
  test('GET /hello should return hello world message', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello world!' });
  });

  test('GET /hello should return JSON content type', async () => {
    const response = await request(app).get('/hello');
    expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  test('GET /hello should return exact message format', async () => {
    const response = await request(app).get('/hello');
    expect(response.body.message).toBe('hello world!');
    expect(response.body.message).not.toBe('Hello World!');
    expect(response.body.message).not.toBe('hello world');
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

  test('GET /hello should handle query parameters gracefully', async () => {
    const response = await request(app).get('/hello?param=value');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'hello world!' });
  });

  test('GET /hello should return consistent response on multiple calls', async () => {
    const response1 = await request(app).get('/hello');
    const response2 = await request(app).get('/hello');
    const response3 = await request(app).get('/hello');
    
    expect(response1.body).toEqual(response2.body);
    expect(response2.body).toEqual(response3.body);
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response3.status).toBe(200);
  });
});