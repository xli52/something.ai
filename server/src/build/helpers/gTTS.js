"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleTTS = void 0;
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const GoogleTTS = (text, gender) => {
    const name = gender === "FEMALE" ? "en-US-Wavenet-F" : "en-US-Wavenet-D";
    // Construct the request
    const request = {
        input: { text },
        // Select the language and SSML voice gender (optional)
        voice: {
            languageCode: "en-US",
            ssmlGender: gender,
            name,
        },
        // select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
    };
    // Performs the text-to-speech request
    return client.synthesizeSpeech(request);
};
exports.GoogleTTS = GoogleTTS;
