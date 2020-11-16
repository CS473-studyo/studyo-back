'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'Lecture',
      'CourseId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Course', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )
    // .then(() => {
    //   // Student hasMany Payment
    //   return queryInterface.addColumn(
    //     'Lecture', // name of Target model
    //     'LectureId', // name of the key we're adding
    //     {
    //       type: Sequelize.INTEGER,
    //       references: {
    //         model: 'Lecture', // name of Source model
    //         key: 'id',
    //       },
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     },
    //   );
    // });
    // await queryInterface.createTable('Course_Lecture', {
    //   CourseId: {
    //     type: Sequelize.UUID,
    //     references: {
    //       model: 'Course',
    //       key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   LectureId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Lecture',
    //       key: 'id'
    //     },
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE',
    //   },
    //   createdAt: Sequelize.DATE,
    //   updatedAt: Sequelize.DATE,
    // });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'Lecture',
      'CourseId',
    )
    // .then(() => {
    //   // remove Student hasMany Payment
    //   return queryInterface.removeColumn(
    //     'Lecture', // name of the Target model
    //     'LectureId', // key we want to remove
    //   );
    // });
    // await queryInterface.dropTable('Course_Lecture');
  }
};
