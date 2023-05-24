"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          content: "Great story!",
          commentor: "smallfoot",
          sighting_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          content: "That's scary. Glad you made it out safe",
          commentor: "parkranger92",
          sighting_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
