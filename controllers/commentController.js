const BaseController = require('./baseController');

class CommentController extends BaseController {
  constructor(model) {
    super(model);
  }

  createOne = async (req, res) => {
    const { content, sightingId } = req.body;
    console.log('body', req.body);
    try {
      const newComment = await this.model.create({
        content,
        sightingId,
      });
      return res.json({ comments: newComment });
    } catch (err) {
      return res.status(403).json({ error: true, msg: err });
    }
  };

  editOne = async (req, res) => {
    try {
      const commentToAdd = req.body;
      const commentToReplace = req.params.id;
      const commentToEdit = await this.model.findByPk(commentToReplace);
      await commentToEdit.update(commentToAdd);
      const data = await this.model.findAll();
      return res.json({ comments: data });
    } catch (err) {
      return res.status(403).json({ error: true, msg: err });
    }
  };

  deleteOne = async (req, res) => {
    try {
      const commentToDelete = req.params.id;
      const condition = { id: commentToDelete };
      await this.model.destroy({ where: condition });
      const data = await this.model.findAll();
      return res.json({ comments: data });
    } catch (err) {
      return res.status(403).json({ error: true, msg: err });
    }
  };
}

module.exports = CommentController;
