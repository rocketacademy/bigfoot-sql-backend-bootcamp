const BaseController = require("./baseController");

//super(model) is a first "element" that's defined in the router, under index.js
//can rename "model" if i wish

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    //comment model
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: this.categoryModel,
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // // add sightings
  // add = async (req, res) => {
  //   //pass in categories id too for junction table
  //   const { date, location, notes } = req.body;
  //   try {
  //     const newSighting = await this.model.create({
  //       date: date,
  //       location: location,
  //       notes: notes,
  //     });
  //     // Respond to the user
  //     return res.send(newSighting);
  //   } catch (error) {
  //     console.error("Error adding sighting:", error);
  //   }
  // };

  // add sightings with categories
  add = async (req, res) => {
    //base on frontend naming convention
    const { date, location, notes, selectedCategoryIds } = req.body;
    try {
      // Create new sighting
      const newSighting = await this.model.create({
        date: new Date(date),
        location: location,
        notes: notes,
      });
      // Retrieve selected categories
      const selectedCategories = await this.categoryModel.findAll({
        where: {
          id: selectedCategoryIds,
        },
      });

      // Associated new sighting with selected categories
      await newSighting.setCategories(selectedCategories);
      // Respond with new sighting
      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  //delete
  delete = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const deleteSighting = await this.model.destroy({
        where: {
          id: sightingId,
        },
      });
      return res.json(deleteSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  ////edit
  edit = async (req, res) => {
    const { date, location, notes } = req.body;
    const { sightingId } = req.params;
    try {
      await this.model.update(
        {
          date: date,
          location: location,
          notes: notes,
        },
        {
          where: {
            id: sightingId,
          },
        }
      );
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // <------Comments Section ------->

  //retrieve ALL comments
  //use get
  getComments = async (req, res) => {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };

  // post comment for selected sighting
  // tag to sighting id
  insertComment = async (req, res) => {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.commentModel.create({
        content: content,
        sightingId: sightingId,
      });
      console.log("content", content);
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  };
}

module.exports = SightingsController;
