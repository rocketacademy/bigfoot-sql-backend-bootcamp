const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model);
   
  }
 

async postOneCat(request, response) {
  console.log("Posting category");

  // Example body:
    // {
    //   "category":"Cat1"
    // }

    const category_name = request.body.category;
    
    
    try {
      const newCategory = await this.model.create({
        category_name: category_name,
        created_at: new Date(),
        updated_at: new Date(),
      });

      
      return response.json(newCategory);
      } catch (err) {
        return response.status(500).json({ error: true, msg: err.message });
      }
  }
}

module.exports = CategoriesController;
