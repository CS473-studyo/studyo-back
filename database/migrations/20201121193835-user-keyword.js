'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Board hasMany Post
    await queryInterface.createTable('User_Keyword', {
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: 'User',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      KeywordId: {
        type: Sequelize.UUID,
        references: {
          model: 'Keyword',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Keyword');
  },
};
