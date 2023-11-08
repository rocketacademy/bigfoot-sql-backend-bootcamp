const BaseController = require('./baseController');

class SightingsController extends BaseController {
  constructor(model, category) {
    super(model);
    this.category = category;
  }

  // Retrieve specific sighting
  getOne = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  createOne = async (req, res) => {
    const { date, location, notes } = req.body;
    console.log('body', req.body);
    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });
      return res.json({ sighting: newSighting });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  associateCategories = async (req, res) => {
    const { sightingId, categoryId } = req.body;

    try {
      const sighting = await this.model.findByPk(sightingId);
      const category = await this.category.findByPk(categoryId);

      await sighting.setCategories(category);

      return res.json({ sighting, category });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getSightingsWithCat = async (req, res) => {
    const { id } = req.params;

    try {
      const item = await this.model.findOne({
        where: { id },
        include: this.category,
      });

      return res.json({ item });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
