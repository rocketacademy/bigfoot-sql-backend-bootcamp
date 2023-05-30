const express = require("express");
const router = express.Router();

// '/' 'refers to localhost:8000/sightings
class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get(
      "/",
      this.controller.getAllSightingCategories.bind(this.controller)
    );
    router.post("/", this.controller.createSighting.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.createComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
