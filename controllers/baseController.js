class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // TODO: Fix bug - works sometimes
  async getAllWithFilter(req, res) {
    try {
      const { date, location, notes } = req.query;
      const whereClause = {};

      if (date) {
        whereClause.date = date;
      }

      if (location) {
        whereClause.location = location;
      }

      if (notes) {
        whereClause.notes = notes;
      }

      const output = await this.model.findAll({ where: whereClause });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
