const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }

  //Create sighting
  async insertOne(req, res) {
    const { date, location, notes } = req.body;
    console.log(req.body);
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
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

  // Retrieve all sightings
  async getAllSightings(req, res) {
    try {
      const sightings = await this.model.findAll();
      return res.json(sightings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getAllComments(req, res) {
    const { sightingId: sighting_id } = req.params;
    console.log(req.params);
    try {
      console.log("searching..");
      const comments = await this.commentModel.findAll({
        sighting_id: sighting_id,
      });
      console.log(comments);
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOneComment(req, res) {
    const { content } = req.body;
    const { sightingId: sighting_id } = req.params;
    console.log(req.body);
    console.log(req.params);
    try {
      console.log("trying");
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sighting_id,
      });
      console.log(sighting_id);
      console.log(newComment);
      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
