"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SightingCategories extends Model {
    static associate(models) {
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  SightingCategories.init(
    {
      intensity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sightingCategories",
      underscored: true,
    }
  );
  return SightingCategories;
};
