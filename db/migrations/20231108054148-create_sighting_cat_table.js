'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sightings_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sighting_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'sightings',
          key:'id',
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'categories',
          key:'id',
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sightings_categories');
  }
};
