const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let lastPayload = null;

app.use(bodyParser.json());

app.post('/track', (req, res) => {
  console.log('🚀 Received POST:', req.body);
  lastPayload = req.body;
  res.status(200).json({ status: 'received' });
});

app.get('/test-log', (req, res) => {
  if (lastPayload) {
    res.json(lastPayload);
  } else {
    res.send('No data received yet.');
  }
});

app.get('/', (req, res) => {
  res.send('Trackblock server is live.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Trackblock backend running on port ${PORT}`);
});