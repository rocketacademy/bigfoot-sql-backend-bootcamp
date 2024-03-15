const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAllSightings.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getAllCommentsBySightingId.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.insertOneComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
