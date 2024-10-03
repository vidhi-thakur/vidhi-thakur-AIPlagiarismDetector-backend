const express = require("express");
const { detectPlagiarism } = require("../plagiarism_controller");
const multer = require('multer');

const app = express();

const upload = multer({ dest: 'uploadFiles/' });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods',
   'GET, POST, PUT, DELETE');
    next();
  });

app.get("/", (req, res) => res.send("Express on Vercel"));
app.post("/detect-plagiarism", upload.fields([{name: 'fileToCheck'}, {name: 'fileToCompare'}]), detectPlagiarism);

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;

// 💡  To change the domain or build command, go to https://vercel.com/vidhithakurs-projects/vidhi-thakur-aip-lagiarism-detector-backend/settings
// API link: https://vidhi-thakur-aip-lagiarism-detector-backend.vercel.app/