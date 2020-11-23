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
      where: { code: 'CS101' },
    });

    const CourseId = course.id;

    return models.Lecture.bulkCreate([
      {
        CourseId,
        number: 1,
        date: '2020 Sep. 7',
      },
      {
        CourseId,
        number: 2,
        date: '2020 Sep. 14',
      },
      {
        CourseId,
        number: 3,
        date: '2020 Sep. 21',
      },
      {
        CourseId,
        number: 4,
        date: '2020 Sep. 28',
      },
      {
        CourseId,
        number: 5,
        date: '2020 Oct. 5',
      },
      {
        CourseId,
        number: 6,
        date: '2020 Oct. 26',
      },
      {
        CourseId,
        number: 7,
        date: '2020 Nov. 2',
      },
      {
        CourseId,
        number: 8,
        date: '2020 Nov. 9',
      },
      {
        CourseId,
        number: 9,
        date: '2020 Nov. 16',
      },
      {
        CourseId,
        number: 10,
        date: '2020 Nov. 23',
      },
      {
        CourseId,
        number: 11,
        date: '2020 Nov. 30',
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
