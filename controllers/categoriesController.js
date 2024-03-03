const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getCategory(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async createCategory(req, res) {
    const categoryName = req.body.name;
    try {
      const newCategory = await this.model.create({ category: categoryName });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
