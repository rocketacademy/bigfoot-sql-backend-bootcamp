'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('sightings', 'city', {
        allowNull: false,
        defaultValue:'-',
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('sightings', 'country', {
        allowNull: false,
        defaultValue:'-',
        type: Sequelize.STRING
      }),
      queryInterface.renameColumn('sightings', 'location', 'locationDescription')
    ])
  },

  async down (queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('sightings', 'city', {}),
      queryInterface.removeColumn('sightings', 'country', {}),
      queryInterface.renameColumn('sightings', 'locationDescription', 'location')
    ])
  }
};
