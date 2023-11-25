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

  // Add a new sighting
  async createSighting(req, res) {
    const { date, location, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      return res.status(201).json(newSighting);
    } catch (err) {
      return res.status(500).json({ error: true, msg: err });
    }
  }

  // Update a new sighting

  async updateSighting(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;
    try {
      const updatedSighting = await this.model.update(
        {
          date: new Date(date),
          location: location,
          notes: notes,
        },
        {
          where: {
            id: sightingId,
          },
          returning: true, // This will return the updated sighting
        }
      );

      if (updatedSighting[0] === 0) {
        // If no rows were affected
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }

      return res.status(200).json(updatedSighting[1][0]); // Return the updated sighting
    } catch (err) {
      return res.status(500).json({ error: true, msg: err });
    }
  }

  // Add new comments
  async addNewComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve all comments for specific sighting
  async getComments(req, res) {
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
}

module.exports = SightingsController;
