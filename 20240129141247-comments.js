"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sightings",
      [
        {
          sighting_id: 1,
          content: "Man that's crazy",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 2,
          content: "i miss my wife",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          sighting_id: 3,
          content: "sign up dragcave today link is www.dragcave.com",
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
  },
};
