const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async createCategory(req, res) {
    const { name } = req.body;
    try {
      const newCat = await this.model.create({ name: name });
      return res.json(newCat);
    } catch (error) {
      return res.status(400).json({ error: true, msg: error });
    }
  }
}

module.exports = CategoriesController;
