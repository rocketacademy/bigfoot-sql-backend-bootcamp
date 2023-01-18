class BaseController {
  constructor(model, categoryModel) {
    this.model = model;
    this.categoryModel = categoryModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: this.categoryModel,
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
