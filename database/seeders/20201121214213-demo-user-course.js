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

    const user = await models.User.findOne({
      where: { email: 'test' },
    });

    const courses = await models.Course.findAll();

    return Promise.all(
      courses.map((course) =>
        queryInterface.bulkInsert('User_Course', [
          {
            UserId: user.id,
            CourseId: course.id,
          },
        ])
      )
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User_Course', null, {});
  },
};
