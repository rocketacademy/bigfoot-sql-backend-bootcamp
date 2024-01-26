"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Sunny Day",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Rainy Day",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Earthquake",
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
