import express from "express";

const router = express.Router();

// import node modules and helpers
import { cleanup } from "../helpers/helpers";
import fs from "fs";
import util from "util";
const writeFile = util.promisify(fs.writeFile);

// impoort APIs
import { GoogleTTS } from "../helpers/gTTS";
import { config, GoogleSTT } from "../helpers/gSTT";
import { GoogleNLA, checkSentiment } from "../helpers/gNLA";
import { openai, chatPrompt } from "../helpers/openai";

const openaiRouter = () => {
  ////////////////////////////////
  // Speech to Text Route
  ////////////////////////////////
  router.post("/speechToText", (req: any, res: any) => {
    console.log("SpeechToText endpoint received request");

    // frontend converted the audio blob into a base64 string, then we send it to Google STT api
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
    cleanup(req.session);

    console.log("TextToSpeech endpoint received request");
    console.log("req.session.recognizedText: ", req.session.recognizedText);

    // to deterentiate where the request was from speech or text
    let requestedText = req.session.recognizedText
      ? req.session.recognizedText
      : req.body.input;

    // first send the text off to Google NLA
    return GoogleNLA(requestedText)
      .then((response: any) => {
        console.log("Google NLA results: ", response);
        req.session.requestedSentiment = checkSentiment(
          response[0].documentSentiment.score
        );
        console.log(
          "Google says the speaker's sentiment is ",
          req.session.requestedSentiment
        );

        let prompt = chatPrompt(requestedText, req.session.requestedSentiment);

        // first, send off the text to openai, need to configure the sentiment and the completion prompt
        return openai.createCompletion(prompt);
      })
      .then((response: any) => {
        // once the response from openai is back, we pass it to GoogleTTS API
        console.log("OPEN AI: ", response.data);
        console.log("AI responded, moving onto Google TTS api");
        req.session.audioID = response.data.id;
        req.session.respondedText = response.data.choices[0].text.trim();

        return GoogleNLA(req.session.respondedText);
      })
      .then((response: any) => {
        req.session.respondedSentiment = checkSentiment(
          response[0].documentSentiment.score
        );
        console.log(
          "responded sentiment score: ",
          response[0].documentSentiment.score,
          typeof response[0].documentSentiment.score
        );
        console.log("responded sentiment is", req.session.respondedSentiment);
        return GoogleTTS(req.session.respondedText);
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
        let apiResponse = {
          audioID: req.session.audioID,
          recognizedText: req.session.recognizedText,
          aiSentiment: req.session.respondedSentiment,
        };

        // clean up api related data
        cleanup(req.session);
        req.session.recognizedText = null;

        res.status(200).json(apiResponse);
      });
  });
  return router;
};

export default openaiRouter;
