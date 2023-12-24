const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async createCategory(req, res) {
    const data = req.body;
    const newCat = await this.model.create(data);
    return res.json(newCat);
  }
}

module.exports = CategoriesController;
