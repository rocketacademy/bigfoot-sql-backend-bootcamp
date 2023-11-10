const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller)); // sets this.controller as the bound this parameter
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post("/", this.controller.postOne.bind(this.controller));
    router.put("/:sightingId", this.controller.putOne.bind(this.controller))
    router.get("/:sightingId/comments", this.controller.getComments.bind(this.controller));
    router.post("/:sightingId/comments", this.controller.newComment.bind(this.controller));
    router.put("/:sightingId/comments/:commentId", this.controller.editComment.bind(this.controller))
    router.delete("/:sightingId/comments/:commentId", this.controller.deleteComment.bind(this.controller))
    router.get("/:sightingId/likes", this.controller.getLikes.bind(this.controller))
    router.post("/:sightingId/likes", this.controller.postLike.bind(this.controller))
    router.delete("/:sightingId/likes/:userId", this.controller.deleteLike.bind(this.controller))
    //one more route to get all likes for all filtered sightings?
    return router;
  }
}

module.exports = SightingsRouter;
