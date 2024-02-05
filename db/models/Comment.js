"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting);
      // define association here
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      SightingId: {
        type: DataTypes.INTEGER,
        references: {
          //Table name is being used here, in accordance to the sequelize documentation
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      //this will define the name of the model.
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};
