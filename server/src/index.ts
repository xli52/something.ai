require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";

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

// import Routers
import openaiRouter from "./Routers/openaiRoute";
// router to text to speach
app.use("/api/openai", openaiRouter());

app.use(express.static("./src/audio"));

app.listen(8080, () => {
  console.log("backend listening on port 8080");
});
