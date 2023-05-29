"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "sighting_categories",
      [
        {
          sighting_id: 1,
          category_id: 2,
          intensity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 1,
          category_id: 5,
          intensity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 2,
          intensity: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          category_id: 5,
          intensity: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 2,
          intensity: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          category_id: 6,
          intensity: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("sighting_categories", null, {});
  },
};
