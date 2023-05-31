"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Comments.belongsTo(models.sightings);
    }
  }
  Comments.init(
    {
      content: DataTypes.STRING,
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "sightings",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "comments",
      underscored: true,
    }
  );
  return Comments;
};
