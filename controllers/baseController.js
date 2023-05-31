class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    console.log("called correctly");
    console.log(this.model);
    try {
      const output = await this.model.findAll();
      console.log(output);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
