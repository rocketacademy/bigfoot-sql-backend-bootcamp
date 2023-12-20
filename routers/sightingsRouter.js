const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.createSigthing.bind(this.controller));
    router.put("/:sightingId", this.controller.editData.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.addComment.bind(this.controller)
    );
    router.put(
      "/:sightingId/comments/:commentId",
      this.controller.editComment.bind(this.controller)
    );
    router.delete(
      "/:sightingId/comments/:commentId",
      this.controller.deleteComment.bind(this.controller)
    );
    router.post(
      "/:sightingId/like",
      this.controller.addLike.bind(this.controller)
    );

    router.get(
      "/:sightingId/likes",
      this.controller.getLikes.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
