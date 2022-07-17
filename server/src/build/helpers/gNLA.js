"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSentiment = exports.GoogleNLA = void 0;
const language_1 = __importDefault(require("@google-cloud/language"));
const client = new language_1.default.LanguageServiceClient();
const GoogleNLA = (text) => {
    const document = {
        content: text,
        type: "PLAIN_TEXT",
    };
    return client.analyzeSentiment({ document });
};
exports.GoogleNLA = GoogleNLA;
const checkSentiment = (score) => {
    if (score >= 0.3333333333333333 && score <= 1.0) {
        return "positive";
    }
    else if (score > -1.0 && score <= -0.3333333333333333) {
        return "negative";
    }
    else {
        return "neutral";
    }
};
exports.checkSentiment = checkSentiment;
