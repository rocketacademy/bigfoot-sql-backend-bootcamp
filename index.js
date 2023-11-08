const cors = require('cors');
const express = require('express');
require('dotenv').config();

// importing Routers
const SightingsRouter = require('./routers/sightingsRouter');
const CommentRouter = require('./routers/commentRouter');

// importing Controllers
const SightingsController = require('./controllers/sightingsController');
const CommentController = require('./controllers/commentController');
const CategoriesController = require('./controllers/categoriesController');

// importing DB
const db = require('./db/models/index');
const CategoriesRouter = require('./routers/categoriesRouter');
const { sighting, comments, category } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, category);
const commentController = new CommentController(comments);
const categoriesController = new CategoriesController(category);

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes();
const commentRouter = new CommentRouter(commentController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using the routers
app.use('/sightings', sightingRouter);
app.use('/comments', commentRouter);
app.use('/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
