const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel, categoryModel) {
    super(sightingModel);
    this.sightingModel = sightingModel;
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sightingModel.findByPk(sightingId, {
        include: [
          {
            model: this.categoryModel,
            through: { attributes: [] },
          },
        ],
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add new sighting
  async addOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      const addedCategories = await this.categoryModel.findAll({
        where: { id: selectedCategoryIds },
      });

      const newSighting = await this.sightingModel.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });

      await newSighting.setCategories(addedCategories);

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Retrieve all comments
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Add comment
  async addComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;

    try {
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
