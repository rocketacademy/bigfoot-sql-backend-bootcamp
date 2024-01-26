// base controller is not in index.js.
// base controller is like a "refactor" of all controllers. Just extend this to the respesive controller, and this function will work for each "controller".
// does not extend out like CSS coding. 
// super(model) = extending hte 

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
}

module.exports = BaseController;
