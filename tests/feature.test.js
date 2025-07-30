const request = require("supertest");
const app = require("../src/index");

describe("Blackjack UI Tests", () => {
  describe("GET /blackjack - Game UI Page", () => {
    test("should return the blackjack game page", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
    });

    test("should include player section with chip count placeholder", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("player");
      expect(response.text).toContain("chips");
    });

    test("should display two player cards face up", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("player-card-1");
      expect(response.text).toContain("player-card-2");
      expect(response.text).not.toContain("player-card-1-hidden");
      expect(response.text).not.toContain("player-card-2-hidden");
    });

    test("should display player bet amount", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("bet-amount");
    });

    test("should include dealer section", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("dealer");
    });

    test("should display two dealer cards - one face up, one face down", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("dealer-card-1");
      expect(response.text).toContain("dealer-card-2");
      expect(response.text).toContain("face-down");
    });

    test("should include all game action buttons", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("hit-button");
      expect(response.text).toContain("stand-button");
      expect(response.text).toContain("double-button");
      expect(response.text).toContain("split-button");
    });
  });

  describe("Game UI Structure Tests", () => {
    test("should have proper HTML structure for game board", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(/<div[^>]*class="[^"]*game-board[^"]*"/);
    });

    test("should have separate sections for player and dealer", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*player-section[^"]*"/,
      );
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*dealer-section[^"]*"/,
      );
    });

    test("should have controls section for game buttons", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(/<div[^>]*class="[^"]*controls[^"]*"/);
    });
  });

  describe("Button Functionality Tests", () => {
    test("Hit button should be present and have proper attributes", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<button[^>]*id="hit-button"[^>]*>Hit<\/button>/,
      );
    });

    test("Stand button should be present and have proper attributes", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<button[^>]*id="stand-button"[^>]*>Stand<\/button>/,
      );
    });

    test("Double button should be present and have proper attributes", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<button[^>]*id="double-button"[^>]*>Double<\/button>/,
      );
    });

    test("Split button should be present and have proper attributes", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<button[^>]*id="split-button"[^>]*>Split<\/button>/,
      );
    });
  });

  describe("Card Display Tests", () => {
    test("Player cards should be visible with card values", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*card[^"]*"[^>]*id="player-card-1"/,
      );
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*card[^"]*"[^>]*id="player-card-2"/,
      );
    });

    test("Dealer visible card should show value", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*card[^"]*"[^>]*id="dealer-card-1"/,
      );
    });

    test("Dealer hidden card should be face down", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<div[^>]*class="[^"]*card[^"]*face-down[^"]*"[^>]*id="dealer-card-2"/,
      );
    });
  });

  describe("Chip Count and Bet Display Tests", () => {
    test("Should display chip count with placeholder value", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<[^>]*id="chip-count"[^>]*>[0-9]+<\/[^>]*>/,
      );
    });

    test("Should display current bet amount", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toMatch(
        /<[^>]*id="bet-amount"[^>]*>[0-9]+<\/[^>]*>/,
      );
    });
  });

  describe("Accessibility Tests", () => {
    test("All buttons should have proper ARIA labels", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("aria-label");
    });

    test("Game sections should have proper semantic HTML", async () => {
      const response = await request(app).get("/blackjack");
      expect(response.text).toContain("<main");
      expect(response.text).toContain("<section");
    });
  });
});
