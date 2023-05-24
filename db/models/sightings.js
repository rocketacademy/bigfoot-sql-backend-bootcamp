"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sightings extends Model {
    static associate(models) {
      Sightings.hasMany(models.comments);
    }
  }
  Sightings.init(
    {
      month: DataTypes.STRING,
      year: DataTypes.INTEGER,
      location: DataTypes.STRING,
      season: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "sightings",
      underscored: true,
    }
  );
  return Sightings;
};
