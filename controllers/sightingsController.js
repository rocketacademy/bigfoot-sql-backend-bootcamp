const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  getOne = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Create a new sighting
  add = async (req, res) => {
    const { date, location, notes, categoryId } = req.body;
    console.log(req.body);
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });
      const selectedWeathers = await this.categoryModel.findAll({
        where: {
          id: categoryId,
        },
      });
      await newSighting.setCategories(selectedWeathers);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Query for all comments from a sighting
  getAllComments = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(allComments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // Create a new comment
  addComment = async (req, res) => {
    console.log("addComment method called");
    const { sightingId } = req.params;
    console.log("sightingId:", sightingId);
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      console.log("newComment:", newComment);
      return res.json(newComment);
    } catch (err) {
      console.log("Error:", err);
      return res.status(400).json({ error: true, msg: err });
    }
  };

  editSighting = async (req, res) => {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;
    try {
      const sightingToEdit = await this.model.findByPk(sightingId);
      await sightingToEdit.update({
        date,
        location,
        notes,
      });
      const output = await this.model.findAll({
        include: this.categoryModel,
        order: [["id", "ASC"]],
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
