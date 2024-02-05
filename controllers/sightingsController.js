const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, comment_model) {
    super(model);
    //The super is used to call the constructor of it's
    //parent class, to access the parent's properties and
    //methods.
    this.comment_model = comment_model;
    console.log("comment_model variable:", comment_model);
    //the "model" is just the sighting model!!
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      //find by primary key
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //Post a new sighting
  async postSighting(req, res) {
    console.log("req.body: ", req.body);
    try {
      await this.model.create({
        date: req.body.date,
        location: req.body.location,
        notes: req.body.notes,
        createdAt: new Date(),
        updatedAt: new Date(),
        //Don't include id, createdAt and updatedAt when using thunderclient to make a POST request. the database will handle it
      });
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getSightingComments(req, res) {
    const { sightingId } = req.params;
    console.log("req.params:", req.params);
    console.log(sightingId);
    try {
      const all_comments = await this.comment_model.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      console.log("all_comments has a value. it's:", all_comments);
      return res.json(all_comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postSightingComment(req, res) {
    const { sightingId } = req.params;
    console.log("req.body: ", req.body);
    console.log("req.body.content:", req.body.content);
    console.log("req.params: ", req.params);
    console.log("sighting_id:", sightingId);
    try {
      await this.comment_model.create({
        sightingId: sightingId,
        content: req.body.content[0],
        createdAt: new Date(),
        updatedAt: new Date(),
        //Don't include id, createdAt and updatedAt when using thunderclient to make a POST request. the database will handle it
      });
      const output = await this.comment_model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
