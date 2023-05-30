const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve all categories
  async getAllCategories(req, res) {
    const { name } = req.body;
    try {
      const category = await this.model.findAll(name);
      return res.json(category);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create category
  async createCategories(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
