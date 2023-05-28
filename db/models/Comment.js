"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.sighting);
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      sighting_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};
