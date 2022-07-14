const express = require('express')
const router = express.Router()

class CategoriesRouter {
    constructor(controller){
        this.controller = controller
    }
    routes(){
        // we will insert routes into here later on
        router.get('/', this.controller.getAll.bind(this.controller))
        router.get('/:sightingId', this.controller.getOne.bind(this.controller))
        return router
    }
}

module.exports = CategoriesRouter