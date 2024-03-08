'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('sighting_categories', 'created_at');
    await queryInterface.removeColumn('sighting_categories', 'updated_at');
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('sighting_categories', 'created_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('sighting_categories', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
