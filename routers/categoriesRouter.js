const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller)); // sets this.controller as the bound this parameter
    router.post("/", this.controller.postOne.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
