"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Dark sky",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bright sky",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cloudy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sunny",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rainy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mountain",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Woods",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Town",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Near (<10m)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mid-distance (<100m)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Far (>100m)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
