"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class conversation extends sequelize_1.Model {
        static associate(models) {
            // define association here
            conversation.belongsTo(models.user, {
                foreignKey: "user_id",
                onDelete: "CASCADE",
            });
            conversation.hasMany(models.message, {
                foreignKey: "conversation_id",
                onDelete: "CASCADE",
            });
            conversation.hasOne(models.prompt, {
                foreignKey: "conversation_id",
                onDelete: "CASCADE",
            });
        }
    }
    conversation.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users", key: "id" },
            onDelete: "CASCADE",
        },
    }, {
        sequelize,
        modelName: "conversation",
    });
    return conversation;
};
