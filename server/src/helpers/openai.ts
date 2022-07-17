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

const standardPrompt = (gender: string = "FEMALE") => {
  const name: string = gender === "FEMALE" ? "Jane" : "Joshua";

  return `The following is a conversation with an AI. The assistant is helpful, creative, clever, and very friendly. Below is the conversation history between the AI assistant and the human.

  Human: Hello, who are you? AI: My name is ${name} and I am an AI created by OPENAI.`;
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
    max_tokens: 1000,
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
