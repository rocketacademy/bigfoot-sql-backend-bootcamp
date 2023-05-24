"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      Comments.belongsTo(models.sightings);
    }
  }
  Comments.init(
    {
      content: DataTypes.STRING,
      commentor: DataTypes.STRING,
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comments",
      underscored: true,
    }
  );
  return Comments;
};
