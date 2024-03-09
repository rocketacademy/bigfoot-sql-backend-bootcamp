const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({ include: this.categoryModel });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
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

  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    console.log(req.body);
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      const selectedCategories = await this.categoryModel.findAll({
        where: { id: selectedCategoryIds },
      });
      await newSighting.setCategories(selectedCategories);
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOneComment(req, res) {
    const { sightingId } = req.params;
    console.log(req.params);
    console.log(sightingId);
    const { content } = req.body;
    console.log(content);
    try {
      const newContent = await this.commentModel.create({
        content: content,
        sighting_id: sightingId,
      });
      return res.json(newContent);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: { sighting_id: sightingId },
      });
      return res.json(allComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
