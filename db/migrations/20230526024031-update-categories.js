"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "createdAt");
    await queryInterface.removeColumn("categories", "updatedAt");
    await queryInterface.addColumn("categories", "created_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("categories", "updated_at", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("categories", "created_at");
    await queryInterface.removeColumn("categories", "updated_at");
    await queryInterface.addColumn("categories", "createdAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("categories", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },
};
