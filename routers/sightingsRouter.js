const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));

    // 1-M
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.addNewComment.bind(this.controller)
    );

    router.post("/", this.controller.createSighting.bind(this.controller));
    router.put(
      "/:sightingId",
      this.controller.updateSighting.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
