const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comments) {
    super(model);
    this.comments = comments;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const sighting = await this.model.findByPk(id);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOne(req, res) {
    const { month, year, location, season, notes } = req.body;
    // if (!date || !location) {
    //   return res.state(401).json({ success: false, msg: "Missing information" });
    // }

    try {
      const newSighting = await this.model.create({
        month,
        year,
        location,
        season,
        notes,
      });
      return res.json({ success: true, sighting: newSighting });
    } catch (err) {
      return res.state(400).json({ success: false, msg: err });
    }
  }

  async getComments(req, res) {
    const { id } = req.params;
    try {
      const output = await this.comments.findAll({
        where: { sightingId: id },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postComment(req, res) {
    const { id } = req.params;
    const { content, commentor } = req.body;

    try {
      const newComment = await this.comments.create({
        content,
        commentor: commentor === null ? "Anonymous" : commentor,
        sightingId: id,
      });
      return res.json({ success: true, comment: newComment });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  }
}

module.exports = SightingsController;
