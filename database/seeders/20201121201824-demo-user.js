const models = require('../models');
const { hashed, getRandomString } = require('../../utils/crypto');

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
    const salt = getRandomString(16);
    const password = hashed('test', salt);
    return models.User.create({
      email: 'test',
      salt,
      password,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await models.User.destroy({
      where: { email: 'test' },
    });
  },
};
