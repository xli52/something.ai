"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const GoogleTTS = (text) => {
    // Construct the request
    const request = {
        input: { text },
        // Select the language and SSML voice gender (optional)
        voice: {
            languageCode: "en-US",
            ssmlGender: "FEMALE",
            name: "en-US-Wavenet-F",
        },
        // select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
    };
    console.log("Google TTS conversion stage");
    // Performs the text-to-speech request
    return client.synthesizeSpeech(request);
};
exports.default = GoogleTTS;
