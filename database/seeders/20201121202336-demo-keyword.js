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

    const lectures = await models.Lecture.findAll();

    return Promise.all(
      lectures.map((lecture) =>
        models.Keyword.bulkCreate([
          {
            UserId: user.id,
            LectureId: lecture.id,
            word: 'key1',
          },
          {
            UserId: user.id,
            LectureId: lecture.id,
            word: 'key2',
          },
          {
            UserId: user.id,
            LectureId: lecture.id,
            word: 'key3',
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
    await queryInterface.bulkDelete('Keyword', null, {});
  },
};
