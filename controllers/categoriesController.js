const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve ALL categories
  async getAll(req, res) {
    try {
      const categories = await this.model.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // create NEW category instance
  async create(req, res) {
    try {
      const { name } = req.body;

      const newCategory = await this.model.create({
        name: name,
      });
      console.log(newCategory);
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
