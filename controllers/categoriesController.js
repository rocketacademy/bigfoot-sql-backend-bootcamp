const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  addCategory = async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = await this.model.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = CategoriesController;
