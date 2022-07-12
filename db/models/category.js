"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.sighting, { through: "sightingCategories" });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      underscoreed: true
    }
  );
  return category;
};
