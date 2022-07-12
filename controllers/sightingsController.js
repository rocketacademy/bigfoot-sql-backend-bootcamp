const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, categoryModel) {
    super(model);
    this.categoryModel = categoryModel;
  }

  /** if a method in this extended class AND the base class has the same name, the one in the extended class will run over the base method */
  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
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
      return res.status(400).json({ error: true, msg: err });
    }
  }

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
}

module.exports = SightingsController;
