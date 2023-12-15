"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.TEXT,
    });
    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.TEXT,
    });
    await queryInterface.renameColumn(
      "sightings",
      "location",
      "locationDescription"
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("sightings");
  },
};
