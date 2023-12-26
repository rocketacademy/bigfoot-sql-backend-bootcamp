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
      this.hasMany(models.comment);
      this.hasMany(models.like);
      this.belongsToMany(models.category, { through: models.sightingcategory });
      this.hasMany(models.sightingcategory);
    }
  }
  Sighting.init(
    {
      date: DataTypes.DATE,
      locationDescription: DataTypes.STRING,
      notes: DataTypes.TEXT,
      city: DataTypes.TEXT,
      country: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
    }
  );
  return Sighting;
};
