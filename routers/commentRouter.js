const express = require('express');
const router = express.Router();

class CommentRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    // we will insert routes into here later on
    router.get('/', this.controller.getAll);
    router.post('/create', this.controller.createOne);
    router.put('/:commentId', this.controller.editOne);
    router.delete('/:commentId', this.controller.deleteOne);
    return router;
  };
}

module.exports = CommentRouter;
