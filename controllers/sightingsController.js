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

  async createSigthing(req, res) {
    const data = req.body;
    try {
      const newData = await this.model.create(data);
      return res.json(newData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
