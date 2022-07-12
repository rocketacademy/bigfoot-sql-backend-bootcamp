"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Dark sky",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bright sky",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cloudy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Sunny",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Rainy",
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
      {
        name: "City",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Town",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Near (<10m)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mid-distance (<100m)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Far (>100m)",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
