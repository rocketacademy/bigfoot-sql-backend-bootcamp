/* eslint-disable no-unused-vars */
const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor({ model, comment }) {
    super(model);
    this.comment = comment;
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

  addNewSighting = async (req, res) => {
    let date = req.body.date;
    let location = req.body.location;
    let notes = req.body.notes;

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });

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
