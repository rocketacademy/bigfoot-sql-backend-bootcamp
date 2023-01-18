const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Create comments for specific sighting
  async insertCategories(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name: name,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
