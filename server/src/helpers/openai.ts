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
  top_p?: number;
  stop?: string[];
}

// normal chat mode prompt
const chatPrompt = (
  text: string,
  sentiment: string = "neutral"
): IOpenaiPrompt => {
  return {
    model: "text-davinci-002",
    prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The human is talking with a with a ${sentiment} sentiment. The AI assistant's response should synchronize with the ${sentiment} sentiment. The AI can ask Human questions as part of the interaction. 
    Write a long response. 

    Human: Hello, who are you?
    AI: I am an AI created by OpenAI. How can I help you today?
    Human: Can you tell me today's date?
    AI: Ok, today is July 9, 2022.
    Human: What should I do if I want to achieve good grades?
    AI: You should first make a understand what it takes to achieve a high score in a particular subject. After that, plan your study accordingly based on the testing contents. You also need to manage your time and balance your life. Most importantly, get enough sleep for your brain to function well.
    Human: ${generatePrompt(text)}
    AI:`,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    stop: [" Human:", " AI:"],
  };
};

export { openai, chatPrompt };
