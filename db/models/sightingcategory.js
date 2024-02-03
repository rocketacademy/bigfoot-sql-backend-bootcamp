"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SightingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  SightingCategory.init(
    {
      intensity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sightingcategory",
      underscored: true,
    }
  );
  return SightingCategory;
};
