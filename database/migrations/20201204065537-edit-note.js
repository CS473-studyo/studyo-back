module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Note', 'page', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Note', 'text', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Note', 'page'),
      queryInterface.removeColumn('Note', 'text'),
    ]);
  },
};
