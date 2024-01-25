const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model) {
    super(model);
  }

  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId);
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
		const { date, location, notes} = req.body
		try{
			await this.model.create({
				date: new Date(date),
				location: location, 
				notes: notes, 
			})
			return res.status(200).send("The record was submitted successfully")
		}
		catch(err){
			return res.status(400).json({error:true, msg:err})
		}
	}
}

module.exports = SightingsController;
