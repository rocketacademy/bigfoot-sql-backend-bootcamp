const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(category) {
    super(category);
  }

  async createCategory(req, res) {
    try {
      const newCat = await this.category.create(req.body);
      return res.json(newCat);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  }
}

module.exports = CategoriesController;
