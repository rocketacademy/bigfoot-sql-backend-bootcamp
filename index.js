import cors from "cors";
import express from "express";

import db from "./db/models/index.cjs";
const { Comment, Sighting } = db;

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// Retrieve all sightings
app.get("/sightings", async (req, res) => {
  const sightings = await Sighting.findAll();
  res.json(sightings);
});

// Create sighting
app.post("/sightings", async (req, res) => {
  const newSighting = await Sighting.create({
    date: new Date(req.body.date),
    location: req.body.location,
    notes: req.body.notes,
  });
  res.json(newSighting);
});

// Retrieve specific sighting
app.get("/sightings/:sightingId", async (req, res) => {
  const sighting = await Sighting.findByPk(req.params.sightingId);
  res.json(sighting);
});

// Retrieve all comments for specific sighting
app.get("/:sightingId/comments", async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      SightingId: req.params.sightingId,
    },
  });
  res.json(comments);
});

// Create comment for specific sighting
app.post("/:sightingId/comment", async (req, res) => {
  const newComment = await Comment.create({
    content: req.body.content,
    SightingId: req.params.sightingId,
  });
  res.json(newComment);
});

// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
