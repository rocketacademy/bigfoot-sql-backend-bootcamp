const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
    console.log(
      "i am the model in the SightingsController constructor: ",
      model
    );
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
}

module.exports = SightingsController;
