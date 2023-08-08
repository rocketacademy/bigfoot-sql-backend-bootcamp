"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Sighting extends Model {
    static associate(models) {
      // define association here
      Sighting.hasMany(models.Comment, {
        foreignKey: "sighting_id",
        as: "comments",
      });

      Sighting.belongsToMany(models.Category, {
        through: "sighting_categories",
        foreignKey: "sighting_id",
        as: "categories",
      });
    }
  }

  Sighting.init(
    {
      date: DataTypes.DATE,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      locationDescription: DataTypes.STRING,
      notes: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Sighting",
      underscored: true,
    }
  );

  return Sighting;
};
