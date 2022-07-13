"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomID = exports.writeFile = exports.cleanup = void 0;
// general helper functions here
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
// a function to write audio files (base64 encoded string will be sent from Google TTS api)
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
exports.writeFile = writeFile;
// session clean up for each api request
const cleanup = (session) => {
    session.audioID = null;
    session.requestedSentiment = null;
    session.requestedText = null;
    session.respondedSentiment = null;
    session.respondedText = null;
    session.apiResponse;
};
exports.cleanup = cleanup;
const randomID = () => {
    return Math.floor((1 + Math.random()) * 0x1000000)
        .toString(16)
        .substring(1);
};
exports.randomID = randomID;
