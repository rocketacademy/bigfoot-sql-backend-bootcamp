const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/categories", this.controller.getAll.bind(this.controller));
    router.post("/categories", this.controller.insertCategories.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
