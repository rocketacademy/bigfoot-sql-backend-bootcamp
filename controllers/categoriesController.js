const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
    this.categoryModel = model;
  }

  async createCategory(req, res) {
    console.log(req);
    console.log(req.body);
    console.log(req.body.name);
    try {
      console.log("Adding Category....");
      const newCategory = await this.categoryModel.create({
        name: req.body.name,
      });
      console.log("Category Added....");
      return res.json(newCategory);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getAllCategories(req, res) {
    console.log(req);
    try {
      const categories = await this.categoryModel.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = CategoriesController;
