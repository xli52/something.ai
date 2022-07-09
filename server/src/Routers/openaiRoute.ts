import express from "express";
// import cookieSession from "cookie-session";

const router = express.Router();
// router.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1", "key2", "key3"],
//   })
// );

// to repeatly write audio file when AI talks
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);

// impoort APIs
import { generatePrompt, GoogleTTS } from "../helpers/gTTS";
import { config, GoogleSTT } from "../helpers/gSTT";
import { Configuration, OpenAIApi } from "openai";
import { request } from "http";

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
    console.log("SpeechToText endpoint received request");
    const base64: string = req.body.base64.substring(23);
    const audio: {} = {
      content: base64,
    };

    const request: {} = {
      audio,
      config,
    };
    console.log("firing to Google STT api");
    return GoogleSTT(request).then(([response]) => {
      console.log(
        "received response from Google: ",
        response.results[0].alternatives[0].transcript
      );

      // saved this text to req.session
      req.session.recognizedText =
        response.results[0].alternatives[0].transcript;

      // redirect with code 307 will reserve the send method (i.e. POST method)
      res.redirect(307, "/api/openai/textToSpeech");
    });
  });

  ////////////////////////////////
  // Text to Speech Route
  ////////////////////////////////
  router.post("/textToSpeech", (req: any, res: any) => {
    // we can adjust gpt3's setting here

    console.log("TextToSpeech endpoint received request");
    console.log("req.session.recognizedText: ", req.session.recognizedText);

    req.session.recognizedText
      ? (gpt3Prompt.prompt = generatePrompt(req.session.recognizedText))
      : (gpt3Prompt.prompt = generatePrompt(req.body.input));

    // first, send off the text to openai
    return openai
      .createCompletion(gpt3Prompt)
      .then((response: any) => {
        // once the response from openai is back, we pass it to GoogleTTS API
        console.log("OPEN AI: ", response.data);
        console.log("AI responded, moving onto Google TTS api");
        req.session.audioID = response.data.id;
        return GoogleTTS(response.data.choices[0].text.trim());
      })
      .then(([response]: any[]) => {
        // Base64 encoding is done, time to write file
        console.log("decoded stage finished: ", response.audioContent);
        // stretch: write a cron job script to periodically clean up the audio files
        return writeFile(
          `./src/audio/${req.session.audioID}.mp3`,
          response.audioContent,
          "binary"
        );
      })
      .then((response: any) => {
        // this is will send response back to frontend, which react will update it's dom to retrieve new audio file
        let object = {
          audioID: req.session.audioID,
          recognizedText: req.session.recognizedText,
        };
        req.session.audioID = null;
        req.session.recognizedText = null;

        res.status(200).json(object);
      });
  });
  return router;
};

export default openaiRouter;
