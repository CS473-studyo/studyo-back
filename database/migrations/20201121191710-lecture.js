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
      CourseId: {
        type: Sequelize.UUID,
        references: {
          model: 'Course',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      number: Sequelize.INTEGER,
      pdf: Sequelize.STRING,
      date: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Lecture');
  },
};
