const express = require("express");
const router = express.Router();

class CommentsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get(
      "/:sightingId",
      this.controller.getBySightingId.bind(this.controller)
    );
    router.post("/", this.controller.createComment.bind(this.controller));
    return router;
  }
}

module.exports = CommentsRouter;
