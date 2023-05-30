"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sightings_categories", "createdAt");
    await queryInterface.removeColumn("sightings_categories", "updatedAt");
    await queryInterface.addColumn("sightings_categories", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("sightings_categories", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sightings_categories", "created_at");
    await queryInterface.removeColumn("sightings_categories", "updated_at");
    await queryInterface.addColumn("sightings_categories", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("sightings_categories", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
