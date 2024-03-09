class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    const location = req.query.location;
    try {
      let sightings = await this.model.findAll();
      if (location) {
        sightings = sightings.filter(
          (sighting) =>
            sighting.location &&
            sighting.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      return res.json(sightings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
