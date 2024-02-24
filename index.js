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

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();

const PORT = process.env.PORT;
const app = express();

// add ability to parse json
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// using the routers
app.use("/sightings", sightingRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
