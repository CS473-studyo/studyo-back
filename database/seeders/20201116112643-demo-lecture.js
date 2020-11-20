'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Lecture', [
      {
        id: 1,
        course: 'CS473',
        num: 1,
        date: 'Aug. 8',
        keyword: '0,1,2',
      },
      {
        id: 2,
        course: 'CS473',
        num: 2,
        date: 'Aug. 10',
        keyword: '0,1,2',
      },
      {
        id: 3,
        course: 'CS473',
        num: 3,
        date: 'Aug. 15',
        keyword: '0,1,2',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Lecture', null, {});
  },
};
