import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//helper function to trim input received from client side
// need to return a more precised prompt
function generatePrompt(input: string): string {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return capitalizedInput;
}

interface IOpenaiPrompt {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}

// prompt setting for gpt-3 engine
const gpt3Prompt: IOpenaiPrompt = {
  model: "text-davinci-002",
  prompt: "",
  temperature: 0.6,
  max_tokens: 2000,
};

// to guide gpt-3 how to response
const completion = (text: string, sentiment: string): string => {
  return "";
};

export { openai, generatePrompt, gpt3Prompt, completion };
