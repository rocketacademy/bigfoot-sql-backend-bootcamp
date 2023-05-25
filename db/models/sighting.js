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
      this.hasMany(models.comment);
      this.hasMany(models.like);
      this.belongsToMany(models.category, { through: "sighting_categories" });
    }
  }
  Sighting.init(
    {
      date: DataTypes.DATE,
      country: DataTypes.STRING,
      cityTown: DataTypes.STRING,
      locationDescription: DataTypes.STRING,
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
