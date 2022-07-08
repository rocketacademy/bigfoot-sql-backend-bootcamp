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
    }
  );
  return Sighting;
};
