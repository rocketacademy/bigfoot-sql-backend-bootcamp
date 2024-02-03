const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.post(
      "/sightings",
      this.controller.addSighting.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
