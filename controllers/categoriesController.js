const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(categoryModel, sightingModel) {
    super(categoryModel);
    this.categoryModel = categoryModel;
    this.sightingModel = sightingModel;
  }

  // // Get all categories associated to sighthing
  // async getCategory(req, res) {
  //   const { sightingId } = req.body;
  // }

  // Add new category
  async addCategory(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.categoryModel.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
