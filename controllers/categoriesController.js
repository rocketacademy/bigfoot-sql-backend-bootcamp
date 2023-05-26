const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, { sightings }) {
    super(model);
    this.sightings = sightings;
  }

  async insertOne(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({ name });
      return res.json({ success: true, category: newCategory });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  addCategory = async (req, res) => {
    const { sightingId, categoryIds } = req.body;
    const sighting = await this.sightings.findOne({
      where: { id: sightingId },
    });
    const categories = [];
    await categoryIds.forEach(async (categoryId) => {
      const category = await this.model.findOne({
        where: { id: categoryId },
      });
      categories.push(category);
    });
    await sighting.addCategory(categories);
    res.json({ sighting });
  };
}

module.exports = CategoriesController;
