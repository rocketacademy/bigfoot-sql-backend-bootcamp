const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");
const CategoriesController = require("./controllers/catagoriesController");
// importing DB
const db = require("./db/models/index");
const { comment, sighting, like, category } = db;

// // initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(
  sighting,
  comment,
  like,
  category
);
const categoriesController = new CategoriesController(category);

// // initializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
// // Enable CORS access to this server
app.use(cors());

// // using the routers
app.use("/sightings", sightingRouter);
app.use("/categories", categoriesRouter);
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
