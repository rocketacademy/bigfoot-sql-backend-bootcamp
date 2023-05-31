/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "mountains",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "rain",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "woods",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
