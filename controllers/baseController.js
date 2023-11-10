class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  //will be passing in search params from sightingList loading
  //search params include year and month - need to convert date

  async getAll(req, res) {
    //const {sortBy, sortOrder, ...sightingFilters} = req.query
    try {
      const output = await this.model.findAll(
    //     {
    //     where: {
    //       date: //starts with year, substring -month- - but what if these don't exist in the query
    //     }
    // }
    );
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
