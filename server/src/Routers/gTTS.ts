// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

interface IgoogleSpeech {
  languageCode: string;
  ssmlGender: string;
  name: string;
}

//helper function to trim input received from client side
function generatePrompt(input: string): string {
  const capitalizedInput =
    input[0].toUpperCase() + input.slice(1).toLowerCase();
  return capitalizedInput;
}

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const GoogleTTS = (text: string): Promise<[]> => {
  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: <IgoogleSpeech>{
      languageCode: "en-US",
      ssmlGender: "FEMALE",
      name: "en-US-Wavenet-F",
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };
  console.log("Google TTS conversion stage");
  // Performs the text-to-speech request
  return client.synthesizeSpeech(request);
};

export { generatePrompt, GoogleTTS };
