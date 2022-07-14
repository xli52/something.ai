"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class users_character extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    users_character.init({
        user_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        character_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
            references: {
                model: "characters",
                key: "id",
            },
        },
    }, {
        sequelize,
        modelName: "users_character",
    });
    return users_character;
};
