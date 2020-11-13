'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Quiz', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      content: Sequelize.STRING,
      author: Sequelize.STRING,
      lecture: Sequelize.STRING,
      salt: Sequelize.STRING, });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Quiz");

  }
};
