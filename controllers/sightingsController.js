const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(
    model,
    commentModel,
    likeModel,
    categoryModel,
    sightingcategoryModel
  ) {
    super(model);
    this.commentModel = commentModel;
    this.likeModel = likeModel;
    this.categoryModel = categoryModel;
    this.sightingcategoryModel = sightingcategoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: [this.categoryModel, this.likeModel, this.commentModel],
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({ include: this.categoryModel });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createSighting(req, res) {
    const categoryId = req.body.category;
    const intensity = req.body.intensity;
    delete req.body.category;
    delete req.body.intensity;
    const data = req.body;
    try {
      const newData = await this.model.create(data);
      const categoryInTable = await this.categoryModel.findOne({
        where: { id: categoryId },
      });
      await newData.addCategory(categoryInTable, {
        through: { intensity: intensity },
      });
      // await this.sightingcategoryModel.update(
      //   { intensity: intensity },
      //   { where: { sightingId: newData.id } }
      // );
      return res.json(newData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editData(req, res) {
    const { sightingId } = req.params;
    const data = req.body;
    try {
      const sighting = await this.model.update(data, {
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
    const { commentId } = req.params;
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
    const { commentId } = req.params;
    try {
      await this.commentModel.destroy({
        where: { id: commentId },
      });
      return res.send("Delete completed");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async addLike(req, res) {
    const { sightingId } = req.params;
    try {
      await this.likeModel.create({ sightingId: sightingId });
      return res.send("Liked");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getLikes(req, res) {
    const { sightingId } = req.params;
    try {
      const likes = await this.likeModel.findAndCountAll({
        where: { sightingId: sightingId },
      });
      return res.json(likes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
