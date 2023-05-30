const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sighting, comment, category) {
    super(sighting);
    this.sighting = sighting;
    this.comment = comment;
    this.category = category;
  }

  // Get all Sightings and associated categories
  async getAllSightingCategories(req, res) {
    try {
      const output = await this.model.findAll({ include: this.category });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sighting.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Submit sighting
  async createSighting(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.sighting.create({
        date: date,
        location: location,
        notes: notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create comment
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.comment.create({
        content: content,
        // although the comment model has sighting_id,
        // it is converted to sightingId via underscored: true
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all comments
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.comment.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
