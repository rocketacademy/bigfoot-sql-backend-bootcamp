/* eslint-disable no-unused-vars */
const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor({ model, comment, category }) {
    super(model);
    this.comment = comment;
    this.category = category;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.category,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  addNewSighting = async (req, res) => {
    let date = req.body.date;
    let location = req.body.location;
    let notes = req.body.notes;
    let categories = req.body.categories;

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });

      const categoryArray = await this.category.findAll({
        where: {
          name: categories,
        },
      });

      newSighting.setCategories(categoryArray);

      return res.json({
        success: true,
        sighting: newSighting,
      });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  };

  getAllComments = async (req, res) => {
    const { sightingId } = req.params;

    const sighting = await this.model.findOne({
      where: { id: sightingId },
    });

    const comments = await sighting.getComments();

    return res.json({ success: true, data: comments });
  };

  addNewComment = async (req, res) => {
    const { sightingId } = req.params;
    let content = req.body.content;

    const newComment = await this.comment.create({
      content,
      sightingId,
    });

    return res.json({ success: true, data: newComment });
  };
}

module.exports = SightingsController;
