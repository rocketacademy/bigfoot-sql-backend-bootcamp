const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(category) {
    super(category);
    this.category = category;
  }

  /*
  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sighting.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }*/

  // Submit category
  async createCategory(req, res) {
    /*
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
    */
    return res.status(200).json({ msg: "this route works" });
  }
  /*
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
    */
}

module.exports = CategoriesController;
