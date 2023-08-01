const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
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
  // Code to insert data
  async postOne(request, response) {
    console.log("post request came in");
    console.log(request.body); // All of the data that is being sent

    // Example body:
    // {
    //   "date": "2023-09-19",
    //   "location": "Outworld",
    //   "notes": "Met something with feet not only big, but has 4 of them in the Mortal Kombat tournament"
    // }

    const sighting_date = request.body.date;
    const location = request.body.location;
    const notes = request.body.notes;

    try {
      // Create a new instance of the Sighting model with the data to be inserted
      const newSighting = await this.model.create({
        date: sighting_date,
        location: location,
        notes: notes,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // The 'newSighting' now contains the newly created Sighting with its ID

      // Return the ID of the newly created sighting as a response
      return response.json(newSighting);
    } catch (err) {
      return response.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
