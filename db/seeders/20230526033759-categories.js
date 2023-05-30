"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "rainy", created_at: new Date(), updated_at: new Date() },
        { name: "sunny", created_at: new Date(), updated_at: new Date() },
        { name: "cloudy", created_at: new Date(), updated_at: new Date() },
        { name: "snowy", created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
