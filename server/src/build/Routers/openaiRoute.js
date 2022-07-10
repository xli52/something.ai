"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router setup
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import node modules and helpers
const helpers_1 = require("../helpers/helpers");
// impoort APIs
const gTTS_1 = require("../helpers/gTTS");
const gSTT_1 = require("../helpers/gSTT");
const gNLA_1 = require("../helpers/gNLA");
const openai_1 = require("../helpers/openai");
const openaiRouter = () => {
    ////////////////////////////////
    // Speech to Text Route
    ////////////////////////////////
    router.post("/speechToText", (req, res) => {
        console.log("SpeechToText endpoint received request");
        // frontend converted the audio blob into a base64 string, then we send it to Google STT api
        const request = {
            audio: { content: req.body.base64.substring(23) },
            config: gSTT_1.config,
        };
        console.log("firing to Google STT api");
        return (0, gSTT_1.GoogleSTT)(request).then(([response]) => {
            console.log("received response from Google: ", response.results[0].alternatives[0].transcript);
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
    router.post("/textToSpeech", (req, res) => {
        (0, helpers_1.cleanup)(req.session);
        console.log("TextToSpeech endpoint received request");
        console.log("req.session.recognizedText: ", req.session.recognizedText);
        // to deterentiate where the request was from speech or text
        let requestedText = req.session.recognizedText
            ? req.session.recognizedText
            : req.body.input;
        // first send the text off to Google NLA
        return (0, gNLA_1.GoogleNLA)(requestedText)
            .then((response) => {
            req.session.requestedSentiment = (0, gNLA_1.checkSentiment)(response[0].documentSentiment.score);
            console.log("Google NLA says the speaker's sentiment is ", req.session.requestedSentiment, response[0].documentSentiment.score);
            let prompt = (0, openai_1.chatPrompt)(requestedText, req.session.requestedSentiment);
            // then, send off the text to openai
            return openai_1.openai.createCompletion(prompt);
        })
            .then((response) => {
            // once the response from openai is back, we pass it to NLA again
            console.log("OPEN AI: ", response.data);
            // save the audioID for saving and retrieving the file
            req.session.audioID = response.data.id;
            req.session.respondedText = response.data.choices[0].text.trim();
            return (0, gNLA_1.GoogleNLA)(req.session.respondedText);
        })
            .then((response) => {
            req.session.respondedSentiment = (0, gNLA_1.checkSentiment)(response[0].documentSentiment.score);
            console.log("responded sentiment is", req.session.respondedSentiment, response[0].documentSentiment.score);
            return (0, gTTS_1.GoogleTTS)(req.session.respondedText);
        })
            .then(([response]) => {
            // Base64 encoding is done, time to write file
            console.log("decoded stage finished: ", response.audioContent);
            // stretch: write a cron job script to periodically clean up the audio files
            return (0, helpers_1.writeFile)(`./src/audio/${req.session.audioID}.mp3`, response.audioContent, "binary");
        })
            .then(() => {
            // this is will send response back to frontend, which react will update it's dom to retrieve new audio file and initiate character animation
            let apiResponse = {
                audioID: req.session.audioID,
                recognizedText: req.session.recognizedText,
                aiSentiment: req.session.respondedSentiment,
            };
            // clean up api related data
            (0, helpers_1.cleanup)(req.session);
            req.session.recognizedText = null;
            res.status(200).json(apiResponse);
        });
    });
    return router;
};
exports.default = openaiRouter;
