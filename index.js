const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const CategoriesRouter = require("./routers/categoriesRouter");
const SightingsRouter = require("./routers/sightingsRouter");

// importing Controllers
const CategoriesController = require("./controllers/categoriesController");
const SightingsController = require("./controllers/sightingsController");

// importing DB
const db = require("./db/models/index");
const { category, comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const categoriesController = new CategoriesController(category);
const sightingsController = new SightingsController(
  sighting,
  category,
  comment
);

// inittializing Routers
const categoriesRouter = new CategoriesRouter(categoriesController).routes();
const sightingRouter = new SightingsRouter(sightingsController).routes();

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// USING the routers
app.use("/categories", categoriesRouter);
app.use("/sightings", sightingRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
