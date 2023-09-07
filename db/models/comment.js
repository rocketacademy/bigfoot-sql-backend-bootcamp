'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Sighting, {
        foreignKey: 'sighting_id',
        as: 'sighting',
      });
    }
  }

  Comment.init(
    {
      content: DataTypes.STRING,
      sightingId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'sightings', // name of your table in database
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      underscored: true,
    }
  );

  return Comment;
};
