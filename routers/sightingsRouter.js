const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.add);

    //comments
    //get
    router.get("/:sightingId/comments", this.controller.getComments);
    //post
    router.post("/:sightingId/comments", this.controller.insertComment);

    //sightings
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    //delete
    router.put("/:sightingId", this.controller.edit);
    //delete
    router.delete("/:sightingId", this.controller.delete);

    //comments
    //get
    router.get("/:sightingId/comments", this.controller.getComments);
    //post
    router.post(
      "/:sightingId/comments",
      this.controller.insertComment.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
