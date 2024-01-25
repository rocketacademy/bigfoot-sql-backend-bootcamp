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
      // sighting (one) to many (comment)
      // comment is many
      this.belongsTo(models.sighting);
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
      //captial S in singing.js
      SightingId: {
        type: DataTypes.INTEGER,
        references: {
          //table must be plurul
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true,
    }
  );
  return Comment;
};
