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
const { Sighting, Comment, Category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(
  Sighting,
  Comment,
  Category
);
const categoriesController = new CategoriesController(Category);

// initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoryRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Enable CORS access to this server
app.use(cors());

// using the routers
app.use("/sightings", sightingRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
