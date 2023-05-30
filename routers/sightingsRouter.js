const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    // by binding controllers here, we don't have to use arrow function in the controllers
    // if we use an arrow function in routes, we don't have to bind, but we need arrow funcs in controllers
    router.get("/", this.controller.getFiltered.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));
    router.get("/:id", this.controller.getOne.bind(this.controller));
    router.get(
      "/:id/comments",
      this.controller.getComments.bind(this.controller)
    );
    router.post(
      "/:id/comments",
      this.controller.postComment.bind(this.controller)
    );
    return router;
  }
}

module.exports = SightingsRouter;
