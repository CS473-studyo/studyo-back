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
    await queryInterface.bulkInsert('Course', [
      {
        id: 1,
        name: 'social computing',
        prof: 'Juho Kim',
        code: 'CS473',
      },
      {
        id: 2,
        name: 'social computing2',
        prof: 'Juho Kim2',
        code: 'CS4732',
      },
      {
        id: 'CS444',
        name: 'social computing2',
        prof: 'Juho Kim2',
        code: 'CS4732',
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
    await queryInterface.bulkDelete('Course', null, {});
  },
};
