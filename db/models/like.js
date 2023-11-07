"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      Like.belongsTo(models.sighting)
    }
  }
  Like.init(
      {
          username: DataTypes.TEXT,
          sightingId: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: 'sighting',
                  key: 'id',
              }
          }
      },
    {
      sequelize,
      modelName: "like",
      underscored: true,
    }
  );
  return Like;
};