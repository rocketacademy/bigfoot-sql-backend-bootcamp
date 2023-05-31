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
const { comments, sightings, categories } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(
  sightings,
  comments,
  categories
);
const categoriesController = new CategoriesController(categories);

// inittializing Routers
const sightingsRouter = new SightingsRouter(sightingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// using the routers
app.use("/sightings", sightingsRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
