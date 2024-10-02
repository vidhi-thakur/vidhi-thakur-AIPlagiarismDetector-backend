const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/testing", (req, res) => res.send("Testing Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;

// 🔍  Inspect: https://vercel.com/vidhithakurs-projects/vidhi-thakur-aip-lagiarism-detector-backend/5taabdeEgkJdmM2zCq6WbfbLjTe7 [2s]
// ✅  Production: https://vidhi-thakur-aip-lagiarism-detector-backend-m68wxhd4e.vercel.app [2s]
// 📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
// 💡  To change the domain or build command, go to https://vercel.com/vidhithakurs-projects/vidhi-thakur-aip-lagiarism-detector-backend/settings