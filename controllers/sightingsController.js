const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.commentModel = commentModel;
  }
  // Create sighting




  // GET specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //POST new sighting
  async postOne(req, res) {
    const { date, location, notes } = req.body
    if (!date || !location) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }

    try {
      const newSighting = await this.model.create({
        date,
        location,
        notes,
      });
      return res.json({ success: true, newSighting })
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  //PUT or edit existing sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    console.log(req.params)
    // const { newData } = req.body;
    const { date, location, notes } = req.body
    console.log(req.body)
    // check validation for data first
    if (!req.body) {
      return res
        .status(401)
        .json({ success: false, msg: "missing information" });
    }
    try {
      //const sighting = await this.model.findByPk(sightingId);
      const updatedSighting = await this.model.update({
        date,
        location,
        notes
        // newData
      }, { where: { id: sightingId } });

      return res.json({ success: true, updatedSighting })
    }
    catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //DELETE request for sighting
  async deleteOne(req, res) {
    const { sightingId } = req.params;
    try {

      const updatedSighting = await this.model.destroy({
        where: { id: sightingId }

      });

      return res.json({ success: true, updatedSighting })
    }
    catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  //GET all comments for a specific sighting
  async getComments(req, res) {
    const { sightingId } = req.params;
    console.log(sightingId);
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      res.json({ success: true, comments })
    } catch (err) {
      res.status(400).json({ success: false, msg: err })
    }
  }

  //POST create comment for one specific sighting
  async insertOneComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      })
      res.json({ success: true, newComment })
    } catch (err) {
      res.status(400).json({ success: false, msg: err })
    }
  }



}
module.exports = SightingsController;
