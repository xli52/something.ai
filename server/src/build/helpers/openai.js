"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardPrompt = exports.updatePromptGender = exports.updatePromptHistory = exports.chatPrompt = exports.openai = void 0;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
exports.openai = openai;
//helper function to trim input received from client side
// need to return a more precised prompt
function generatePrompt(input) {
    if (!input || input.length === 5) {
        return "";
    }
    const capitalizedInput = input[0].toUpperCase() + input.slice(1).toLowerCase();
    return capitalizedInput;
}
const standardPrompt = (gender = "FEMALE") => {
    const name = gender === "FEMALE" ? "Jane" : "Joshua";
    return `The following is a conversation with an AI. Below is the conversation history between the AI assistant and the human.

  Human: Hello, who are you? AI: My name is ${name} and I am an AI created by OPENAI.`;
};
exports.standardPrompt = standardPrompt;
// normal chat mode prompt
const chatPrompt = (text, prompt) => {
    return {
        model: "text-davinci-002",
        prompt: `${prompt} Human: ${generatePrompt(text)} AI:`,
        temperature: 0.9,
        max_tokens: 1000,
        top_p: 1,
        stop: [" Human:", " AI:"],
        presence_penalty: 1,
        frequency_penalty: 1,
    };
};
exports.chatPrompt = chatPrompt;
const updatePromptHistory = (currPrompt, humanText, aiText) => {
    if (currPrompt.slice(-4) === " AI:") {
        return `${currPrompt} ${generatePrompt(aiText)}`;
    }
    else {
        return `${currPrompt} Human: ${generatePrompt(humanText)} AI: ${generatePrompt(aiText)}`;
    }
};
exports.updatePromptHistory = updatePromptHistory;
const updatePromptGender = (currPrompt, newGender) => {
    const newName = newGender === "FEMALE" ? "Jane" : "Joshua";
    const oldName = newName === "Jane" ? "Joshua" : "Jane";
    return currPrompt.replace(new RegExp(`${oldName}`, "gi"), newName);
};
exports.updatePromptGender = updatePromptGender;
