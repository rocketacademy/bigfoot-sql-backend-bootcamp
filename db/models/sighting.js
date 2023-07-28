"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sighting extends Model {
    static associate(models) {
      this.hasMany(models.comment);
      this.belongsToMany(models.category, { through: "sightingCategories" });
      this.hasMany(models.like);
    }
  }
  Sighting.init(
    {
      date: DataTypes.DATE,
      locationDescription: DataTypes.STRING,
      notes: DataTypes.TEXT,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
    }
  );
  return Sighting;
};
