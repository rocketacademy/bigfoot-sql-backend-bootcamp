"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting);
    }
  }
  like.init(
    {
      sightingId: {
        type: DataTypes.INTEGER,
        references: { model: "sightings", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "like",
      underscored: true,
    }
  );
  return like;
};
