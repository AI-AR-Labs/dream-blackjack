const request = require('supertest');
const app = require('../src/index');

describe('Blackjack UI Tests', () => {
  describe('Game Interface Display', () => {
    test('GET /game should return the game interface', async () => {
      const response = await request(app).get('/game');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/html/);
    });

    test('Game interface should have proper HTML structure', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html');
      expect(html).toContain('<body');
    });
  });

  describe('Player Display', () => {
    test('Game interface should display player section', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<div[^>]*class="[^"]*player[^"]*"/i);
    });

    test('Player section should show chip count placeholder', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<div[^>]*class="[^"]*chip-count[^"]*"/i);
      expect(html).toMatch(/chips?[:.]?\s*\d+|chip\s*count[:.]?\s*\d+/i);
    });

    test('Player section should display exactly two cards', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      // Look for player card elements
      const playerCardMatches = html.match(/<div[^>]*class="[^"]*player-card[^"]*"/gi) || [];
      expect(playerCardMatches.length).toBe(2);
    });

    test('Player cards should be face up (visible)', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      // Face up cards should not have face-down or hidden class
      expect(html).not.toMatch(/<div[^>]*class="[^"]*player-card[^"]*face-down[^"]*"/i);
      expect(html).not.toMatch(/<div[^>]*class="[^"]*player-card[^"]*hidden[^"]*"/i);
    });

    test('Player section should display bet amount', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<div[^>]*class="[^"]*bet-amount[^"]*"/i);
      expect(html).toMatch(/bet[:.]?\s*\$?\d+|current\s*bet[:.]?\s*\$?\d+/i);
    });
  });

  describe('Dealer Display', () => {
    test('Game interface should display dealer section', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<div[^>]*class="[^"]*dealer[^"]*"/i);
    });

    test('Dealer section should display exactly two cards', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      // Look for dealer card elements
      const dealerCardMatches = html.match(/<div[^>]*class="[^"]*dealer-card[^"]*"/gi) || [];
      expect(dealerCardMatches.length).toBe(2);
    });

    test('Dealer should have one face-up card and one face-down card', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      // Check for at least one face-down card in dealer section
      expect(html).toMatch(/<div[^>]*class="[^"]*dealer-card[^"]*face-down[^"]*"/i);
      // Check that not all dealer cards are face-down
      const dealerCardMatches = html.match(/<div[^>]*class="[^"]*dealer-card[^"]*"/gi) || [];
      const faceDownMatches = html.match(/<div[^>]*class="[^"]*dealer-card[^"]*face-down[^"]*"/gi) || [];
      expect(faceDownMatches.length).toBe(1);
      expect(dealerCardMatches.length - faceDownMatches.length).toBe(1); // One face-up card
    });
  });

  describe('Game Action Buttons', () => {
    test('Game interface should have Hit button', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<button[^>]*>.*hit.*<\/button>/i);
    });

    test('Game interface should have Stand button', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<button[^>]*>.*stand.*<\/button>/i);
    });

    test('Game interface should have Double button', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<button[^>]*>.*double.*<\/button>/i);
    });

    test('Game interface should have Split button', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<button[^>]*>.*split.*<\/button>/i);
    });

    test('All game action buttons should be in a controls section', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<div[^>]*class="[^"]*controls[^"]*"[^>]*>[\s\S]*<button/i);
    });

    test('Game action buttons should have appropriate IDs or classes', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<button[^>]*(id|class)="[^"]*hit[^"]*"/i);
      expect(html).toMatch(/<button[^>]*(id|class)="[^"]*stand[^"]*"/i);
      expect(html).toMatch(/<button[^>]*(id|class)="[^"]*double[^"]*"/i);
      expect(html).toMatch(/<button[^>]*(id|class)="[^"]*split[^"]*"/i);
    });
  });

  describe('Complete UI Layout', () => {
    test('Game should have all required sections in proper structure', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      
      // Check for main game container
      expect(html).toMatch(/<div[^>]*class="[^"]*game[^"]*"/i);
      
      // Check that dealer section appears before player section (typical layout)
      const dealerIndex = html.search(/<div[^>]*class="[^"]*dealer[^"]*"/i);
      const playerIndex = html.search(/<div[^>]*class="[^"]*player[^"]*"/i);
      expect(dealerIndex).toBeGreaterThan(-1);
      expect(playerIndex).toBeGreaterThan(-1);
      expect(dealerIndex).toBeLessThan(playerIndex);
    });

    test('Game should include CSS for proper styling', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<style>[\s\S]+<\/style>|<link[^>]*rel="stylesheet"/i);
    });

    test('Game should have viewport meta tag for responsive design', async () => {
      const response = await request(app).get('/game');
      const html = response.text;
      expect(html).toMatch(/<meta[^>]*name="viewport"/i);
    });
  });

  describe('API Response Format', () => {
    test('GET /api/game/state should return game state as JSON', async () => {
      const response = await request(app).get('/api/game/state');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body).toHaveProperty('player');
      expect(response.body).toHaveProperty('dealer');
      expect(response.body.player).toHaveProperty('cards');
      expect(response.body.player).toHaveProperty('chips');
      expect(response.body.player).toHaveProperty('bet');
      expect(response.body.dealer).toHaveProperty('cards');
    });

    test('Game state should have correct initial values', async () => {
      const response = await request(app).get('/api/game/state');
      expect(response.body.player.cards).toHaveLength(2);
      expect(response.body.dealer.cards).toHaveLength(2);
      expect(response.body.player.chips).toBeGreaterThan(0);
      expect(response.body.player.bet).toBeGreaterThanOrEqual(0);
    });
  });
});