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

  // Edit specific sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const { date, city, country, location_description, notes } = req.body;
    try {
      const [numberOfAffectedRows, affectedRows] = await this.model.update(
        { date, city, country, location_description, notes },
        {
          where: { id: sightingId },
          returning: true, // needed for affectedRows to be populated
        }
      );
      if (numberOfAffectedRows > 0) {
        return res.json(affectedRows[0]); // return the updated sighting
      } else {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Get comments for a given sighting
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }
      const comments = await sighting.getComments();
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Create a comment for a given sighting
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const sighting = await this.model.findByPk(sightingId);
      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }
      const newComment = await this.commentModel.create({
        content,
        sighting_id: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = SightingsController;
