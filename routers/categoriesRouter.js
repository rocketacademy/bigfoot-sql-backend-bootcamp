const express = require('express');
const router = express.Router();

class CategoriesRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    // we will insert routes into here later on
    router.get('/', this.controller.getAll);
    router.post('/:categoriesId', this.controller.createCategory);
    router.put('/:categoriesId', this.controller.editCategory);
    return router;
  };
}

module.exports = CategoriesRouter;

//Create a new router file named categoriesRouter.js, model the sightingsRouter.js, create two requests, one a GET route to /categories to retrieve categories and a POST route to /categories to create a new category, the post route should read the category name from req.body.name. Ensure you bind these requests to the correct controller methods that you have just defined.
