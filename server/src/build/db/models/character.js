"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class character extends sequelize_1.Model {
        static associate(models) {
            // define association here
            character.belongsToMany(models.user, {
                through: models.users_character,
                as: "users",
                foreignKey: "character_id",
            });
        }
    }
    character.init({
        name: { type: DataTypes.STRING, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: "character",
    });
    return character;
};
