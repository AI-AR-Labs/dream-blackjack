const request = require('supertest');
const app = require('../src/index');

describe('Blackjack UI Tests', () => {
  describe('GET /blackjack - Main game interface', () => {
    test('should return blackjack game page', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.status).toBe(200);
    });

    test('should have content-type of text/html', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.headers['content-type']).toMatch(/text\/html/);
    });
  });

  describe('Player UI Elements', () => {
    test('should display player section with chip count placeholder', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toContain('player');
      expect(response.text).toMatch(/chip[s]?\s*count/i);
    });

    test('should display two player card slots', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/player.*card.*1/i);
      expect(response.text).toMatch(/player.*card.*2/i);
    });

    test('should display player bet amount', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/bet\s*amount/i);
    });
  });

  describe('Dealer UI Elements', () => {
    test('should display dealer section', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toContain('dealer');
    });

    test('should display two dealer card slots', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/dealer.*card.*1/i);
      expect(response.text).toMatch(/dealer.*card.*2/i);
    });

    test('should indicate one dealer card is face up and one is face down', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/face\s*up/i);
      expect(response.text).toMatch(/face\s*down/i);
    });
  });

  describe('Game Control Buttons', () => {
    test('should have Hit button', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<button[^>]*>.*hit.*<\/button>/i);
    });

    test('should have Stand button', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<button[^>]*>.*stand.*<\/button>/i);
    });

    test('should have Double button', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<button[^>]*>.*double.*<\/button>/i);
    });

    test('should have Split button', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<button[^>]*>.*split.*<\/button>/i);
    });
  });

  describe('UI Structure', () => {
    test('should have proper HTML structure', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<html[^>]*>/i);
      expect(response.text).toMatch(/<body[^>]*>/i);
      expect(response.text).toMatch(/<\/body>/i);
      expect(response.text).toMatch(/<\/html>/i);
    });

    test('should have a title indicating blackjack game', async () => {
      const response = await request(app).get('/blackjack');
      expect(response.text).toMatch(/<title>.*blackjack.*<\/title>/i);
    });
  });

  describe('Static Assets', () => {
    test('should serve CSS for styling', async () => {
      const response = await request(app).get('/blackjack/styles.css');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/text\/css/);
    });

    test('should serve JavaScript for interactivity', async () => {
      const response = await request(app).get('/blackjack/game.js');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/javascript/);
    });
  });

  describe('API Endpoints for UI Data', () => {
    test('should have endpoint to get game state', async () => {
      const response = await request(app).get('/api/blackjack/state');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    test('game state should include player data', async () => {
      const response = await request(app).get('/api/blackjack/state');
      expect(response.body).toHaveProperty('player');
      expect(response.body.player).toHaveProperty('chipCount');
      expect(response.body.player).toHaveProperty('cards');
      expect(response.body.player).toHaveProperty('betAmount');
    });

    test('game state should include dealer data', async () => {
      const response = await request(app).get('/api/blackjack/state');
      expect(response.body).toHaveProperty('dealer');
      expect(response.body.dealer).toHaveProperty('cards');
    });

    test('game state should include available actions', async () => {
      const response = await request(app).get('/api/blackjack/state');
      expect(response.body).toHaveProperty('availableActions');
      expect(response.body.availableActions).toEqual(
        expect.arrayContaining(['hit', 'stand', 'double', 'split'])
      );
    });
  });
});