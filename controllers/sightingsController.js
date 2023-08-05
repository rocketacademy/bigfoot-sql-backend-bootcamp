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

  // Create sighting
  async createSighting(req, res) {
    const { date, location, notes, city, country } = req.body;
    try {
      const sighting = await this.model.create({
        date: date,
        location_discription: location,
        notes: notes,
        city: city,
        country: country,
      });
      return res.json(sighting.id);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit sighting
  async editSighting(req, res) {
    const { id, date, location, notes, city, country } = req.body;
    try {
      await this.model.update(
        {
          date: date,
          location_discription: location,
          notes: notes,
          city: city,
          country: country,
        },
        { where: { id: id } }
      );
      return res.send(id);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
