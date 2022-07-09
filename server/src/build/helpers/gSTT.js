"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSTT = exports.config = void 0;
const speech_1 = __importDefault(require("@google-cloud/speech"));
const client = new speech_1.default.SpeechClient();
const config = {
    encoding: "WEBM_OPUS",
    sampleRateHertz: 48000,
    languageCode: "en-US",
};
exports.config = config;
const GoogleSTT = (request) => {
    return client.recognize(request);
};
exports.GoogleSTT = GoogleSTT;
