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
      "categories",
      [
        { name: "Rainy", created_at: new Date(), updated_at: new Date() },
        { name: "Sunny", created_at: new Date(), updated_at: new Date() },
        { name: "Cloudy", created_at: new Date(), updated_at: new Date() },
        { name: "Snowy", created_at: new Date(), updated_at: new Date() },
        { name: "Day", created_at: new Date(), updated_at: new Date() },
        { name: "Night", created_at: new Date(), updated_at: new Date() },
        { name: "City", created_at: new Date(), updated_at: new Date() },
        { name: "Woods", created_at: new Date(), updated_at: new Date() },
        { name: "Mountains", created_at: new Date(), updated_at: new Date() },
        { name: "Jungle", created_at: new Date(), updated_at: new Date() },
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
