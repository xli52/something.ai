// router setup
import express from "express";
const router = express.Router();

// import node modules and helpers
import { cleanup, writeFile } from "../helpers/helpers";

// impoort APIs
import { GoogleTTS } from "../helpers/gTTS";
import { config, GoogleSTT } from "../helpers/gSTT";
import { GoogleNLA, checkSentiment } from "../helpers/gNLA";
import { openai, chatPrompt } from "../helpers/openai";

const openaiRouter = (db: any) => {
  ////////////////////////////////
  // Speech to Text Route
  ////////////////////////////////
  router.post("/speechToText", (req: any, res: any) => {
    console.log("SpeechToText endpoint received request");

    // frontend converted the audio blob into a base64 string, then we send it to Google STT api
    const request: {} = {
      audio: { content: req.body.base64.substring(23) },
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
        req.session.requestedSentiment = checkSentiment(
          response[0].documentSentiment.score
        );
        console.log(
          "Google NLA says the speaker's sentiment is ",
          req.session.requestedSentiment,
          response[0].documentSentiment.score
        );

        let prompt = chatPrompt(requestedText, req.session.requestedSentiment);

        // then, send off the text to openai
        return openai.createCompletion(prompt);
      })
      .then((response: any) => {
        // once the response from openai is back, we pass it to NLA again
        console.log("OPEN AI: ", response.data);
        // save the audioID for saving and retrieving the file
        req.session.audioID = response.data.id;
        req.session.respondedText = response.data.choices[0].text.trim();

        return GoogleNLA(req.session.respondedText);
      })
      .then((response: any) => {
        req.session.respondedSentiment = checkSentiment(
          response[0].documentSentiment.score
        );
        console.log(
          "responded sentiment is",
          req.session.respondedSentiment,
          response[0].documentSentiment.score
        );
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
      .then(() => {
        // this is will send response back to frontend, which react will update it's dom to retrieve new audio file and initiate character animation
        let apiResponse = {
          audioID: req.session.audioID,
          recognizedText: req.session.recognizedText, // once front-end starts working on chat history state, we won't need this to be in the object. Still need to keep the recognizedText though.
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
