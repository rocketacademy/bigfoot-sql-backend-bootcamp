"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Rain",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Mountain",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Woods",
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
