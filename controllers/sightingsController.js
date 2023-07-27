const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel, likeModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
    this.likeModel = likeModel;
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
    const { date, location_description, notes, categoryId, city, country } =
      req.body;
    console.log(req.body);
    try {
      const newSighting = await this.model.create({
        date: date,
        location_description: location_description,
        notes: notes,
        city: city,
        country: country,
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
    const { date, location_description, notes, city, country } = req.body;
    try {
      const sightingToEdit = await this.model.findByPk(sightingId);
      await sightingToEdit.update({
        date,
        location_description,
        notes,
        city,
        country,
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

  editComment = async (req, res) => {
    const { sightingId, commentId } = req.params;
    const { content } = req.body;
    try {
      const commentToEdit = await this.commentModel.findOne({
        where: {
          sightingId: sightingId,
          id: commentId,
        },
      });
      const updatedComment = await commentToEdit.update({ content });
      return res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  deleteComment = async (req, res) => {
    const { sightingId, commentId } = req.params;
    try {
      await this.commentModel.destroy({
        where: {
          id: commentId,
          sightingId: sightingId,
        },
      });
      return res.json("deleted");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  getAllLikes = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const likes = await this.likeModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(likes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  addLikes = async (req, res) => {
    const { sightingId } = req.params;
    try {
      let newLike = await this.likeModel.findOne({
        where: {
          sightingId: sightingId,
        },
      });
      // Increment likeCount if the requested sightingId already exists, else create a new row with initial likeCount of 1 for that sightingId
      newLike
        ? await newLike.increment("likeCount")
        : (newLike = await this.likeModel.create({
            likeCount: 1,
            sightingId,
          }));
      return res.json(newLike);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
