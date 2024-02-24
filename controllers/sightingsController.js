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

  //Post a new sighting
  async addNewSighting(req, res) {
    try {
      const newSighting = await this.model.create({
        date: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
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
