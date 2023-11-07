"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sighting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sighting.hasMany(models.comment) // 'comment' is taken from the modelName
      Sighting.hasMany(models.like) // 'comment' is taken from the modelName
    }
  }
  Sighting.init(
    {
      date: DataTypes.DATE,
      locationDescription: DataTypes.STRING,
      notes: DataTypes.TEXT,
      city: DataTypes.STRING,
      country:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
    }
  );
  return Sighting;
};
