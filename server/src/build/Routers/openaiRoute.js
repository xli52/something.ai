"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cookieSession from "cookie-session";
const router = express_1.default.Router();
// router.use(
//   cookieSession({
//     name: "session",
//     keys: ["key1", "key2", "key3"],
//   })
// );
// to repeatly write audio file when AI talks
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
// impoort APIs
const gTTS_1 = require("../helpers/gTTS");
const gSTT_1 = require("../helpers/gSTT");
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const gpt3Prompt = {
    model: "text-davinci-002",
    prompt: "",
    temperature: 0.6,
    max_tokens: 2000,
};
const openaiRouter = () => {
    ////////////////////////////////
    // Speech to Text Route
    ////////////////////////////////
    router.post("/speechToText", (req, res) => {
        console.log("SpeechToText endpoint received request");
        const base64 = req.body.base64.substring(23);
        const audio = {
            content: base64,
        };
        const request = {
            audio,
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
        // we can adjust gpt3's setting here
        console.log("TextToSpeech endpoint received request");
        console.log("req.session.recognizedText: ", req.session.recognizedText);
        req.session.recognizedText
            ? (gpt3Prompt.prompt = (0, gTTS_1.generatePrompt)(req.session.recognizedText))
            : (gpt3Prompt.prompt = (0, gTTS_1.generatePrompt)(req.body.input));
        // first, send off the text to openai
        return openai
            .createCompletion(gpt3Prompt)
            .then((response) => {
            // once the response from openai is back, we pass it to GoogleTTS API
            console.log("OPEN AI: ", response.data);
            console.log("AI responded, moving onto Google TTS api");
            req.session.audioID = response.data.id;
            return (0, gTTS_1.GoogleTTS)(response.data.choices[0].text.trim());
        })
            .then(([response]) => {
            // Base64 encoding is done, time to write file
            console.log("decoded stage finished: ", response.audioContent);
            // stretch: write a cron job script to periodically clean up the audio files
            return writeFile(`./src/audio/${req.session.audioID}.mp3`, response.audioContent, "binary");
        })
            .then((response) => {
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
exports.default = openaiRouter;
