import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import db from "../src/db/models";
import { users } from "./db/seeders/users";

dotenv.config();

// insert db seeds
// const createUsers = () => {
//   users.map((user) => {
//     db.user.create(user);
//   });
// };

// createUsers();

// import Routers
import openaiRouter from "./Routers/openaiRoute";

const app = express();

// Middlewares
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2", "key3"],
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/openai", openaiRouter());

app.use(express.static("./src/audio"));

db.sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("backend listening on port 8080");
  });
});
