'use strict';

const fs = require('fs')
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = JSON.parse(fs.readFileSync("./data/users.json", 'utf-8')).map((user) => {
      user.createdAt = user.updatedAt = new Date();
      const salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      delete user.id
      return user
    })

    return queryInterface.bulkInsert('Users', users)
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  }
};
