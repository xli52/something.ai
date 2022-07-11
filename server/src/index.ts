import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import db from "../src/db/models";

dotenv.config();

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

app.use("/api/openai", openaiRouter(db));

app.use(express.static("./src/audio"));

app.listen(8080, () => {
  console.log("backend listening on port 8080");
});
