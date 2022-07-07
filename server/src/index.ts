require("dotenv").config();
import express from "express";
import morgan from "morgan";
const app = express();

// import Routers
import openaiRouter from "./Routers/openaiRoute";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router to text to speach
app.use("/api/openai", openaiRouter());

app.use(express.static("./src/audio"));

app.listen(8080, () => {
  console.log("backend listening on port 8080");
});
