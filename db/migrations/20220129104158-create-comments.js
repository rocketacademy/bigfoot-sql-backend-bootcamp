"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      //A sighting can have many comments. A comment can only have 1 sighting. In 1-M relationships, the foreign id exists in the "Many" table. Aka, the comment table.
      sighting_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sightings",
          key: "id",
        },
      },

      content: {
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("comments");
  },
};
