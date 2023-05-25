const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    // Add routes here
    router.get("/", this.controller.getAllCategories.bind(this.controller));
    router.post("/", this.controller.addCategory.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
