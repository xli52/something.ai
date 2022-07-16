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

  return `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The human is talking with sentiment. The AI assistant's response should synchronize with a corresponding sentiment.
  ###
  Write a long response based on the following conversation history.
  Below is the conversation history between the AI assistant and the human and the conversation is still on going. The AI assistant remembers all the history with the human.
  ###
  Human: Hello, who are you? Human_Sentiment: neutral
  AI: I am great, thank you. My name is ${name} and I am an AI created by OpenAI. How can I help you today? AI_Sentiment: neutral
  
  Human: I feel sad now because I failed my exam. What should I do? Human_Sentiment: negative
  AI: I am sorry to hear that. I would suggest you to first find out why you did not pass the exam. After figuring out the reasons, then you improve yourself based on your findings. AI_Sentiment: negative
  
  Human: I am feeling greate today because I won a very important match. How should I celebrate? Human_Sentiment: positive
  AI: I am happy for you! You should tell your family and friends about it. Dining out at a nice restaurant with your family tonight would be a great choice for celebration. Or, maybe you can consider to hold a house party to share your happiness with them. AI_Sentiment: postive
  `;
};

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
  sentiment: string = "neutral",
  prompt: string
): IOpenaiPrompt => {
  return {
    model: "text-davinci-002",
    prompt: `${prompt}
    Human: ${generatePrompt(text)} Human_Sentiment: ${sentiment}
    AI: `,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    stop: ["Human_Sentiment: ", "AI_Sentiment", " Human:", " AI:"],
  };
};

const updatePromptHistory = (
  currPrompt: string,
  humanText: string,
  humanSentiment: string,
  aiText: string,
  aiSentiment: string
): string => {
  return `${currPrompt}
    Human: ${generatePrompt(humanText)} Human_Sentiment: ${humanSentiment}
    AI: ${generatePrompt(aiText)} AI_Sentiment: ${aiSentiment}\n\n`;
};

const updatePromptGender = (currPrompt: string, newGender: string): string => {
  const newName = newGender === "FEMALE" ? "Jane" : "Joshua";
  const oldName = newName === "Jane" ? "Joshua" : "Jane";

  let newPromptGender = currPrompt.replace(
    new RegExp(`${oldName}`, "gi"),
    newName
  );

  return `${newPromptGender}\n\nHuman: What is your name again? AI: Now my name is ${newName}, I will be responding under name ${newName}\n\n`;
};

export {
  openai,
  chatPrompt,
  updatePromptHistory,
  updatePromptGender,
  standardPrompt,
};
