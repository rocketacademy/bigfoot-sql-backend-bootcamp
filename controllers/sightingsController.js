/* eslint-disable no-unused-vars */
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

  addNewSighting = async (req, res) => {
    let date = req.body.date;
    let location = req.body.location;
    let notes = req.body.notes;
    let created_at = new Date();
    let updated_at = new Date();

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
        created_at,
        updated_at,
      });

      res.json({
        success: true,
        id: newSighting.id,
        date,
        location,
        notes,
        created_at,
        updated_at,
      });
    } catch (err) {
      res.status(400).json({ success: false, msg: err });
    }
  };
}

module.exports = SightingsController;
