"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sighting_categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SightingId: {
        type: Sequelize.INTEGER,
        references: {
          model: "sightings",
          key: "id",
        },
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sighting_categories");
  },
};
