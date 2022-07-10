import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dbName = process.env.PGDATABASE as string;
const dbUser = process.env.PGUSER as string;
const dbPass = process.env.PGPASSWORD as string;
const dbHost = process.env.PGHOST as string;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connection has been established successfully.");
  })
  .then((res) => sequelize.close())
  .catch((err) => console.error("Unable to connect to the database: ", err));
