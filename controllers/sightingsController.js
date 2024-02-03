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
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
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
    const { category, intensity, ...data } = req.body;
    try {
      const newData = await this.model.create(data);
      const categoryInTable = await this.categoryModel.findByPk(category);
      await newData.setCategories(categoryInTable, {
        through: { intensity: intensity },
      });
      await this.sightingcategoryModel.update(
        { intensity: intensity },
        { where: { sightingId: newData.id } }
      );
      return res.json(newData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editData(req, res) {
    const { sightingId } = req.params;
    const data = req.body;
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
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
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
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
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
    const comment = { ...req.body, sightingId: sightingId };
    try {
      const newComments = await this.commentModel.create(comment);
      return res.json(newComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editComment(req, res) {
    const { commentId } = req.params;
    if (isNaN(Number(commentId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of commentID" });
    }
    const comment = req.body;

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
    if (isNaN(Number(commentId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of commentID" });
    }
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
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
    try {
      await this.likeModel.create({ sightingId: sightingId });
      return res.send("Liked");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getLikes(req, res) {
    const { sightingId } = req.params;
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
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
