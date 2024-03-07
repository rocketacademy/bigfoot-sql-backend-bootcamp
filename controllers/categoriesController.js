const BaseController = require("./baseController");
class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.model.findAll();
      // const categoryNames = categories.map((category) => category.name);
      return res.json(categories);
    } catch (err) {
      console.error("Error occurred:", err); // Log the error message
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async postNewCategory(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = CategoriesController;
