const BaseController = require("./baseController");
// Removed the declaration and assignment of the categoryModel variable since it is not being used.

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
  }

  async insertOne(req, res) {
    const { date, location, notes, selectedCategoryIds } = req.body;
    console.log(req.body);

    try {
      // Create new sighting
      let newSighting;
      try {
        newSighting = await this.model.create({
          date,
          location,
          notes,
        });
      } catch (err) {
        console.error("Error creating new sighting:", err);
        throw err;
      }

      // Find category by name (assuming `selectedCategory` is the category name)
      let selectedCategory;
      try {
        selectedCategory = await this.categoryModel.findOne({
          where: {
            id: selectedCategoryIds,
          },
        });
      } catch (err) {
        console.error("Error finding category:", err);
        throw err;
      }

      console.log("Selected category:", selectedCategory);

      // Assign category to the new sighting
      await newSighting.setCategories([selectedCategory]);

      console.log("Category assigned to sighting:", newSighting);

      return res.json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: "categories",
      });
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve all sightings
  async getAllSightings(req, res) {
    try {
      const sightings = await this.model.findAll();
      return res.json(sightings);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific sighting
  async getAllCommentsBySightingId(req, res) {
    const { sightingId } = req.params;
    console.log(req.params);
    try {
      console.log("searching..");
      const comments = await this.commentModel.findAll({
        where: {
          sighting_id: sightingId,
        },
      });
      console.log(comments);
      return res.json(comments);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertOneComment(req, res) {
    const { content } = req.body;
    const { sightingId: sighting_id } = req.params;
    console.log(req.body);
    console.log(req.params);
    try {
      console.log("trying");
      const newComment = await this.commentModel.create({
        content: content,
        sighting_id: sighting_id,
      });
      console.log(sighting_id);
      console.log(newComment);
      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getSightingCategory(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = SightingsController;
