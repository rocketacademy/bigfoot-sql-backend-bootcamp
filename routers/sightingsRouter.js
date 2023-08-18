const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/new", this.controller.insertOne.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    // router.put("/:sightingId", this.controller.updateOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.insertOneComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
