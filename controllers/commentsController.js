const BaseController = require("./baseController");

class CommentsController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getBySightingId(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.model.findAll({
        where: { sighting_id: sightingId },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createComment(req, res) {
    const comment = req.body;
    try {
      const newComment = await this.model.create(comment);
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CommentsController;
