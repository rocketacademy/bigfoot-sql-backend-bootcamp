"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          category_name: "Debunked",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Plausible",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "True",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Sunny",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Night",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          category_name: "Cloudy",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
