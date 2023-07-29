const express = require("express");
const router = express.Router();

// '/' 'refers to localhost:8000/categories
class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.createCategory.bind(this.controller));
    router.post(
      "/create",
      this.controller.createSightingCategory.bind(this.controller)
    );
    /*
    router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    router.get(
      "/:sightingId/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:sightingId/comments",
      this.controller.createComment.bind(this.controller)
    );
    */
    return router;
  }
}

module.exports = CategoriesRouter;
