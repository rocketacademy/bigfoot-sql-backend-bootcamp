const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  db = require("../db/models/index");

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: [{ model: this.db.category }],
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createSighting(req, res) {
    const sighting = req.body.input;
    const categories = req.body.categories;
    try {
      const newSighting = await this.model.create(sighting);
      const newSightingCategories = newSighting.setCategories(categories);
      return res.json(newSightingCategories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
