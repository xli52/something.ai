import express from "express";
const router = express.Router();

// to repeatly write audio file when AI talks
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);

// impoort APIs
import { generatePrompt, GoogleTTS } from "./gTTS";
import { config, GoogleSTT } from "./gSTT";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface IOpenaiPrompt {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}

const gpt3Prompt: IOpenaiPrompt = {
  model: "text-davinci-002",
  prompt: "",
  temperature: 0.6,
  max_tokens: 2000,
};

const openaiRouter = (): any => {
  ////////////////////////////////
  // Speech to Text Route
  ////////////////////////////////
  router.post("/speechToText", (req: any, res: any) => {
    let recognizedText: string;
    let audioID: string;

    console.log("received request");
    const base64: string = req.body.base64.substring(23);
    const audio: {} = {
      content: base64,
    };

    const request: {} = {
      audio,
      config,
    };
    console.log("firing to Google STT");
    return GoogleSTT(request)
      .then(([response]) => {
        console.log(
          "received response from Google: ",
          response.results[0].alternatives[0].transcript
        );

        recognizedText = response.results[0].alternatives[0].transcript;
        const prompt = {
          ...gpt3Prompt,
          prompt: generatePrompt(recognizedText),
        };
        console.log("new prompt is: ", prompt);
        return openai.createCompletion(prompt);
      })
      .then((response: any) => {
        // once the response from openai is back, we pass it to GoogleTTS API
        console.log("OPEN AI: ", response.data);
        console.log("AI responded, moving onto Google STT");
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
        res.status(200).json({ recognizedText, audioID });
      });
  });

  ////////////////////////////////
  // Text to Speech Route
  ////////////////////////////////
  router.post("/textToSpeech", (req: any, res: any) => {
    let audioID = "";
    // we can adjust gpt3's setting here
    const promt = {
      ...gpt3Prompt,
      prompt: generatePrompt(req.body.input),
    };
    console.log("router receiving request", req.body);
    // first, send off the text to openai
    return openai
      .createCompletion(promt)
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
