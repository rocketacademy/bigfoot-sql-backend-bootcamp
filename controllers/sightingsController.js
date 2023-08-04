const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
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

  // Add a new sighting
  async postOne(req, res) {
    try {
      // Get the input data from the request body
      const { date, location, notes } = req.body;

      // Create a new sighting record using Sequelize's create method
      const newSighting = await this.model.create({
        date: new Date(date),
        location,
        notes,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
