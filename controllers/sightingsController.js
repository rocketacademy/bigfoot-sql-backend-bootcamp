const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comment) {
    super(model);
    this.commentModel = comment;
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
  // create new sighting
  async create(req, res) {
    try {
      const { date, location, notes } = req.body;

      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      console.log(newSighting);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // retrieve all comments from a sighting
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create comments for a sighting
  async createOneComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      console.log(content);
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      console.log("newComment", newComment);

      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
