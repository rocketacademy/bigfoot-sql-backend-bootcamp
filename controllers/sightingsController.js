const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel) {
    super(sightingModel);
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

  async createSigthing(req, res) {
    const data = req.body;
    try {
      const newData = await this.sightingModel.create(data);
      return res.json(newData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editData(req, res) {
    const { sightingId } = req.params;
    const data = req.body;
    try {
      const sighting = await this.sightingModel.update(data, {
        where: { id: sightingId },
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getComments(req, res) {
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

  async addComment(req, res) {
    const { sightingId } = req.params;
    const comment = { ...req.body, sightingId: sightingId };

    try {
      const newComments = await this.commentModel.create(comment);
      return res.json(newComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editComment(req, res) {
    const comment = req.body;
    const commentId = req.body.id;
    try {
      const newComments = await this.commentModel.update(comment, {
        where: { id: commentId },
      });
      return res.json(newComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteComment(req, res) {
    const commentId = req.body.id;
    try {
      await this.commentModel.destroy({
        where: { id: commentId },
      });
      return res.send("Delete completed");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
