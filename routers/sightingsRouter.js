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
    router.put(
      "/:sightingId/comments/:commentId",
      this.controller.editComment.bind(this.controller)
    );
    router.delete(
      "/:sightingId/comments/:commentId",
      this.controller.deleteComment.bind(this.controller)
    );
    router.get(
      "/:sightingId/likes",
      this.controller.getAllLikes.bind(this.controller)
    );
    router.get(
      "/:sightingId/likes/count",
      this.controller.getLikesCount.bind(this.controller)
    );
    router.post(
      "/:sightingId/likes",
      this.controller.addLike.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
