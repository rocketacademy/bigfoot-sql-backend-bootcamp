class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      let { filter } = req.query;
      let output;
      if (filter === "All" || !filter) {
        output = await this.model.findAll();
      } else {
        output = await this.model.findAll({
          where: { season: filter },
        });
      }
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
