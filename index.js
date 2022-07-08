const cors = require('cors')
const express = require('express')
require('dotenv').config()

const db = require('./db/models/index')
const { sighting } = db;

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.get("/sightings", async (req, res) => {
  const sightings = await sighting.findAll();
  res.json(sightings);
});

app.get("/sightings/:sightingId", async (req, res) => {
  const { sightingId } = req.params
  const sighting = await sighting.findByPk(sightingId);
  res.json(sighting);
});

app.post("/sightings", async (req, res) => {
  const { date, location, notes } = req.body
  const newSighting = await sighting.create({
    date: new Date(date),
    location: location,
    notes: notes,
  });
  res.json(newSighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
