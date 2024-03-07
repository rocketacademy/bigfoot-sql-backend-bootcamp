const { where } = require("sequelize");
const comment = require("../db/models/comment");
const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(sightingModel, commentModel) {
    super(sightingModel);
    this.sightingModel = sightingModel;
    this.commentModel = commentModel;
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

  //Create sighting
  async add(req, res) {
    let sightingToAdd = req.body;
    try {
      let sightingAdded = await this.model.create(sightingToAdd);
      return res.json(sightingAdded);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getComments(req, res) {
    const { sightingId } = req.params;
    // const sightingIdInt = Number(sightingId);

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

  async addComment(req, res) {
    const { sightingId } = req.params;
    let commentsToAdd = req.body;

    try {
      const commentsAdded = await this.commentModel.create({
        content: commentsToAdd.content,
        sightingId: sightingId,
      });
      return res.json(commentsAdded);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
