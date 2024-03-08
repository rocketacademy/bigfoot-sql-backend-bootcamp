const BaseController = require('./baseController');

class SightingsController extends BaseController {
  constructor(model, categoryModel, commmentModel) {
    super(model);
    this.categoryModel = categoryModel;
    this.commentModel = commmentModel;
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

  // Post request to create a new sighting in db
  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;

    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: date,
        location: location,
        notes: notes,
      });

      // Retrieve selected categories from req.body
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });

      // Associate new sighting with selected categories
      await newSighting.setCategories(selectedCategories);
      console.log(selectedCategories);
      res.send(newSighting);
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  // Edit sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const newDate = req.body.date;
    const newLocation = req.body.location;
    const newNotes = req.body.notes;

    try {
      const sightingToBeEdited = await this.model.findByPk(sightingId);

      const editedSighting = await sightingToBeEdited.update({
        date: newDate,
        location: newLocation,
        notes: newNotes,
      });

      console.log(sightingToBeEdited);
      res.send(editedSighting);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, msg: 'Internal server error' });
    }
  }

  // Retrieve all comments from a sighting
  async retrieveComment(req, res) {
    const { sightingId } = req.params;
    try {
      const allComments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });

      res.send(allComments);
    } catch (err) {
      console.log(err);
    }
  }

  async postComment(req, res) {
    const { sightingId } = req.params;
    const content = req.body.content;

    try {
      const sightingToBeCommented = await this.commentModel.create(
        {
          content: content,
          sightingId: Number(sightingId),
        },
        {
          returning: [
            'id',
            'content',
            'created_at',
            'updated_at',
            'sighting_id',
          ],
        },
      );

      console.log(sightingToBeCommented.query);

      res.json(sightingToBeCommented);
    } catch (err) {
      console.log(err);
    }
  }

  async editComment(req, res) {
    const { sightingId } = req.params;
    const { commentId } = req.params;
    const updatedContent = req.body.content;
    console.log(req.params, req.body);
    try {
      const [targetComment] = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
          id: commentId,
        },
      });

      const editedComment = await targetComment.update({
        content: updatedContent,
      });

      res.send(editedComment);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteComment(req, res) {
    const { sightingId } = req.params;
    const { commentId } = req.params;
    console.log(res);
    try {
      await this.commentModel.destroy(
        {
          where: {
            sighting_id: sightingId,
            id: commentId,
          },
        },
        {
          returning: [
            'id',
            'content',
            'created_at',
            'updated_at',
            'sighting_id',
          ],
        },
      );

      res.send('Comment has been deleted!');
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SightingsController;
