"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Sighting);
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      SightingId: {
        type: DataTypes.INTEGER,
        references: {
          // TODO(kai): Test if singular works
          model: "Sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
