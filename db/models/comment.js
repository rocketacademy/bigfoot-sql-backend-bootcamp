"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.sighting, { foreignKey: "sightingId" });
    }
  }
  comment.init(
    {
      content: DataTypes.STRING,
      sighting_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return comment;
};
