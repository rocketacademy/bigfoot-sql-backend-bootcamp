const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
    this.categoryModel = model;
  }

  async createCategory(req, res) {
    try {
      const newCategory = await this.categoryModel.create({
        name: req.body.name,
      });
      return res.json(newCategory);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.categoryModel.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // async getSightingCategory(req, res) {
  //   const { sightingId } = req.params;
  //   console.log(req.params);
  //   try {
  //     const sighting = await this.model.findByPk(sightingId);
  //     console.log(sighting);
  //     return res.json(sighting);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = CategoriesController;
