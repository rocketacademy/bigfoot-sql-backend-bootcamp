"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sighting_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sighting_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "sightings",
          },
          key: "id",
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
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

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("sighting_categories");
  },
};
