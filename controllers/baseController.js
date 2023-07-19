class BaseController {
  constructor(model, categoryModel) {
    this.model = model;
    this.categoryModel = categoryModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  getAll = async (req, res) => {
    try {
      const { year, sort } = req.query;
      const output = await this.model.findAll({
        include: this.categoryModel,
        order: [["id", "ASC"]],
      });

      let filteredOutput = output;

      if (year) {
        filteredOutput = output.filter((item) =>
          item.date.toString().includes(year)
        );
      }

      if (sort === "asc") {
        filteredOutput = filteredOutput.sort((a, b) => a.date - b.date);
      }

      if (sort === "desc") {
        filteredOutput = filteredOutput.sort((a, b) => b.date - a.date);
      }

      return res.json(filteredOutput);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = BaseController;
