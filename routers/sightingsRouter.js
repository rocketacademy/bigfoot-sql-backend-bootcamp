const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.createOne.bind(this.controller));
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.put("/:sightingId", this.controller.editOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.createComment.bind(this.controller)
    );

    router.get(
      "/:sightingId/categories",
      this.controller.getCategories.bind(this.controller)
    );

    return router;
  }
}

module.exports = SightingsRouter;
