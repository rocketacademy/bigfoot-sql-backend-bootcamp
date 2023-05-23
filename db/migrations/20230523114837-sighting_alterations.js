"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn("sightings", "city_town", {
      type: Sequelize.STRING,
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
    await queryInterface.removeColumn("sightings", "country");
    await queryInterface.removeColumn("sightings", "city_town");
    await queryInterface.renameColumn(
      "sightings",
      "locationDescription",
      "location"
    );
  },
};
