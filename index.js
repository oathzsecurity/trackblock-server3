const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let latestPostReceived = null;

app.use(bodyParser.json()); // Required to parse JSON bodies

app.post('/track', (req, res) => {
  console.log('📬 Received POST request at /track');

  if (!req.body) {
    console.error('❌ No body found in request!');
    return res.status(400).send('Missing JSON body.');
  }

  console.log('📦 Full payload:', JSON.stringify(req.body, null, 2));

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
