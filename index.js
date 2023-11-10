const cors = require('cors')
const express = require('express')
require('dotenv').config()


// importing Routers
const SightingsRouter = require('./routers/sightingsRouter')
const CategoriesRouter = require('./routers/categoriesRouter')

// importing Controllers
const SightingsController = require('./controllers/sightingsController')
const CategoriesController = require('./controllers/categoriesController')

// importing DB
const db = require('./db/models/index') //open up index.js in db/models
const { comment, sighting, like, category} = db; //retrieve the comment and sighting models from db

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment, like, category)
const categoriesController = new CategoriesController(category, sighting)

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes()
const categoriesRouter = new CategoriesRouter(categoriesController).routes()

const PORT = process.env.PORT;
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS access to this server
app.use(cors(corsOptions));
app.use(express.json()); //parses incoming JSON requests and puts the parsed data in req.body
app.use(express.urlencoded({extended:true})); //method inbuilt in express to recognize the incoming Request Object as strings or arrays

// using the routers
app.use('/sightings', sightingRouter) // redirects all reqs to URLs starting with sightings to the sightingRouter
app.use('/categories', categoriesRouter)

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
