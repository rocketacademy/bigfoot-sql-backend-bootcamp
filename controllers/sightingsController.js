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

  // add sightings
  add = async (req, res) => {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });
      // Respond to the user
      res.send(newSighting);
    } catch (error) {
      console.error("Error adding sighting:", error);
    }
  };
}

module.exports = SightingsController;
