const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // GET specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //POST new sighting
  async postOne(req, res) {
    const { date, location, notes } = req.body
    if (!date || !location) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });
      return res.json({ success: true, newSighting })
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  //PUT or edit existing sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body
    if (!date || !location) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }
    try {
      const sighting = await this.model.findByPk(sightingId);

      const updatedSighting = await this.model.create({
        date,
        location,
        notes
      });
      return res.json({ success: true, updatedSighting })
    }
    catch (err) {
      return res.status(400).json({ error: true, msg: err });

    }
  }
}
module.exports = SightingsController;
