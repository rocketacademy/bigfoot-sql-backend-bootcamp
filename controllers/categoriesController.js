const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  // Retrieve all categories
  async getCategories(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add category
  async addCategory(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name,
      });
      return res.status(201).json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
