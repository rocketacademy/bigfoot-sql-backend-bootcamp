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
    const { date, location, notes, createdDate } = req.body;
    
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
        createdAt: createdDate
      });
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
