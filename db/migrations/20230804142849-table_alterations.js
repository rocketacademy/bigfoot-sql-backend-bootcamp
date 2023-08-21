"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("sightings", "location");
    await queryInterface.addColumn("sightings", "location_discription", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("sightings", "city", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("sightings", "country", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn("sightings", "location", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.removeColumn("sightings", "location_discription");
    await queryInterface.removeColumn("sightings", "city");
    await queryInterface.removeColumn("sightings", "country");
  },
};
