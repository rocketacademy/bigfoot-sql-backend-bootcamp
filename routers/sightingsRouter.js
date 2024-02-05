const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get(
      "/:sightingId/comments",
      this.controller.getSightingComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.postSightingComment.bind(this.controller)
    );

    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.postSighting.bind(this.controller));

    return router;
  }
}

module.exports = SightingsRouter;
