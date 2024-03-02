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
      "location_description"
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("sightings", "city");
    await queryInterface.removeColumn("sightings", "country");
    await queryInterface.renameColumn(
      "sightings",
      "location_description",
      "location"
    );
  },
};
