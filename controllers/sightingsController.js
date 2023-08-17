const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  async getSightings(req, res) {
    try {
      const sightings = await this.model.findAll({
        include: [
          {
            model: this.categoryModel, // Make sure you import the Category model
            attributes: ["id", "name"], // Include only specific attributes
            through: { attributes: [] }, // Exclude junction table attributes
          },
        ],
      });
      return res.json(sightings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
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

  //Create new sighting
  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      const newSighting = await this.model.create({
        updated_at: new Date(),
        created_at: new Date(),
        date: date,
        location: location,
        notes: notes,
      });
      // Retrieve selected categories
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      // Associated new sighting with selected categories
      await newSighting.setCategories(selectedCategories);
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //Update sighting
  async updateOne(req, res) {
    const { date, location, notes } = req.body;
    const { sightingId } = req.params;
    try {
      const updateSighting = await this.model.update(
        {
          updated_at: new Date(),
          date: date,
          location: location,
          notes: notes,
        },
        { where: { id: sightingId } }
      );
      return res.json(updateSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Delete sighting
  async deleteOne(req, res) {
    const { sightingId } = req.params;
    try {
      const deleteSighting = await this.model.destroy({
        where: { id: sightingId },
      });
      return res.json(deleteSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve all comments
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: { sightingId: sightingId },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  //Create new comment
  async insertComment(req, res) {
    const { content } = req.body;
    const { sightingId } = req.params;

    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
