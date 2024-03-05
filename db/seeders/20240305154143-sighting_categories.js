"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "sighting_categories",
      [
        {
          sighting_id: 1,
          category_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 1,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("sighting_categories", null, {});
  },
};
