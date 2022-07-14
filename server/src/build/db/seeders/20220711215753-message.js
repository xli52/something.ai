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
            yield queryInterface.bulkInsert("messages", [
                {
                    conversation_id: 1,
                    content: "How are you today, gpt-3?",
                    from_bot: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 1,
                    content: "I am doing well, thank you! How can I help you today?",
                    from_bot: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 1,
                    content: "Nothing much, can you tell me today's date?",
                    from_bot: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 1,
                    content: "Sure. Today is July 10, 2022.",
                    from_bot: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 2,
                    content: "I feel happy today. How about you, gpt-3?",
                    from_bot: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 2,
                    content: "I am glad you are happy. I am also feeling good as well, thank you! How can I help you today?",
                    from_bot: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 2,
                    content: "Nothing much, can you tell me where is British Columbia?",
                    from_bot: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    conversation_id: 2,
                    content: "Sure. British Columbia is a province of Canada located at the west side of the country.",
                    from_bot: true,
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
            yield queryInterface.bulkDelete("messages", null, {});
        });
    },
};
