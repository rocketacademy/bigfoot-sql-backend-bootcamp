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
    return router;
  }
}

module.exports = SightingsRouter;
