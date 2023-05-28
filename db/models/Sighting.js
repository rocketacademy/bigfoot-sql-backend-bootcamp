"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sighting extends Model {
    static associate(models) {
      this.hasMany(models.comment);
      this.belongsToMany(models.category, { through: "sighting_categories" });
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
      modelName: "sighting",
      underscored: true,
    }
  );
  return Sighting;
};
