import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";
dotenv.config();

const dbName = process.env.PGDATABASE as string;
const dbUser = process.env.PGUSER as string;
const dbPass = process.env.PGPASSWORD as string;
const dbHost = process.env.PGHOST as string;
const dbDialect = process.env.PGNAME as Dialect;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: dbDialect,
});
