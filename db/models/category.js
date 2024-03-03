"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      console.log(models.sighting_categories); // Should log the sighting_categories model

      // define association here
      this.belongsToMany(models.sighting, {
        through: "sighting_categories",
      });
    }
  }
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
      underscored: true,
    }
  );
  return Category;
};
