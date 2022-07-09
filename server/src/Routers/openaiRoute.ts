import express from "express";

const router = express.Router();

// to repeatly write audio file when AI talks
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);

// impoort APIs
import { GoogleTTS } from "../helpers/gTTS";
import { config, GoogleSTT } from "../helpers/gSTT";
import { GoogleNLA, sentimentScore } from "../helpers/gNLA";
import {
  openai,
  generatePrompt,
  gpt3Prompt,
  completion,
} from "../helpers/openai";

const openaiRouter = () => {
  ////////////////////////////////
  // Speech to Text Route
  ////////////////////////////////
  router.post("/speechToText", (req: any, res: any) => {
    console.log("SpeechToText endpoint received request");
    const base64: string = req.body.base64.substring(23);

    const request: {} = {
      audio: { content: base64 },
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

    let requestedText = req.session.recognizedText
      ? req.session.recognizedText
      : req.body.input;

    gpt3Prompt.prompt = generatePrompt(requestedText);

    // first send the text off to Google NLA
    return GoogleNLA(requestedText)
      .then((response: any) => {
        console.log("Google NLA results: ", response);

        req.session.requestedSentiment = response.documentSentiment.score;
        // first, send off the text to openai, need to configure the sentiment and the completion prompt
        return openai.createCompletion(gpt3Prompt);
      })
      .then((response: any) => {
        // once the response from openai is back, we pass it to GoogleTTS API
        console.log("OPEN AI: ", response.data);
        console.log("AI responded, moving onto Google TTS api");
        req.session.audioID = response.data.id;
        req.session.responsedText = response.data.choices[0].text.trim();

        return GoogleNLA(req.session.responsedText);
      })
      .then((response: any) => {
        req.session.responsedSentiment = response.documentSentiment.score;
        return GoogleTTS(req.session.responsedText);
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
          sentiment: req.session.responsedSentiment,
        };

        // clean up
        req.session.audioID = null;
        req.session.recognizedText = null;
        req.session.requestedSentiment = null;
        req.session.requestedText = null;
        req.session.responsedSentiment = null;

        res.status(200).json(object);
      });
  });
  return router;
};

export default openaiRouter;
