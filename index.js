const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");

// importing DB
const db = require("./db/models/index");
const { comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);

// initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// JSON parsing middleware
app.use(express.json());

// URL encoded data parsing middleware
app.use(express.urlencoded({ extended: true }));

// using the routers
app.use("/sightings", sightingRouter);

// Route for creating a new sighting
app.post("/sightings", async (req, res) => {
  try {
    const { date, location, notes } = req.body;

    // Create the new sighting in the database
    const newSighting = await sighting.create({
      date,
      location,
      notes,
    });

    // Return the new sighting as JSON response
    res.json(newSighting);
  } catch (error) {
    console.error("Error creating sighting:", error);
    res.status(500).json({ error: "Failed to create sighting" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
