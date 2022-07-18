"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transaction extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    transaction.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "characters",
                key: "id",
            },
        },
        amount_paid_cents: { type: DataTypes.INTEGER, allowNull: false },
        payment_type: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: "transaction",
    });
    return transaction;
};
