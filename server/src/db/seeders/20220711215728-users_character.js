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
      "users_characters",
      [
        {
          user_id: 1,
          character_id: 1,
          unlocked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          character_id: 2,
          unlocked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          character_id: 1,
          unlocked: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          character_id: 2,
          unlocked: true,
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
    await queryInterface.bulkDelete("users_characters", null, {});
  },
};
