module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Note', 'pdf', {
        type: Sequelize.STRING,
      }),
      queryInterface.removeColumn('Note', 'page'),
      queryInterface.removeColumn('Note', 'image'),
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
      queryInterface.removeColumn('Note', 'pdf'),
      queryInterface.addColumn('Note', 'page', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Note', 'image', {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
