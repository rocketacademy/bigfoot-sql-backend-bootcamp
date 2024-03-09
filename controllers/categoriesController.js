const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  async createCategory(req, res) {
    try {
      const output = await this.model.create({
        name: req.body.name,
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
