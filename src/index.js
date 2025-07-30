const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Dream Skeleton API" });
});

app.get("/blackjack", (req, res) => {
  res.header("Content-Type", "text/html");
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blackjack Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #0d6e0d;
      color: white;
    }
    .game-board {
      max-width: 800px;
      margin: 0 auto;
    }
    .dealer-section, .player-section {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .card {
      display: inline-block;
      width: 80px;
      height: 120px;
      background: white;
      border: 2px solid black;
      border-radius: 5px;
      margin: 5px;
      padding: 10px;
      color: black;
      font-size: 24px;
      text-align: center;
      line-height: 120px;
    }
    .card.face-down {
      background: repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
      );
      color: transparent;
    }
    .controls {
      text-align: center;
      padding: 20px;
    }
    button {
      font-size: 18px;
      padding: 10px 20px;
      margin: 5px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
    }
    button:hover {
      background-color: #0056b3;
    }
    .info {
      margin: 10px 0;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <main>
    <div class="game-board">
      <section>
      <div class="dealer-section">
        <h2>Dealer</h2>
        <div class="cards">
          <div class="card" id="dealer-card-1">A♠</div>
          <div class="card face-down" id="dealer-card-2">?</div>
        </div>
      </div>
      
      <div class="player-section">
        <h2>Player</h2>
        <div class="info">
          <span>chips: <span id="chip-count">1000</span></span> | 
          <span>Bet: <span id="bet-amount">50</span></span>
        </div>
        <div class="cards">
          <div class="card" id="player-card-1">K♥</div>
          <div class="card" id="player-card-2">7♣</div>
        </div>
      </div>
      
      <div class="controls">
        <button id="hit-button" aria-label="Hit - Take another card">Hit</button>
        <button id="stand-button" aria-label="Stand - Keep current hand">Stand</button>
        <button id="double-button" aria-label="Double - Double bet and take one more card">Double</button>
        <button id="split-button" aria-label="Split - Split hand into two hands">Split</button>
      </div>
      </section>
    </div>
  </main>
</body>
</html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
