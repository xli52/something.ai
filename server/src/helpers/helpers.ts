// general helper functions here
import fs from "fs";
import util from "util";
import path from "path";
import rimraf from "rimraf";

// a function to write audio files (base64 encoded string will be sent from Google TTS api)
const writeFile = util.promisify(fs.writeFile);

const deleteFiles = (dir: string): void => {
  fs.readdir(dir, (err, files: string[]) => {
    console.log("Audio directory? ", dir);
    console.log("What are files?", files);
    files.forEach((file: any) => {
      if (file.includes(".mp3")) {
        fs.stat(path.join(dir, file), (err, stat) => {
          let endTime: number, now: number;
          if (err) {
            console.error(err);
          }

          now = new Date().getTime();
          endTime = new Date(stat.ctime).getTime() + 30000;

          // means time has passed 30 seconds since the file was last changed
          if (now > endTime) {
            return rimraf(path.join(dir, file), (err: any) => {
              if (err) {
                return console.error(err);
              }
              console.log("Audio folder has been cleaned up.");
            });
          }
        });
      }
    });
    console.log("Scanning completed.");
  });
};

// session clean up for each api request
const cleanup = (session: any): void => {
  session.audioID = undefined;
  session.requestedSentiment = undefined;
  session.requestedText = undefined;
  session.respondedSentiment = undefined;
  session.respondedText = undefined;
  session.apiResponse;
};

const randomID = () => {
  return Math.floor((1 + Math.random()) * 0x1000000)
    .toString(16)
    .substring(1);
};

export { cleanup, writeFile, randomID, deleteFiles };
