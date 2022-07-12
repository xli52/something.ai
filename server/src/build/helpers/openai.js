"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatPrompt = exports.openai = void 0;
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
// normal chat mode prompt
const chatPrompt = (text, sentiment = "neutral") => {
    return {
        model: "text-davinci-002",
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The human is talking with a with a ${sentiment} sentiment. The AI assistant's response should synchronize with the ${sentiment} sentiment. The AI can ask Human questions as part of the interaction. 
    Write a long response based on the following example conversation. 

    Human: Hello, who are you?
    AI: I am an AI created by OpenAI. How can I help you today?
    Human: Can you tell me today's date?
    AI: Ok, today is July 9, 2022.
    Human: What should I do if I want to achieve good grades?
    AI: You should first understand are the requirements to achieve a high score in a particular subject. After that, plan your study accordingly based on the testing contents and requirements. You also need to manage your time and balance your life. Most importantly, get enough sleep for your brain to function well.
    Human: ${generatePrompt(text)}
    AI:`,
        temperature: 0.9,
        max_tokens: 2000,
        top_p: 1,
        stop: [" Human:", " AI:"],
    };
};
exports.chatPrompt = chatPrompt;
