"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class message extends sequelize_1.Model {
        static associate(models) {
            // define association here
            message.belongsTo(models.conversation, {
                foreignKey: "conversation_id",
                onDelete: "CASCADE",
            });
        }
    }
    message.init({
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "conversations", key: "id" },
            onDelete: "CASCADE",
        },
        content: { type: DataTypes.TEXT, allowNull: false },
        from_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "message",
    });
    return message;
};
