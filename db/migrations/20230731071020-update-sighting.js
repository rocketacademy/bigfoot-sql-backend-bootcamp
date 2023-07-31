"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
      allowNull: true,
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
