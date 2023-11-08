'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.sighting, { foreignKey: 'sightingId' });
    }
  }
  comments.init(
    {
      content: DataTypes.STRING,
      sightingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sighting',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'comments',
      timestamps: true,
      underscored: true,
    }
  );
  return comments;
};
