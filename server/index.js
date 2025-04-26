// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Load existing data
let accountsData = [];
if (fs.existsSync(DATA_FILE)) {
  accountsData = JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save data
app.post('/api/save', (req, res) => {
  accountsData = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(accountsData));
  res.json({ success: true });
});

// Load data
app.get('/api/load', (req, res) => {
  res.json(accountsData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
