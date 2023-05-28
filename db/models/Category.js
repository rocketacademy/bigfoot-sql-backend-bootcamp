"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.sighting, {
        through: "sighting_categories",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
      allowNull: false,
      unique: true,
    }
  );
  return Category;
};
