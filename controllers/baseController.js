class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async insertOne(req, res) {
    try {
      const data = { ...req.body };
      const output = await this.model.create(data);
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  // // Retrieve specific sighting
  // async getOne(req, res) {
  //   const { sightingId } = req.params;
  //   try {
  //     const sighting = await this.model.findByPk(sightingId);
  //     return res.json(sighting);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
  // // retrieve comments
  // async getComments(req, res) {
  //   const { sightingId } = req.params;
  //   try {
  //     const comments = await this.commentModel.findAll({
  //       where: { sightingId: sightingId },
  //     });
  //     return res.json(comments);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }

  // // create comments
  // async insertOneComment(req, res) {
  //   const { sightingId } = req.params;
  //   const { content } = req.body;
  //   try {
  //     // Create new comment
  //     const newComment = await this.commentModel.create({
  //       content: content,
  //       sightingId: sightingId,
  //     });
  //     // Respond with new comment
  //     return res.json(newComment);
  //   } catch (err) {
  //     return res.status(400).json({ error: true, msg: err });
  //   }
  // }
}

module.exports = BaseController;
