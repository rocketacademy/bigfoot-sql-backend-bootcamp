"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "rain",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "fog",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "snow",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "mountain",
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
