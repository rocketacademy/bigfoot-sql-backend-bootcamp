"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "Wow I can't believe it",
          sighting_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "First",
          sighting_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
