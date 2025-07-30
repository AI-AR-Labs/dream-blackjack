const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'Dream Skeleton API' });
});

// Blackjack game route
app.get('/blackjack', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack Game</title>
    <link rel="stylesheet" href="/blackjack/styles.css">
</head>
<body>
    <div class="game-container">
        <h1>Blackjack</h1>
        
        <!-- Dealer Section -->
        <div class="dealer-section">
            <h2>Dealer</h2>
            <div class="cards">
                <div class="card dealer-card-1" data-face="up">
                    <span>Face Up Card</span>
                </div>
                <div class="card dealer-card-2" data-face="down">
                    <span>Face Down Card</span>
                </div>
            </div>
        </div>
        
        <!-- Player Section -->
        <div class="player-section">
            <h2>Player</h2>
            <div class="player-info">
                <div class="chip-count">Chip Count: <span id="chip-count">1000</span></div>
                <div class="bet-amount">Bet Amount: <span id="bet-amount">100</span></div>
            </div>
            <div class="cards">
                <div class="card player-card-1">
                    <span>Player Card 1</span>
                </div>
                <div class="card player-card-2">
                    <span>Player Card 2</span>
                </div>
            </div>
        </div>
        
        <!-- Game Controls -->
        <div class="game-controls">
            <button id="hit-button" class="control-button">Hit</button>
            <button id="stand-button" class="control-button">Stand</button>
            <button id="double-button" class="control-button">Double</button>
            <button id="split-button" class="control-button">Split</button>
        </div>
    </div>
    
    <script src="/blackjack/game.js"></script>
</body>
</html>`);
});

// Static assets for blackjack
app.get('/blackjack/styles.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.send(`
/* Blackjack Game Styles */
body {
    font-family: Arial, sans-serif;
    background-color: #006644;
    color: white;
    margin: 0;
    padding: 20px;
}

.game-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

h1 {
    font-size: 2.5em;
    margin-bottom: 30px;
}

.dealer-section, .player-section {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
}

.cards {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.card {
    width: 100px;
    height: 140px;
    background-color: white;
    color: black;
    border: 2px solid black;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    text-align: center;
    padding: 10px;
}

.card[data-face="down"] {
    background-color: #8B0000;
    color: white;
}

.player-info {
    margin: 15px 0;
    font-size: 18px;
}

.chip-count, .bet-amount {
    margin: 5px 0;
}

.game-controls {
    margin-top: 30px;
}

.control-button {
    font-size: 18px;
    padding: 10px 20px;
    margin: 0 5px;
    background-color: #FFD700;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.control-button:hover {
    background-color: #FFC700;
}

.control-button:active {
    background-color: #FFB700;
}
`);
});

app.get('/blackjack/game.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.send(`
// Blackjack Game JavaScript
console.log('Blackjack game loaded');

// Game state management
const gameState = {
    player: {
        chipCount: 1000,
        cards: [],
        betAmount: 100
    },
    dealer: {
        cards: []
    },
    availableActions: ['hit', 'stand', 'double', 'split']
};

// Button event listeners
document.getElementById('hit-button').addEventListener('click', () => {
    console.log('Hit button clicked');
});

document.getElementById('stand-button').addEventListener('click', () => {
    console.log('Stand button clicked');
});

document.getElementById('double-button').addEventListener('click', () => {
    console.log('Double button clicked');
});

document.getElementById('split-button').addEventListener('click', () => {
    console.log('Split button clicked');
});

// Function to update UI
function updateUI() {
    document.getElementById('chip-count').textContent = gameState.player.chipCount;
    document.getElementById('bet-amount').textContent = gameState.player.betAmount;
}

// Initialize game
updateUI();
`);
});

// API endpoint for game state
app.get('/api/blackjack/state', (req, res) => {
  res.json({
    player: {
      chipCount: 1000,
      cards: [],
      betAmount: 100
    },
    dealer: {
      cards: []
    },
    availableActions: ['hit', 'stand', 'double', 'split']
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