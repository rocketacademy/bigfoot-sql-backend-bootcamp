class BaseController {
  constructor(model, categoryModel) {
    this.model = model;
    this.categoryModel = categoryModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  getAll = async (req, res) => {
    try {
      if (req.query.year) {
        console.log(typeof req.query.year);
        const output = await this.model.findAll({
          include: this.categoryModel,
        });
        const filteredOutput = output.filter((item) =>
          item.date.toString().includes(req.query.year)
        );
        return res.json(filteredOutput);
      } else {
        const output = await this.model.findAll({
          include: this.categoryModel,
        });
        return res.json(output);
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = BaseController;
