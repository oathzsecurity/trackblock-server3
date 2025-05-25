const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let latestPostReceived = null;

app.use(bodyParser.json());

app.post('/track', (req, res) => {
  console.log('📦 Received POST:', req.body);
  latestPostReceived = req.body;
  res.status(200).json({ status: 'received' });
});

app.get('/test-log', (req, res) => {
  if (latestPostReceived) {
    res.json(latestPostReceived);
  } else {
    res.send('No data received yet.');
  }
});

app.get('/', (req, res) => {
  res.send('Trackblock server is live.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Trackblock backend running on port ${PORT}`);
});
