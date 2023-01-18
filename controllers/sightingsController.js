const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel) {
    super(sightingModel);
    this.sightingModel = sightingModel;
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sightingModel.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add new sighting
  async addOne(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.sightingModel.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Retrieve all comments
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Add comment
  async addComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;

    try {
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
