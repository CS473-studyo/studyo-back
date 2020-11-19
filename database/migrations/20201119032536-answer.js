'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Answer', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      question: Sequelize.STRING,
      user: Sequelize.STRING,
      content: Sequelize.STRING,
      clap: Sequelize.INTEGER,
      salt: Sequelize.STRING, });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Answer");

  }
};
