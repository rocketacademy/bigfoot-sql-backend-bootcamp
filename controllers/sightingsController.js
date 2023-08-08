const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.categoryModel = categoryModel;
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

  // Create a new sighting
  async createOne(req, res) {
    const { date, city, country, locationDescription, notes, categoryIds } =
      req.body;
    try {
      const newSighting = await this.model.create({
        date,
        city,
        country,
        locationDescription,
        notes,
        categoryIds,
      });

      // Associate sighting with categories
      if (categoryIds && categoryIds.length) {
        await newSighting.setCategories(categoryIds);
      }

      return res.status(201).json(newSighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Edit specific sighting
  async editOne(req, res) {
    const { sightingId } = req.params;
    const { date, city, country, locationDescription, categoryIds, notes } =
      req.body;
    try {
      const sighting = await this.model.findByPk(sightingId);
      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }

      await sighting.update({
        date,
        city,
        country,
        locationDescription,
        categoryIds,
        notes,
      });

      // Update the associated categories
      if (categoryIds && categoryIds.length) {
        await sighting.setCategories(categoryIds);
      }

      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Get comments for a given sighting
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }
      const comments = await sighting.getComments();
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Create a comment for a given sighting
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const sighting = await this.model.findByPk(sightingId);
      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }
      const newComment = await this.commentModel.create({
        content,
        sighting_id: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  // Get category_ids for a given sighting
  async getCategories(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {
        include: [
          {
            model: this.categoryModel,
            as: "categories",
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
        ],
      });

      if (!sighting) {
        return res.status(404).json({ error: true, msg: "Sighting not found" });
      }

      const categoryIds = sighting.categories.map((category) => ({
        label: category.name,
        value: category.id,
      }));

      return res.json(categoryIds);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
}

module.exports = SightingsController;
