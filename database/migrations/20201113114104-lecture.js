'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Lecture', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      course: Sequelize.STRING,
      number: Sequelize.STRING,
      salt: Sequelize.STRING, });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Lecture");
  }
};
