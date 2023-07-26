const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll);
    router.get("/:sightingId", this.controller.getOne);
    router.get("/:sightingId/comments", this.controller.getAllComments);
    router.post("/", this.controller.add);
    router.post("/:sightingId/comments", this.controller.addComment);
    router.put("/:sightingId", this.controller.editSighting);
    router.put("/:sightingId/comments/:commentId", this.controller.editComment);
    router.delete("/:sightingId/comments/:commentId", this.controller.deleteComment);
    return router;
  };
}

module.exports = SightingsRouter;
