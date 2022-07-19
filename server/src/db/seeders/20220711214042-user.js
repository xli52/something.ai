"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "Amy Heisenberg",
          password:
            "$2a$10$XLdY7cRuH19aG3c9.NLvTuTYMxwv6y1dsJ2r9CqTfIbu6U.acSi8W", //123
          email: "a@a.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "John Doe",
          password:
            "$2a$10$68wXbfzS9LBLA8/XLs4V/OSz3bUitTp5wXpsfm802S0douO7Aqseu", //123
          email: "b@b.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("users", null, {});
  },
};
