const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getCategory.bind(this.controller));
    router.post("/", this.controller.createCategory.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
