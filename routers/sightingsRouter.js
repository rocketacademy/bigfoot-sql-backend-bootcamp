const express = require('express');
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes = () => {
    // we will insert routes into here later on
    router.get('/', this.controller.getAll);
    router.get('/:sightingId', this.controller.getOne);
    router.post('/newSighting', this.controller.createOne);
    router.put('/sightingCat', this.controller.associateCategories);
    router.get('/cat/:sightingId', this.controller.getSightingsWithCat);
    return router;
  };
}

module.exports = SightingsRouter;
