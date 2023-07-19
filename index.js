const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");
const CategoriesController = require("./controllers/categoriesController");

// importing DB
const db = require("./db/models/index");
const { comment, sighting, category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(
  sighting,
  comment,
  category
);
const categoriesController = new CategoriesController(category);

// initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.FRONT_END,
  optionsSuccessStatus: 200,
};

// Enable CORS access to this server
app.use(cors(corsOptions));

// Enable express to parse JSON bodies of income POST requests
app.use(express.json());

// using the routers
app.use("/sightings", sightingRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
