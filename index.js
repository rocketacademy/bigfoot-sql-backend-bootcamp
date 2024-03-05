const cors = require("cors");
const express = require("express");
require("dotenv").config();

// importing Routers
const SightingsRouter = require("./routers/sightingsRouter");
const CommentsRouter = require("./routers/commentsRouter");
const CategoriesRouter = require("./routers/categoriesRouter");

// importing Controllers
const SightingsController = require("./controllers/sightingsController");
const CommentsController = require("./controllers/commentsController");
const CategoriesController = require("./controllers/categoriesController");

// importing DB
const db = require("./db/models/index");
const { comment, sighting, category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting);
const commentsController = new CommentsController(comment);
const categoriesController = new CategoriesController(category);

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const commentRouter = new CommentsRouter(commentsController).routes();
const categoryRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

// add ability to parse json
app.use(express.json());

// Enable CORS access to this server
app.use(cors());

// using the routers
app.use("/sightings", sightingRouter);
app.use("/comments", commentRouter);
app.use("/categories", categoryRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
