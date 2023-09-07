const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params; //as part of the requested params
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  // Create sighting
  async insertOne(req, res) {
    console.log(`POST: ${JSON.stringify(req.body)}`)
    const { date, location, notes } = req.body;
    
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit  sighting
  async editOne(req, res) {
    // To get data from the user
    const id = req.params.sightingId; //get the product id
    console.log(`ID TO BE EDITED: ${id}`)
    console.log(`POST: ${JSON.stringify(req.body)}`)
    const {date, location, notes, city, country } = req.body; //get from form
    
    try {
      // Edit sighting
      const editSighting = await this.model.update({
        date: new Date(date),
        location: location,
        notes: notes,
        city: city,
        country: country,
      }, {
        where:{
          id: id //Find the id of interest from user req
        }
      });
      // Respond with new sighting
      return res.json(editSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  
}

module.exports = SightingsController;
