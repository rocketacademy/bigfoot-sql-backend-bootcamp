const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: "categories",
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create new sighting
  async insertOne(req, res) {
    const { date, location, notes, selectedCatIds } = req.body;
    try {
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });

      const selectedCategory = await this.categoryModel.findAll({
        where: {
          id: selectedCatIds,
        },
      });

      await newSighting.setCategories(selectedCategory);
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // edit existing sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const { date, location, notes } = req.body;

    try {
      const updatedSighting = await this.model.update(
        {
          date,
          location,
          notes,
        },
        {
          where: {
            id: sightingId,
          },
        }
      );
      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // retrieve all comments
  async getComments(req, res) {
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

  // create comment
  async insertComment(req, res) {
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

  // edit comment
  async editComment(req, res) {
    const { sightingId, commentId } = req.params;
    const { content } = req.body;

    try {
      const updatedComment = await this.commentModel.update(
        {
          content: content,
        },
        {
          where: {
            id: commentId,
            sighting_id: sightingId,
          },
        }
      );
      return res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // delete comment
  async deleteComment(req, res) {
    const { sightingId, commentId } = req.params;
    try {
      await this.commentModel.destroy({
        where: {
          id: commentId,
          sighting_id: sightingId,
        },
      });
      return res.json();
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
