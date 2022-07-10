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
    if (score >= 0.6 && score <= 1.0) {
        return "very positive";
    }
    else if (score >= 0.2 && score <= 0.5999999999999999) {
        return "postive";
    }
    else if (score >= -0.6 && score <= -0.2000000000000001) {
        return "negative";
    }
    else if (score > -1.0 && score <= -0.6000000000000001) {
        return "very negative";
    }
    else {
        return "neutral";
    }
};
exports.checkSentiment = checkSentiment;
