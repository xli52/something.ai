import express from "express";
const router = express.Router();

// to repeatly write audio file when AI talks
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);

// impoort APIs
import GoogleTTS from "./gTTS";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function generatePrompt(input: string): string {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return capitalizedInput;
}

interface IOpenaiPrompt {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}

const openaiRouter = (): any => {
  router.post("/", (req: any, res: any) => {
    let audioID = "";
    // we can adjust gpt3's setting here
    const gpt3Prompt: IOpenaiPrompt = {
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.input),
      temperature: 0.6,
      max_tokens: 2000,
    };
    console.log("router receiving request", req.body);
    // first, send off the text to openai
    return openai
      .createCompletion(gpt3Prompt)
      .then((response: any) => {
        // once the response from openai is back, we pass it to GoogleTTS API
        console.log("OPEN AI: ", response.data);
        console.log("AI responded, moving onto Google TTS");
        audioID = response.data.id;
        return GoogleTTS(response.data.choices[0].text.trim());
      })
      .then(([response]: any[]) => {
        // Base64 encoding is done, time to write file
        console.log("decoded stage finished: ", response.audioContent);
        // stretch: write a cron job script to periodically clean up the audio files
        return writeFile(
          `./src/audio/${audioID}.mp3`,
          response.audioContent,
          "binary"
        );
      })
      .then((response: any) => {
        // this is will send response back to frontend, which react will update it's dom to retrieve new audio file
        res.status(200).json({ audioID });
      });
  });
  return router;
};

export default openaiRouter;
