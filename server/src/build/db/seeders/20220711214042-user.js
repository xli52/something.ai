"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add seed commands here.
             *
             * Example:
             * await queryInterface.bulkInsert('People', [{
             *   name: 'John Doe',
             *   isBetaMember: false
             * }], {});
             */
            yield queryInterface.bulkInsert("users", [
                {
                    username: "John Doe",
                    password: "$2a$10$XLdY7cRuH19aG3c9.NLvTuTYMxwv6y1dsJ2r9CqTfIbu6U.acSi8W",
                    email: "a@a.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: "Amy Heisenberg",
                    password: "$2a$10$68wXbfzS9LBLA8/XLs4V/OSz3bUitTp5wXpsfm802S0douO7Aqseu",
                    email: "b@b.com",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Add commands to revert seed here.
             *
             * Example:
             * await queryInterface.bulkDelete('People', null, {});
             */
            yield queryInterface.bulkDelete("users", null, {});
        });
    },
};
