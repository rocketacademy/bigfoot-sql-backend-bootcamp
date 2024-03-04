class BaseController {
  constructor(base) {
    this.base = base;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.base.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
