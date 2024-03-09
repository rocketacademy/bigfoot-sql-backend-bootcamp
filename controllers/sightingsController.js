const { where } = require("sequelize");
const comment = require("../db/models/comment");
const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel, categoryModel) {
    super(sightingModel);
    this.sightingModel = sightingModel;
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: this.categoryModel,
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Create sighting
  async add(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      let sightingAdded = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      await sightingAdded.setCategories(selectedCategories);
      return res.json(sightingAdded);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async getComments(req, res) {
    const { sightingId } = req.params;
    // const sightingIdInt = Number(sightingId);

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

  async addComment(req, res) {
    const { sightingId } = req.params;
    let commentsToAdd = req.body;

    try {
      const commentsAdded = await this.commentModel.create({
        content: commentsToAdd.content,
        sightingId: sightingId,
      });
      return res.json(commentsAdded);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
