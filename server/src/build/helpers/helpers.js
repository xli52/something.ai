"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.randomID = exports.writeFile = exports.cleanup = void 0;
// general helper functions here
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const rimraf_1 = __importDefault(require("rimraf"));
// a function to write audio files (base64 encoded string will be sent from Google TTS api)
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
exports.writeFile = writeFile;
const deleteFiles = (dir) => {
    fs_1.default.readdir(dir, (err, files) => {
        console.log("Audio directory? ", dir);
        console.log("What are files?", files);
        files.forEach((file) => {
            if (file.includes(".mp3")) {
                fs_1.default.stat(path_1.default.join(dir, file), (err, stat) => {
                    let endTime, now;
                    if (err) {
                        console.error(err);
                    }
                    now = new Date().getTime();
                    endTime = new Date(stat.ctime).getTime() + 30000;
                    // means time has passed 30 seconds since the file was last changed
                    if (now > endTime) {
                        return (0, rimraf_1.default)(path_1.default.join(dir, file), (err) => {
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
exports.deleteFiles = deleteFiles;
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
