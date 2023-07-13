const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  // Retrieve specific sighting
  getOne = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Create a new sighting
  add = async (req, res) => {
    const { date, location, notes } = req.body;
    console.log(req.body);
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
  };

  // Query for all comments from a sighting
  getAllComments = async (req, res) => {
    const { sighting_id } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: {
          sighting_id: sighting_id,
        },
      });
      return res.json(allComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Create a new comment
  addComment = async (req, res) => {
    console.log("addComment method called");
    const { sightingId } = req.params;
    console.log("sighting_id:", sightingId);
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sightingId,
      });
      console.log("newComment:", newComment);
      return res.json(newComment);
    } catch (err) {
      console.log("Error:", err);
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
