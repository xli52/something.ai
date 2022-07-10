"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
dotenv_1.default.config();
const dbName = process.env.PGDATABASE;
const dbUser = process.env.PGUSER;
const dbPass = process.env.PGPASSWORD;
const dbHost = process.env.PGHOST;
const dbDialect = process.env.PGNAME;
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
});
