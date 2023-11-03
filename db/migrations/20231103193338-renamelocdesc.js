'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.renameColumn('sightings', 'locationDescription', 'location_description')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('sightings', 'location_description', 'locationDescription')
  }
};
