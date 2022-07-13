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
      this.belongsTo(models.sighting);
    }
  }
  Comment.init(
    {
      content: DataTypes.STRING,
      SightingId: {
        type: DataTypes.INTEGER,
        references: {
          // Sequelize docs suggest this should be plural table name and not singular model name
          // https://sequelize.org/api/v6/class/src/model.js~model#static-method-init
          model: "sightings",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "comment",
      underscored: true
    }
  );
  return Comment;
};
