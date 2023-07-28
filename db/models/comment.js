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
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "sighting",
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
