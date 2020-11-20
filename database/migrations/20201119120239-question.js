'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Question', { 
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      detail: Sequelize.STRING,
      userId: Sequelize.STRING,
      lecture: Sequelize.INTEGER, });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Question");
  }
};
