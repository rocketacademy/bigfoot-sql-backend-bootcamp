'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('comment', 'comments', {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('comments', 'comment', {})
  }
};
