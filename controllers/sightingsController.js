const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, likeModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.likeModel = likeModel;
    this.categoryModel = categoryModel;
  }

  // Sightings
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

  // Create sighting
  async createSighting(req, res) {
    const {
      dateInput,
      locationInput,
      notesInput,
      cityInput,
      countryInput,
      selectedCategoryIds,
    } = req.body;
    try {
      // Create new sighting
      const sighting = await this.model.create({
        date: dateInput,
        location_discription: locationInput,
        notes: notesInput,
        city: cityInput,
        country: countryInput,
      });
      // Retrieve selected categories
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });
      // Associated new sighting with selected categories
      await sighting.setCategories(selectedCategories);
      // Respond with new sighting id
      return res.json(sighting.id);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit sighting
  async editSighting(req, res) {
    const { id, date, location, notes, city, country } = req.body;
    try {
      await this.model.update(
        {
          date: date,
          location_discription: location,
          notes: notes,
          city: city,
          country: country,
        },
        { where: { id: id } }
      );
      return res.send(id);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Comments
  // get comments
  async getComments(req, res) {
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

  // create comment
  async createComment(req, res) {
    const { content } = req.body;
    const { sightingId } = req.params;
    try {
      const comment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      return res.json(comment); // res.send("Success");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // edit comment
  async editComment(req, res) {
    const { content, commentId } = req.body;
    try {
      const comment = await this.commentModel.update(
        {
          content: content,
        },
        { where: { id: commentId } }
      );
      return res.send(comment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // delete comment
  async deleteComment(req, res) {
    const { commentId } = req.body;
    try {
      await this.commentModel.destroy({
        where: { id: commentId },
      });
      return res.send();
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // likes
  // Retrieve likes count
  async getLikes(req, res) {
    const { sightingId } = req.params;
    try {
      const likes = await this.likeModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.send(likes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create like for a sighting
  async createLike(req, res) {
    const { sightingId } = req.params;
    try {
      const like = await this.likeModel.create({
        isLiked: 1,
        sightingId: sightingId,
      });
      return res.json(like);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
