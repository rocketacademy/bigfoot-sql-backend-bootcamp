const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sighting, db) {
    super(sighting);
    this.comment = db.comment;
    this.like = db.like;
    this.category = db.category;
    this.sightingcategory = db.sightingcategory;
    this.sequelize = db.sequelize;
  }

  async getOne(req, res) {
    const { sightingId } = req.params;
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
    try {
      const sighting = await this.baseModel.findByPk(sightingId, {
        include: [this.category, this.like, this.comment],
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createSighting(req, res) {
    const { category, intensity, ...data } = req.body;
    const t = await this.sequelize.transaction();
    try {
      const newData = await this.baseModel.create(data, { transaction: t });
      const categoryInTable = await this.category.findByPk(category, {
        transaction: t,
      });
      await newData.setCategories(categoryInTable, {
        through: { intensity: intensity },
        transaction: t,
      });
      await this.sightingcategory.update(
        { intensity: intensity },
        { where: { sightingId: newData.id }, transaction: t }
      );
      await t.commit();
      return res.json(newData);
    } catch (err) {
      await t.rollback();
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateData(req, res) {
    const { sightingId } = req.params;
    const data = req.body;
    if (isNaN(Number(sightingId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of sightingID" });
    }
    try {
      const sighting = await this.baseModel.update(data, {
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
      const comments = await this.comment.findAll({
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
      const newComments = await this.comment.create(comment);
      return res.json(newComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async updateComment(req, res) {
    const { commentId } = req.params;
    if (isNaN(Number(commentId))) {
      return res
        .status(400)
        .json({ error: true, msg: "Wrong Type of commentID" });
    }
    const comment = req.body;
    try {
      const newComments = await this.comment.update(comment, {
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
      await this.comment.destroy({
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
      await this.like.create({ sightingId: sightingId });
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
      const likes = await this.like.findAndCountAll({
        where: { sightingId: sightingId },
      });
      return res.json(likes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
