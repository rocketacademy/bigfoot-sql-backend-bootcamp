const cors = require('cors')
const express = require('express')
require('dotenv').config()

const db = require('./db/models/index')
const { Comment, sighting } = db;

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// Retrieve all sightings
app.get("/sightings", async (req, res) => {
  const sightings = await sighting.findAll();
  res.json(sightings);
});

// Create sighting
app.post("/sightings", async (req, res) => {
  const { date, location, notes } = req.body
  const newSighting = await sighting.create({
    date: new Date(date),
    location: location,
    notes: notes,
  });
  res.json(newSighting);
});

// Retrieve specific sighting
app.get("/sightings/:sightingId", async (req, res) => {
  const { sightingId } = req.params
  const sighting = await sighting.findByPk(sightingId);
  res.json(sighting);
});

// Retrieve all comments for specific sighting
app.get("/sightings/:sightingId/comments", async (req, res) => {
  const { sightingId } = req.params
  const comments = await Comment.findAll({
    where: {
      SightingId: sightingId,
    },
  });
  res.json(comments);
});

// Create comment for specific sighting
app.post("/sightings/:sightingId/comments", async (req, res) => {
  const { content } = req.body
  const { sightingId } = req.params
  const newComment = await Comment.create({
    content: content,
    SightingId: sightingId,
  });
  res.json(newComment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
