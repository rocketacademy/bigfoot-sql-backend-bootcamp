const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.addOne.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.put("/:sightingId", this.controller.updateOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getAllComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.addComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
