'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "rain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "mountain",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "woods",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sightings", null, {});
  }
};
