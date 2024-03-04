const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
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

  //Post a new sighting
  async postNewSighting(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Create a comment
  async postNewComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      // return res.status(400).json({ error: true, msg: err });
      console.error("Error occurred:", err); // Log the error message
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //Get all comments on a sighting
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: { sighting_id: sightingId },
      });
      return res.json(comments);
    } catch (err) {
      // return res.status(400).json({ error: true, msg: err });
      console.error("Error occurred:", err); // Log the error message
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = SightingsController;
