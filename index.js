import cors from "cors";
import express from "express";
require('dotnev').config()

import db from "./db/models/index.js";
const { Category, Comment, Sighting } = db;

const PORT = process.env.PORT || 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// Retrieve all sightings
app.get("/sightings", async (req, res) => {
  const sightings = await Sighting.findAll({
    include: Category,
  });
  res.json(sightings);
});

// Create sighting
app.post("/sightings", async (req, res) => {
  // Create new sighting
  const newSighting = await Sighting.create({
    date: new Date(req.body.date),
    location: req.body.location,
    notes: req.body.notes,
  });
  // Retrieve selected categories
  const selectedCategories = await Category.findAll({
    where: {
      id: req.body.selectedCategoryIds,
    },
  });
  // Associated new sighting with selected categories
  await newSighting.setCategories(selectedCategories);
  // Respond with new sighting
  res.json(newSighting);
});

// Retrieve specific sighting
app.get("/sightings/:sightingId", async (req, res) => {
  const sighting = await Sighting.findByPk(req.params.sightingId, {
    include: Category,
  });
  res.json(sighting);
});

// Retrieve all comments for specific sighting
app.get("/sightings/:sightingId/comments", async (req, res) => {
  const comments = await Comment.findAll({
    where: {
      SightingId: req.params.sightingId,
    },
  });
  res.json(comments);
});

// Create comment for specific sighting
app.post("/sightings/:sightingId/comments", async (req, res) => {
  const newComment = await Comment.create({
    content: req.body.content,
    SightingId: req.params.sightingId,
  });
  res.json(newComment);
});

// Retrieve all categories
app.get("/categories", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

// Create category
app.post("/categories", async (req, res) => {
  const newCategory = await Category.create({
    name: req.body.name,
  });
  res.json(newCategory);
});

// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
