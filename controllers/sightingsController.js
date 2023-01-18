const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Insert sighting
  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      await newSighting.setCategories(selectedCategories);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      const updatedSighting = await sighting.update({
        date: date,
        location: location,
        notes: notes,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      await updatedSighting.setCategories(selectedCategories);
      return res.json(updatedSighting);
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

  // Retrieve comments for specific sighting
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
        // include: "sightings",
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create comments for specific sighting
  async insertComments(req, res) {
    const { content } = req.body;
    const { sightingId } = req.params;
    // console.log(typeof sightingId)
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
