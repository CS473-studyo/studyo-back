module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Board hasMany Post
    await queryInterface.createTable('Admin_Note', {
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      NoteId: {
        type: Sequelize.UUID,
        references: {
          model: 'Note',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Admin_Note');
  },
};
