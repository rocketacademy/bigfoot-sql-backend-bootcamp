const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/", this.controller.createCategory.bind(this.controller));
    router.get("/", this.controller.getAllCategories.bind(this.controller));
    // router.get(
    //   "/:sightingId/category",
    //   this.controller.getSightingCategory.bind(this.controller)
    // );
    return router;
  }
}

module.exports = CategoriesRouter;
