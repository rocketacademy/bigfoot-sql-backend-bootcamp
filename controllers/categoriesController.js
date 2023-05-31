/* eslint-disable no-unused-vars */
const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  createCategory = async (req, res) => {
    const name = req.body.name;
    try {
      const newCategory = await this.model.create({
        name,
      });
      return res.json({ success: true, data: newCategory });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };
}

module.exports = CategoriesController;
