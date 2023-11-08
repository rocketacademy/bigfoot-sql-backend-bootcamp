const BaseController = require('./baseController');

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
  }

  createCategory = async (req, res) => {
    const { name } = req.body;

    try {
      const newCategory = await this.model.create({
        name: name,
      });
      return res.json(newCategory);
    } catch (err) {
      return res.status(403).json({ error: true, msg: err });
    }
  };

  editCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
      const categoryToEdit = await this.model.findByPk(categoryId);
      const updatedCategory = {
        content: req.body.content,
        sighting_id: categoryToEdit.sighting_id,
      };
      await categoryToEdit.update(updatedCategory);
      const data = await this.model.findAll();
      return res.json({ category: data });
    } catch (err) {
      return res.status(403).json({ error: true, msg: err });
    }
  };
}

module.exports = CategoriesController;
