import cors from "cors";
import express from "express";

import db from "./db/models/index.cjs";
const { Sighting } = db;

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.get("/sightings", async (req, res) => {
  const sightings = await Sighting.findAll();
  res.json(sightings);
});

app.get("/sightings/:sightingId", async (req, res) => {
  const sighting = await Sighting.findByPk(req.params.sightingId);
  res.json(sighting);
});

app.post("/sightings", async (req, res) => {
  const newSighting = await Sighting.create({
    date: new Date(req.body.date),
    location: req.body.location,
    notes: req.body.notes,
  });
  res.json(newSighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
