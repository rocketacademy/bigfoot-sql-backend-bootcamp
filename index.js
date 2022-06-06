import cors from "cors";
import express from "express";

import db from "./db/models/index.cjs";
const { Sighting } = db;

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await Sighting.findAll();
  res.json(sightings);
});

app.get("/sightings/:sightingId", async (req, res) => {
  const sighting = await Sighting.findByPk(req.params.sightingId);
  res.json(sighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
