const models = require('../models');

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
    await models.Course.bulkCreate([
      {
        name: 'Social Computing',
        professor: 'Juho Kim',
        code: 'CS473',
      },
      {
        name: 'Social Computing 2',
        professor: 'Juho Kim 2',
        code: 'CS472',
      },
      {
        name: 'Social Computing 3',
        professor: 'Juho Kim 3',
        code: 'CS475',
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
