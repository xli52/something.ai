import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//helper function to trim input received from client side
// need to return a more precised prompt
function generatePrompt(input: string): string {
  if (!input || input.length === 5) {
    return "";
  }

  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return capitalizedInput;
}

const standardPrompt = (gender: string, username: string) => {
  const name: string = gender === "FEMALE" ? "Jane" : "Joshua";

  const day: string = Date().slice(0, 15);

  return `${name} is an AI that is good at conversations with human. Its response mimics how a human talks with emotions and does not talk like a robot. Here are some examples of how an AI reponses, the AI follows the exmpales' patterns but WILL NOT use such as future responses: Human: Hi, what does today's weather look like in Vancouver? AI: Today is sunny and warm! Why don't you go to the beach and enjoy the sunshine? Human: I am happy! AI: I am glad to hear that. Can you tell me why you're happy?
  The following is a conversation with the abovementioned AI. Below is the conversation history between the AI and the human.
  Human: Today is ${day}. Hello, I am ${username}. Who are you? AI: Hi, My name is ${name} and I am an AI created by OPENAI. How are you doing today?`;
};

interface IOpenaiPrompt {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
  top_p?: number;
  stop?: string[];
  presence_penalty?: number;
}

// normal chat mode prompt
const chatPrompt = (text: string, prompt: string): IOpenaiPrompt => {
  return {
    model: "text-davinci-002",
    prompt: `${prompt} Human: ${generatePrompt(text)} AI:`,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    stop: [" Human:", " AI:"],
    presence_penalty: 0.6,
  };
};

const updatePromptHistory = (
  currPrompt: string,
  humanText: string,

  aiText: string
): string => {
  if (currPrompt.slice(-4) === " AI:") {
    return `${currPrompt} ${generatePrompt(aiText)}`;
  } else {
    return `${currPrompt} Human: ${generatePrompt(
      humanText
    )} AI: ${generatePrompt(aiText)}`;
  }
};

const updatePromptGender = (currPrompt: string, newGender: string): string => {
  const newName = newGender === "FEMALE" ? "Jane" : "Joshua";
  const oldName = newName === "Jane" ? "Joshua" : "Jane";

  return currPrompt.replace(new RegExp(`${oldName}`, "gi"), newName);
};

export {
  openai,
  chatPrompt,
  updatePromptHistory,
  updatePromptGender,
  standardPrompt,
};
