const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comment, like) {
    super(model);
    this.comment = comment;
    this.like = like;
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

  // Post new sighting
  async addOne(req, res) {
    const { date, locationDescription, country, cityOrTown, notes } = req.body;
    try {
      const newSighting = await this.model.create({
        date: new Date(date),
        locationDescription: locationDescription,
        country: country,
        cityOrTown: cityOrTown,
        notes: notes,
      });
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Update existing sighting
  async updateOne(req, res) {
    const { date, locationDescription, country, cityOrTown, notes } = req.body;
    const { sightingId } = req.params;
    try {
      const update = await this.model.update(
        {
          date: date,
          locationDescription: locationDescription,
          country: country,
          cityOrTown: cityOrTown,
          notes: notes,
        },
        { where: { id: sightingId } }
      );
      console.log("Updates:", update);

      const updatedSighting = await this.model.findByPk(sightingId);

      return res.json(updatedSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all sightings with filtering
  async getAllWithFilter(req, res) {
    try {
      const { date, location, notes } = req.query;
      const whereClause = {};

      if (date) {
        whereClause.date = date;
      }

      if (location) {
        whereClause.location = location;
      }

      if (notes) {
        whereClause.notes = notes;
      }

      const output = await this.model.findAll({ where: whereClause });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all comments from sighting
  async getAllComments(req, res) {
    const { sightingId } = req.params;

    try {
      const comments = await this.comment.findAll({
        where: { sightingId: sightingId },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create comments on sighting
  async addComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;

    try {
      const newComment = await this.comment.create({
        content: content,
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit comment
  async editComment(req, res) {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
      const editedComment = await this.comment.update(
        {
          content: content,
        },
        { where: { id: commentId } }
      );
      return res.json(editedComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Delete comment
  async deleteComment(req, res) {
    const { commentId } = req.params;

    try {
      const deletedComment = await this.comment.destroy({
        where: {
          id: commentId,
        },
      });
      return res.json(deletedComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all likes for sighting
  async getAllLikes(req, res) {
    const { sightingId } = req.params;

    try {
      const likes = await this.like.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(likes);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get likes count for sighting
  async getLikesCount(req, res) {
    const { sightingId } = req.params;

    try {
      const likesCount = await this.like.count({
        where: { sightingId: sightingId },
      });
      return res.json({ count: likesCount });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Add like to sighting
  async addLike(req, res) {
    const { sightingId } = req.params;
    const { total } = req.body;

    try {
      const newLike = await this.like.create({
        total: total,
        sightingId: sightingId,
      });
      return res.json(newLike);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
