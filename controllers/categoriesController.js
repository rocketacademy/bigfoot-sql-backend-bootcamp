const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(category, sighting) {
    super(category);
    this.category = category;
    this.sighting = sighting;
  }

  /*
  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.sighting.findByPk(sightingId);
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }*/

  // Create category
  async createCategory(req, res) {
    const { name } = req.body;
    try {
      const newCategory = await this.category.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Create relationship between sighting and category
  // post to localhost:8000/categories/create
  async createSightingCategory(req, res) {
    const { sightingId, categories } = req.body;
    try {
      const targetSighting = await this.sighting.findOne({
        where: { id: sightingId },
      });
      const targetCategories = categories.map((categoryData) => {
        return categoryData.value;
      });
      targetSighting.addCategory(targetCategories);
      return res.json({ targetCategories, targetSighting });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  /*
  // Create comment
  async createComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const newComment = await this.comment.create({
        content: content,
        // although the comment model has sighting_id,
        // it is converted to sightingId via underscored: true
        sightingId: sightingId,
      });
      return res.json(newComment);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Get all comments
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.comment.findAll({
        where: {
          sightingId: sightingId,
        },
      });
      return res.json(comments);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
    */
}

module.exports = CategoriesController;
