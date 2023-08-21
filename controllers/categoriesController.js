const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve categories
  async getCategories(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create category for a sighting
  async createCategory(req, res) {
    const { name } = req.body;
    try {
      const category = await this.model.create({
        name: name,
      });
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
