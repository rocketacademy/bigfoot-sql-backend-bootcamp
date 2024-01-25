const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
		router.post("/", this.controller.addSighting.bind(this.controller))
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
		router.put("/:sightingId", this.controller.editOne.bind(this.controller))
		router.delete("/:sightingId", this.controller.deleteOne.bind(this.controller))
		router.get("/comment/:sightingId", this.controller.getComments.bind(this.controller))
		router.post("/comment/:sightingId", this.controller.addComment.bind(this.controller))
    return router;
  }
}

module.exports = SightingsRouter;
