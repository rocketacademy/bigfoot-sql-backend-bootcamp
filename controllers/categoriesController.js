const BaseController = require("./baseController");

class CategoriesController extends BaseController {
  constructor(model) {
    super(model); //inhertiance from base controller
    //get all category is completed in Base controller

    //post cat
    //the post route should read the category name from req.body.name
  }
  add = async (req, res) => {
    const { name } = req.body;
    try {
      //check if "input" is === current category, if yes, return the catergory.
      //if not create a new category
      //created is a boolean
      // true = created during this operation
      // false = category
      const [category, created] = await this.model.findOrCreate({
        where: {
          name: name,
        },
      });
      // Respond to the user
      return res.send(category);
    } catch (error) {
      console.error("Error adding sighting:", error);
    }
  };
}

module.exports = CategoriesController;
