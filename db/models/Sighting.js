"use strict";
const { Model } = require("sequelize");
const Category = require("./category");
module.exports = (sequelize, DataTypes) => {
  class Sighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.comment);
      this.belongsToMany(Category, { through: sighting_categories });
    }
  }
  Sighting.init(
    {
      date: DataTypes.DATE,
      location: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      //this will define the name of the model.
      modelName: "sighting",
      underscored: true,
    }
  );
  return Sighting;
};
