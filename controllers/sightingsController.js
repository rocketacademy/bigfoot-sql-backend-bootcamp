const BaseController = require("./baseController");
const { Op } = require("sequelize");

class SightingsController extends BaseController {
  constructor(model, comment, category) {
    super(model);

    this.commentModel = comment;
    this.categoryModel = category;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // create new instance for sighting
  async create(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    console.log(req.body);

    try {
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      // retrieve the selected categories by using the selectedCategoryIds from the JSON body
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: {
            [Op.or]: selectedCategoryIds,
          },
          // Op stands for Operator, .or means or (|| as in if conditions)
        },
      });

      console.log(
        "selectedCategories from selectedCategoryIds:",
        selectedCategories
      );
      console.log("selectedCategoryIds:", selectedCategoryIds);
      // associate new sighting with selected categories
      // await newSighting.setCategories(selectedCategories);

      //Promise.all and .map allows for the extraction of categories (from array SelectedCategories) and the subsequent association of those categories with sightings to be performed at the same time.
      await Promise.all(
        selectedCategories.map(async (category) => {
          await newSighting.setCategories(category);
        })
      );

      console.log(newSighting);

      // response for new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // retrieve all comments from a sighting
  async getAllComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create comments for a sighting
  async createOneComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      console.log(content);
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      console.log("newComment", newComment);

      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
