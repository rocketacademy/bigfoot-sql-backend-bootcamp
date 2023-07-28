const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(
    model,
    commentModel,
    categoryModel,
    likeModel,
    sightingCategoriesModel
  ) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
    this.likeModel = likeModel;
    this.sightingCategoriesModel = sightingCategoriesModel;
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
    const {
      date,
      locationDescription,
      notes,
      categoryIds,
      city,
      country,
      intensityIds,
    } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        locationDescription: locationDescription,
        notes: notes,
        city: city,
        country: country,
      });

      // Add each category with its intensity individually
      for (let i = 0; i < categoryIds.length; i++) {
        const categoryId = categoryIds[i];
        const intensityId = intensityIds[i];

        const selectedWeather = await this.categoryModel.findByPk(categoryId);
        await newSighting.addCategory(selectedWeather, {
          through: { intensity: intensityId },
        });
      }
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
        order: [["id", "ASC"]],
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
    const { date, locationDescription, notes, city, country, categoryIds } =
      req.body;
    try {
      const sightingToEdit = await this.model.findByPk(sightingId);
      await sightingToEdit.update({
        date,
        locationDescription,
        notes,
        city,
        country,
      });
      const selectedWeathers = await this.categoryModel.findAll({
        where: {
          id: categoryIds,
        },
      });
      await sightingToEdit.setCategories(selectedWeathers);
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
