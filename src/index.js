const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Dream Skeleton API' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Dream Skeleton API' });
});

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

app.get('/api/prime/:number', (req, res) => {
  const input = req.params.number;
  
  if (input === '') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  
  const num = Number(input);
  
  if (isNaN(num) || !Number.isInteger(num)) {
    return res.status(400).json({ error: 'Invalid input: must be an integer' });
  }
  
  const result = isPrime(num);
  res.json({ isPrime: result });
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