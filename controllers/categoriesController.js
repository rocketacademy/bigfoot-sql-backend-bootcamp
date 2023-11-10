const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model, sightingModel) {
    super(model);
    this.sightingModel = sightingModel;
  }

  async postOne(req, res) {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ success: false, msg: 'input error' })
    }
    try {
      const newCategory = await this.model.create({name});
      return res.json({ success: true, category: newCategory })
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  

}

module.exports = CategoriesController;
