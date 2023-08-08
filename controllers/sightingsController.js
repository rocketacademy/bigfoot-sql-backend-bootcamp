const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel) {
    super(model);
    this.model2 = commentModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    console.log(this.mode);
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(500).json({ error: true, msg: err.message });
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
  async getComment(request, response) {
    const { sightingId } = request.params;

    try {
      const comments = await this.model2.findAll({
        where: {
          sighting_id: sightingId,
        },
      });

      return response.json(comments);
    } catch (err) {
      return response.status(500).json({ error: true, msg: err.message });
    }
  }
  async postComment(request, response) {
    const { sightingId } = request.params;
    //console.log("posted comment");
    // Example body:
    // {
    //
    //   "content": "Thats scary!"
    // }

    const content = request.body.content;

    try {
      // Create a new instance of the comment model with the data to be inserted
      const newComment = await this.model2.create({
        sighting_id: sightingId,

        content: content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // The 'newSighting' now contains the newly created Sighting with its ID

      // Return the ID of the newly created sighting as a response
      return response.json(newComment);
    } catch (err) {
      return response.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
