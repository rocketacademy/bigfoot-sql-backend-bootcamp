const BaseController = require("./baseController");

class CategoriesController extends BaseController {
	constructor(model) {
		super(model);
	}
	
	async addCategory(req, res) {
		console.log(req.body);
		const { name } = req.body;
		//check if input category is existing if it exists, return the category, if not, create
		try {
			const [category, created] = await this.model.findOrCreate({
				where: { name: name },
			});
			return res.json(category)
		} catch (err) {
			return res.status(400).json({ error: true, msg: err });
		}
	}
}
module.exports = CategoriesController;
