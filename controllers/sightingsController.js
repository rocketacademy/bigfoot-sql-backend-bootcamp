const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, { comments, categories }) {
    super(model);
    this.comments = comments;
    this.categories = categories;
  }

  async getFiltered(req, res) {
    try {
      let { filter } = req.query;
      let output;
      if (filter === "All" || !filter) {
        output = await this.model.findAll();
      } else {
        output = await this.model.findAll({
          where: { season: filter },
        });
      }
      const summarisedData = [];
      output.map((sighting) => {
        const sightingData = {
          id: sighting.id,
          location: sighting.location,
          month: sighting.month,
          year: sighting.year,
          season: sighting.season,
        };
        summarisedData.push(sightingData);
      });
      return res.json(summarisedData);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const sighting = await this.model.findOne({
        where: { id: id },
        include: { model: this.categories },
      });
      // const categories = await this.sightingsCategories.findAll({
      //   where: { sightingId: id },
      // });
      // console.log(categories);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOne(req, res) {
    const { month, year, location, season, notes } = req.body;
    // if (!date || !location) {
    //   return res.state(401).json({ success: false, msg: "Missing information" });
    // }

    try {
      const newSighting = await this.model.create({
        month,
        year,
        location,
        season,
        notes,
      });
      return res.json({ success: true, sighting: newSighting });
    } catch (err) {
      return res.state(400).json({ success: false, msg: err });
    }
  }

  async getComments(req, res) {
    const { id } = req.params;
    try {
      const output = await this.comments.findAll({
        where: { sightingId: id },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postComment(req, res) {
    const { id } = req.params;
    const { content, commentor } = req.body;

    try {
      const newComment = await this.comments.create({
        content,
        commentor: commentor === null ? "Anonymous" : commentor,
        sightingId: id,
      });
      return res.json({ success: true, comment: newComment });
    } catch (err) {
      return res.status(400).json({ success: false, msg: err });
    }
  }
}

module.exports = SightingsController;
