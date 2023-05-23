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

  // Post new sighting
  async addOne(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update existing sighting
  async updateOne(req, res) {
    const { date, location, notes } = req.body;
    const { sightingId } = req.params;
    try {
      const update = await this.model.update(
        {
          date: date,
          location: location,
          notes: notes,
        },
        { where: { id: sightingId } }
      );
      console.log("Updates:", update);

      const updatedSighting = await this.model.findByPk(sightingId);

      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all sightings with filtering
  async getAllWithFilter(req, res) {
    try {
      const { date, location, notes } = req.query;
      const whereClause = {};

      if (date) {
        whereClause.date = date;
      }

      if (location) {
        whereClause.location = location;
      }

      if (notes) {
        whereClause.notes = notes;
      }

      const output = await this.model.findAll({ where: whereClause });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
