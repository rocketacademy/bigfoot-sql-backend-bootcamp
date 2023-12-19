class BaseController {
  constructor(sightingModel) {
    this.sightingModel = sightingModel;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.sightingModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
