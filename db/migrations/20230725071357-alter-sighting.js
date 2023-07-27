"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
    });

    await queryInterface.renameColumn(
      "sightings",
      "location",
      "location_description"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "sightings",
      "location_description",
      "location"
    );
    await queryInterface.removeColumn("sightings", "country");
    await queryInterface.removeColumn("sightings", "city");
  },
};
