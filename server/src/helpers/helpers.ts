// general helper functions here
import { response } from "express";
import fs from "fs";
import util from "util";

// a function to write audio files (base64 encoded string will be sent from Google TTS api)
const writeFile = util.promisify(fs.writeFile);

// session clean up for each api request
const cleanup = (session: any): void => {
  session.audioID = null;
  session.requestedSentiment = null;
  session.requestedText = null;
  session.respondedSentiment = null;
};

export { cleanup, writeFile };
