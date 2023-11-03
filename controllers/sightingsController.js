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

  async postOne(req, res) {
    const { date, location, notes } = req.body;
    if (!date || !location || !notes) {
      res.status(400).json({ success: false, msg: 'input error' })
    }
    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });
      return res.json({ success: true, sighting: newSighting })
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async putOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;
    if (!date || !location || !notes) {
      res.status(400).json({ success: false, msg: 'input error' })
    }
    try {
      const sighting = await this.model.findByPk(sightingId);
      await sighting.update({
        date: date,
        location: location,
        notes: notes,
      })
      return res.json({ success: true, sighting: sighting });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

}

module.exports = SightingsController;
