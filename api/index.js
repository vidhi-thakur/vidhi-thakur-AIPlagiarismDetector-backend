const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods',
   'GET, POST, PUT, DELETE');
    next();
  });

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/testing", (req, res) => res.send("Testing Express on Vercel"));

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;

// 💡  To change the domain or build command, go to https://vercel.com/vidhithakurs-projects/vidhi-thakur-aip-lagiarism-detector-backend/settings
// API link: https://vidhi-thakur-aip-lagiarism-detector-backend.vercel.app/