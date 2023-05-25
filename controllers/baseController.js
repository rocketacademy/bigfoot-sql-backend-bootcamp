class BaseController {
  constructor(model, category) {
    this.model = model;
    this.category = category;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll({ include: this.category });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // TODO: Fix bug - works sometimes
  // async getAllWithFilter(req, res) {
  //   try {
  //     const { date, locationDescription, country, cityOrTown, notes } =
  //       req.query;
  //     const whereClause = {};

  //     if (date) {
  //       whereClause.date = date;
  //     }

  //     if (locationDescription) {
  //       whereClause.locationDescription = locationDescription;
  //     }

  //     if (country) {
  //       whereClause.country = country;
  //     }

  //     if (cityOrTown) {
  //       whereClause.cityOrTown = cityOrTown;
  //     }

  //     if (notes) {
  //       whereClause.notes = notes;
  //     }

  //     const output = await this.model.findAll({ where: whereClause });
  //     return res.json(output);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = BaseController;
