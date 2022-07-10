"use strict";
// general helper functions here
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = void 0;
// session clean up for each request
const cleanup = (session) => {
    session.audioID = null;
    session.requestedSentiment = null;
    session.requestedText = null;
    session.respondedSentiment = null;
};
exports.cleanup = cleanup;
