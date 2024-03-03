const express = require("express");
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    console.log("router");
    router.post("/", this.controller.createCategory.bind(this.controller));
    router.get("/", this.controller.getAll.bind(this.controller));
    return router;
  }
}

module.exports = CategoriesRouter;
