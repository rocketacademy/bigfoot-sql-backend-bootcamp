const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // retrieve categories
    router.get("/", this.controller.getAllCategories.bind(this.controller));
    // create new categoris
    router.post("/", this.controller.createCategories.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
