import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";
import db from "../src/db/models";
import { deleteFiles } from "./helpers/helpers";

// a cron job to clean up audio files every 30 seconds
// const audioDir: string = __dirname + "/audio";
// setInterval(() => {
//   deleteFiles(audioDir);
//   console.log("cron job done.");
// }, 30000);

dotenv.config();
const app = express();

// import Routers
import openaiRouter from "./Routers/openaiRoute";
import userRouter from "./Routers/userRoute";

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

app.get("/", (req: any, res: any) => {
  console.log("Checking user session", req.session);
  res.status(200);
});
app.use("/api/openai", openaiRouter(db));
app.use("/user", userRouter(db));

app.use(express.static("./src/audio"));

app.listen(8080, () => {
  console.log("backend listening on port 8080");
});
