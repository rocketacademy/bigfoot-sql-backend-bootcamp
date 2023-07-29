"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sighting_category extends Model {
    static associate(models) {}
  }
  Sighting_category.init(
    {
      sighting_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "sighting",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "sighting_category",
      underscored: true,
    }
  );
  return Sighting_category;
};
