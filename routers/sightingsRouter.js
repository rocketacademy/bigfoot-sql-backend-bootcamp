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
    router.post("/newsighting", this.controller.postOne.bind(this.controller));
    router.put("/editsighting/:sightingId", this.controller.editOne.bind(this.controller));
    router.delete("/:sightingId", this.controller.deleteOne.bind(this.controller));

    //router for getting all comments for one sighting
    router.get("/:sightingId/comments", this.controller.getComments.bind(this.controller));

    //router for creating comments for sighting
    router.post("/:sightingId/comments", this.controller.insertOneComment.bind(this.controller));
    return router;
  }
}

module.exports = SightingsRouter;
