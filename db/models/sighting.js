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
      this.belongsToMany(models.category, { through: "sighting_categories" });
    }
  }
  Sighting.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      location: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
      timestamps: true,
    }
  );
  return Sighting;
};
