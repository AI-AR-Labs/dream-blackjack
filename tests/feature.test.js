const request = require('supertest');
const app = require('../src/index');

describe('GET /api endpoint', () => {
  describe('Success cases', () => {
    test('should return 200 status code', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
    });

    test('should return JSON content type', async () => {
      const response = await request(app).get('/api');
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('should return hello world message', async () => {
      const response = await request(app).get('/api');
      expect(response.body).toEqual({ message: 'hello world!' });
    });

    test('should return exact message format', async () => {
      const response = await request(app).get('/api');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('hello world!');
      expect(Object.keys(response.body).length).toBe(1);
    });
  });

  describe('Edge cases', () => {
    test('should handle trailing slash', async () => {
      const response = await request(app).get('/api/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'hello world!' });
    });

    test('should be case sensitive for /api path', async () => {
      const response = await request(app).get('/API');
      expect(response.status).toBe(404);
    });

    test('should not accept query parameters', async () => {
      const response = await request(app).get('/api?param=value');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'hello world!' });
    });
  });

  describe('HTTP method handling', () => {
    test('should only accept GET method', async () => {
      const response = await request(app).get('/api');
      expect(response.status).toBe(200);
    });

    test('should reject POST method', async () => {
      const response = await request(app).post('/api');
      expect(response.status).not.toBe(200);
    });

    test('should reject PUT method', async () => {
      const response = await request(app).put('/api');
      expect(response.status).not.toBe(200);
    });

    test('should reject DELETE method', async () => {
      const response = await request(app).delete('/api');
      expect(response.status).not.toBe(200);
    });

    test('should reject PATCH method', async () => {
      const response = await request(app).patch('/api');
      expect(response.status).not.toBe(200);
    });
  });

  describe('Response validation', () => {
    test('should return valid JSON', async () => {
      const response = await request(app).get('/api');
      expect(() => JSON.parse(response.text)).not.toThrow();
    });

    test('should not include additional headers', async () => {
      const response = await request(app).get('/api');
      expect(response.headers['x-powered-by']).toBeDefined();
    });

    test('should complete request within reasonable time', async () => {
      const startTime = Date.now();
      await request(app).get('/api');
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});