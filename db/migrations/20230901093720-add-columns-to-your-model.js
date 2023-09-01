'use strict';

module.exports = { // to add columns
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sightings', 'city', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your requirements
    });

    await queryInterface.addColumn('sightings', 'country', {
      type: Sequelize.STRING,
      allowNull: true, // or false, depending on your requirements
    });
  },

  //Down function to undo the the migration
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sightings', 'city');
    await queryInterface.removeColumn('sightings', 'country');
  },
};