const cors = require('cors')
const express = require('express')
require('dotenv').config()

const db = require('./db/models/index.js')
const { Sighting } = db;

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await Sighting.findAll();
  res.json(sightings);
});

app.get("/sightings/:sightingId", async (req, res) => {
  const { sightingId } = req.params
  const sighting = await Sighting.findByPk(sightingId);
  res.json(sighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
