// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

interface IgoogleSpeech {
  languageCode: string;
  ssmlGender: string;
  name: string;
}

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

const GoogleTTS = (text: string, gender: string): Promise<[]> => {
  const name: string =
    gender === "FEMALE" ? "en-US-Wavenet-F" : "en-US-Wavenet-D";

  // Construct the request
  const request = {
    input: { text },
    // Select the language and SSML voice gender (optional)
    voice: <IgoogleSpeech>{
      languageCode: "en-US",
      ssmlGender: gender,
      name,
    },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  };
  // Performs the text-to-speech request
  return client.synthesizeSpeech(request);
};

export { GoogleTTS };
