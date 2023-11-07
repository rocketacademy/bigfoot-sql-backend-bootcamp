'use strict';

/*Add associations and foreign key declarations to Sighting and Comment models. 
Review Update models and migrations section of Sequelize 1-M Relationships submodule for a refresher.
Add foreign key declaration to comment migration by adding the references attribute to sighting_id.
Comment should have content and SightingId attributes, where content can be text data type and SightingId can be integer.
*/

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
      },
      sighting_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model:'sightings',
          key:'id',
        }
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comment');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
