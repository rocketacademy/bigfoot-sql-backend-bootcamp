const BaseController = require("./baseController");

class SightingsController extends BaseController {
  constructor(model, commentModel, likeModel,categoryModel) {
    super(model);
    this.commentModel = commentModel;
    this.likeModel = likeModel;
    this.categoryModel = categoryModel;

  }

  async getAll(req, res) {
    //const {sortBy, sortOrder, ...sightingFilters} = req.query
    try {
      const output = await this.model.findAll({include:this.categoryModel, order: ['id']});
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }


  // Retrieve specific sighting
  async getOne(req, res) {
    const { sightingId } = req.params;
    try {
      const sighting = await this.model.findByPk(sightingId, {include:this.categoryModel});
      return res.json(sighting);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async postOne(req, res) {
    const { date, locationDescription, notes, city, country, selectedCategoryIds } = req.body;
    if (!date || !locationDescription || !notes || !city || !country || !selectedCategoryIds) {
      res.status(400).json({ success: false, msg: 'input error' })
    }
    try {
      const newSighting = await this.model.create({
        date,
        locationDescription,
        notes,
        city,
        country,
      });
      const selectedCategories = await this.categoryModel.findAll({
        where:{
          id:selectedCategoryIds
        }
      })
      const associatedCategories = await newSighting.setCategories(selectedCategories)
      return res.json({ success: true, sighting: newSighting, associatedCategories })
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async putOne(req, res) {
    const { sightingId } = req.params;
    const { date, locationDescription, notes, city, country, selectedCategoryIds } = req.body;
    if (!date || !locationDescription || !notes || !city || !country || !selectedCategoryIds) {
      res.status(400).json({ success: false, msg: 'input error' })
    }  
    try {
      const sighting = await this.model.findByPk(sightingId);
      await sighting.update({
        date,
        locationDescription,
        notes,
        city,
        country
      })
      const selectedCategories = await this.categoryModel.findAll({
        where:{
          id:selectedCategoryIds
        }
      })
      const associatedCategories = await sighting.setCategories(selectedCategories)
      return res.json({ success: true, sighting: sighting, associatedCategories });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
  async getComments(req, res) {
    const { sightingId } = req.params;
    try {
      const comments = await this.commentModel.findAll({
        where: {sightingId}, // sightingId:sightingId
        order: ['createdAt']
      })
      console.log('found')
      return res.json({ success: true, comments: comments});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async newComment(req, res) {
    const { sightingId } = req.params;
    const { content } = req.body;
    try {
      const sighting = await this.model.findByPk(sightingId);
      const newComment = await sighting.createComment({content}) // figure if there's a way to eager loading this
      
      return res.json({ success: true, newComment});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editComment(req, res) {
    const { sightingId, commentId } = req.params;
    const { content } = req.body;
    console.log(content)
    try {
      const editedComment = await this.commentModel.update({content:content},{
        where:{
          id:commentId,
          sightingId:sightingId, 
        },
        returning:true,
      }) 
      console.log(editedComment)
      return res.json({ success: true, editedComment});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteComment(req, res) {
    const { sightingId, commentId } = req.params;
    try {
      //const deletedComment = 
      await this.commentModel.destroy({
        where:{
          sightingId:parseInt(sightingId), 
          id:parseInt(commentId)
        }
      }) 
      
      return res.json({ success: true});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async getLikes(req, res) {
    const { sightingId } = req.params;
    try {
      const likes = await this.likeModel.findAll({
        where: {sightingId}, // sightingId:sightingId
      })
      return res.json({ success: true, likes});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //router.put("/:sightingId/likes", this.controller.toggleLike.bind(this.controller))
  async postLike(req, res) {
    const { sightingId } = req.params;
    const { userId } = req.body; //rmb to chg frontend to user
    try {
      const newLike = await this.likeModel.create({
        userId,
        sightingId,
      });
      return res.json({ success: true, newLike });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async deleteLike(req, res) {
    const { sightingId, userId } = req.params;
    try {
      await this.likeModel.destroy({
        where:{
          sightingId, 
          userId
        }
      }) 
      return res.json({success: true});
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

}

module.exports = SightingsController;
