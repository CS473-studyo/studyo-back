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

    const course = await models.Course.findOne({
      where: { code: 'CS473' },
    });

    const CourseId = course.id;

    return models.Lecture.bulkCreate([
      {
        CourseId,
        number: 1,
        date: '2020 Aug. 8',
      },
      {
        CourseId,
        number: 2,
        date: '2020 Aug. 10',
      },
      {
        CourseId,
        number: 3,
        date: '2020 Aug. 15',
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
