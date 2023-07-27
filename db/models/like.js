"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.sighting);
    }
  }
  Like.init(
    {
      likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
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
      modelName: "like",
      underscored: true,
    }
  );
  return Like;
};
