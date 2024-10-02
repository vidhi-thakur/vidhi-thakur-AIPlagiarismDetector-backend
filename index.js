const express = require('express');
const app = express();
// const port = 5000; // port for dev
const port = "https://vidhi-thakur-ai-plagiarism-detector-backend.vercel.app" // port for vercel

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});