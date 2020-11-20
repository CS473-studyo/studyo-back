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
       number: 1,
     },
     {
       id: 2,
       course: 'CS473',
       number: 2,
     },
     {
       id: 3,
       course: 'CS473',
       number: 3,
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
    await queryInterface.bulkDelete('Lecture', null, {})
  }
};
