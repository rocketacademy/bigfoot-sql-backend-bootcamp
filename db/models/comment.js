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
      // define association here
      Comment.belongsTo(models.sighting)
    }
  }
  Comment.init(
      {
          content: DataTypes.TEXT,
          sightingId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: 'sighting',
                  key: 'id',
              }
          }
      },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};
