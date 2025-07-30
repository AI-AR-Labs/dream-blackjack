const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Dream Skeleton API' });
});

app.get('/game', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blackjack</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #2c3e50;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .game {
      background-color: #27ae60;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      min-width: 600px;
    }
    .dealer, .player {
      margin: 20px 0;
      padding: 15px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 5px;
    }
    .dealer h2, .player h2 {
      margin-top: 0;
    }
    .cards {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }
    .dealer-card, .player-card {
      width: 60px;
      height: 90px;
      background-color: white;
      border: 2px solid #000;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: black;
    }
    .face-down {
      background-color: #34495e;
      background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px);
    }
    .chip-count, .bet-amount {
      margin: 10px 0;
      font-size: 18px;
    }
    .controls {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #3498db;
      color: white;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <div class="game">
    <div class="dealer">
      <h2>Dealer</h2>
      <div class="cards">
        <div class="dealer-card">A♠</div>
        <div class="dealer-card face-down"></div>
      </div>
    </div>
    
    <div class="player">
      <h2>Player</h2>
      <div class="chip-count">Chips: 1000</div>
      <div class="cards">
        <div class="player-card">K♥</div>
        <div class="player-card">Q♦</div>
      </div>
      <div class="bet-amount">Bet: $100</div>
    </div>
    
    <div class="controls">
      <button class="hit-button">Hit</button>
      <button class="stand-button">Stand</button>
      <button class="double-button">Double</button>
      <button class="split-button">Split</button>
    </div>
  </div>
</body>
</html>`);
});

app.get('/api/game/state', (req, res) => {
  res.json({
    player: {
      cards: [
        { rank: 'K', suit: 'hearts' },
        { rank: 'Q', suit: 'diamonds' }
      ],
      chips: 1000,
      bet: 100
    },
    dealer: {
      cards: [
        { rank: 'A', suit: 'spades' },
        { rank: 'hidden', suit: 'hidden' }
      ]
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;