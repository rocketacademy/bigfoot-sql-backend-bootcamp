const cors = require("cors");
const express = require("express");

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

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

app.use("/sightings", sightingRouter);
app.use("/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
