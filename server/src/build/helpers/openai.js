"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completion = exports.gpt3Prompt = exports.generatePrompt = exports.openai = void 0;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
exports.openai = openai;
//helper function to trim input received from client side
// need to return a more precised prompt
function generatePrompt(input) {
    const capitalizedInput = input[0].toUpperCase() + input.slice(1).toLowerCase();
    return capitalizedInput;
}
exports.generatePrompt = generatePrompt;
// prompt setting for gpt-3 engine
const gpt3Prompt = {
    model: "text-davinci-002",
    prompt: "",
    temperature: 0.6,
    max_tokens: 2000,
};
exports.gpt3Prompt = gpt3Prompt;
// to guide gpt-3 how to response
const completion = (text, sentiment) => {
    return "";
};
exports.completion = completion;
