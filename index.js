const cors = require('cors')
const express = require('express')
require('dotenv').config()



// importing Routers
const SightingsRouter = require('./routers/sightingsRouter')

// importing Controllers
const SightingsController = require('./controllers/sightingsController')

// importing DB
const db = require('./db/models/index')
const { comment, sighting } = db;

// initializing Controllers -> note the lowercase for the first word
const sightingsController = new SightingsController(sighting, comment)

// inittializing Routers
const sightingRouter = new SightingsRouter(sightingsController).routes()


const PORT = process.env.PORT;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

//user Router
app.use('/sightings', sightingRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
