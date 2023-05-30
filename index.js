const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");

// importing DB
const db = require("./db/models/index");
const CategoriesRouter = require("./routers/categoriesRouter");
const CategoriesController = require("./controllers/categoriesController");
const { comment, sighting, category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment);
const categoriesController = new CategoriesController(category);

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoryRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

// express JSON middleware to parse JSON bodies
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// using the routers
app.use("/sightings", sightingRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
