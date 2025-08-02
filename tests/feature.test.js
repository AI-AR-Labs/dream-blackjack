const request = require('supertest');
const app = require('../src/index');

describe('Prime Number Checker API Tests', () => {
  describe('GET /api/prime/:number', () => {
    // Test prime numbers
    test('should return true for prime number 2', async () => {
      const response = await request(app).get('/api/prime/2');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: true });
    });

    test('should return true for prime number 3', async () => {
      const response = await request(app).get('/api/prime/3');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: true });
    });

    test('should return true for prime number 17', async () => {
      const response = await request(app).get('/api/prime/17');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: true });
    });

    test('should return true for large prime number 97', async () => {
      const response = await request(app).get('/api/prime/97');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: true });
    });

    // Test non-prime numbers
    test('should return false for non-prime number 1', async () => {
      const response = await request(app).get('/api/prime/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    test('should return false for non-prime number 4', async () => {
      const response = await request(app).get('/api/prime/4');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    test('should return false for non-prime number 9', async () => {
      const response = await request(app).get('/api/prime/9');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    test('should return false for non-prime number 100', async () => {
      const response = await request(app).get('/api/prime/100');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    // Test edge cases
    test('should return false for 0', async () => {
      const response = await request(app).get('/api/prime/0');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    test('should handle negative numbers by returning false', async () => {
      const response = await request(app).get('/api/prime/-5');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });

    // Test invalid inputs
    test('should return 400 for non-numeric input', async () => {
      const response = await request(app).get('/api/prime/abc');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/invalid/i);
    });

    test('should return 400 for decimal numbers', async () => {
      const response = await request(app).get('/api/prime/3.14');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/invalid|integer/i);
    });

    test('should return 400 for empty parameter', async () => {
      const response = await request(app).get('/api/prime/');
      expect(response.status).toBe(404); // Express typically returns 404 for missing route params
    });

    // Test response format
    test('should return JSON content type', async () => {
      const response = await request(app).get('/api/prime/7');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    // Test large numbers
    test('should handle large prime number 7919', async () => {
      const response = await request(app).get('/api/prime/7919');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: true });
    });

    test('should handle large non-prime number 10000', async () => {
      const response = await request(app).get('/api/prime/10000');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ isPrime: false });
    });
  });
});