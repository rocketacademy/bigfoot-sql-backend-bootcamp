const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, categoryModel) {
    super(model);
		this.commentModel = commentModel
		this.categoryModel = categoryModel
  }


  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
			const sighting = await this.model.findOne({
				where: {
					id:sightingId
				},
				include: this.categoryModel
			});
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

	//check if user exists, then edit
  async editOne(req, res) {
		const { date, location, notes } = req.body
    const id = Number( req.params.sightingId )
		try{
			const sighting = await this.model.findByPk(id)
			if (!sighting) return res.status(404).send("The sighting does not exist")
			await this.model.update({date:date, location:location, notes:notes, updatedAt: new Date().toJSON()}, {
				where:{
					id:id
				}
			})
			return res.status(200).json({msg:"Updated successfully"})
		}catch(err){
			return res.status(400).json({error:true, msg:err})
		}
	}
	//check if user exists, then delete
  async deleteOne(req, res) {
    const id = Number( req.params.sightingId )
		try{
			const sighting = await this.model.findByPk(id)
			if (!sighting) return res.status(404).send("The sighting does not exist")
			await this.model.destroy({
				where:{
					id:id
				}
			})
			return res.status(200).send("The sighting record has been deleted")
		}catch(err){
			return res.status(400).json({error:true, msg:err})
		}
	}
	
	async addSighting(req,res){
		console.log(req.body)
		const { date, location, notes, categories} = req.body
		try{
			const newSighting = await this.model.create({
				date: new Date(date),
				location: location, 
				notes: notes, 
			})
			const selectedCategories = await this.categoryModel.findAll({
				where:{
					id: categories
				}
			})
			console.log("selectedCategories",selectedCategories)
			await newSighting.setCategories(selectedCategories)
			return res.status(200).send("The record was submitted successfully")
		}
		catch(err){
			return res.status(400).json({error:true, msg:err})
		}
	}

	//getComments
  async getComments(req, res) {
		const sightingId = Number( req.params.sightingId )
    try {
			const output = await this.commentModel.findAll({
				where:{
					sightingId:sightingId
				}
			});
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

	//addComment
	async addComment(req,res){
		const sightingId = Number( req.params.sightingId )
		console.log(req.body)
		const { content } = req.body
		try{
			await this.commentModel.create({
				content: content,
				sightingId: sightingId
			})
			return res.status(200).send("The comment was submitted successfully")
		}
		catch(err){
			return res.status(400).json({error:true, msg:err})
		}
	}

}

module.exports = SightingsController;
