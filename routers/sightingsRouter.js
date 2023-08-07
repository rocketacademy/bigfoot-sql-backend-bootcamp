const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    // Sightings
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.put(
      "/:sightingId/edit",
      this.controller.editSighting.bind(this.controller)
    );
    router.post("/new", this.controller.createSighting.bind(this.controller));

    // Comments
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.createComment.bind(this.controller)
    );
    router.put("/comments", this.controller.editComment.bind(this.controller));
    router.delete(
      "/comments",
      this.controller.deleteComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
