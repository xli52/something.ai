"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends sequelize_1.Model {
        static associate(models) {
            // define association here
            user.hasMany(models.conversation, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            user.belongsToMany(models.character, {
                through: "users_characters",
                foreignKey: "user_id",
            });
        }
    }
    user.init({
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
    }, {
        sequelize,
        modelName: "user",
    });
    return user;
};