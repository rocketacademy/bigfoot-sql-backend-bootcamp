// importing DB

class BaseController {
  constructor(model) {
    this.model = model;
  }
  db = require("../db/models/index");

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({
        include: [{ model: this.db.category }],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
