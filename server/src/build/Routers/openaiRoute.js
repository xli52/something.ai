"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// to repeatly write audio file when AI talks
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
// impoort APIs
const gTTS_1 = __importDefault(require("./gTTS"));
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
function generatePrompt(input) {
    const capitalizedInput = input[0].toUpperCase() + input.slice(1).toLowerCase();
    return capitalizedInput;
}
const openaiRouter = () => {
    router.post("/", (req, res) => {
        // we can adjust gpt3's setting here
        const gpt3Prompt = {
            model: "text-davinci-002",
            prompt: generatePrompt(req.body.input),
            temperature: 0.6,
            max_tokens: 2000,
        };
        console.log("router receiving request", req.body);
        // first, send off the text to openai
        return openai
            .createCompletion(gpt3Prompt)
            .then((response) => {
            // once the response from openai is back, we pass it to GoogleTTS API
            console.log("AI responded, moving onto Google TTS");
            console.log(response.data);
            return (0, gTTS_1.default)(response.data.choices[0].text.trim());
        })
            .then(([response]) => {
            // Base64 encoding is done, time to write file
            console.log("decoded stage finished: ", response.audioContent);
            return writeFile("../frontend/src/speech.mp3", response.audioContent, "binary");
        })
            .then((response) => {
            // this is will send response back to frontend, which react will update it's dom to retrieve new audio file
            res.status(200).json(response);
        });
    });
    return router;
};
exports.default = openaiRouter;
