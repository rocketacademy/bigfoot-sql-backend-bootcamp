const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/", this.controller.getCategories.bind(this.controller));
    router.post("/", this.controller.createCategory.bind(this.controller));

    return router;
  }
}

module.exports = CategoriesRouter;
