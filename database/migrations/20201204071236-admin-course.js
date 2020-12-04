module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Board hasMany Post
    await queryInterface.createTable('Admin_Course', {
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admin_Course');
  },
};
