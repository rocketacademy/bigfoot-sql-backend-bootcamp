const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  //Create sighting
  async insertOne(req, res) {
    console.log(req.body);
    const { date, location, notes } = req.body;

    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      // Respond with new sighting
      console.log(newSighting);
      return res.json(newSighting);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
