import speech from "@google-cloud/speech";

const client = new speech.SpeechClient();

interface ISpeechToText {
  encoding: String;
  sampleRateHertz: number;
  languageCode: string;
}

const config: ISpeechToText = {
  encoding: "WEBM_OPUS",
  sampleRateHertz: 48000,
  languageCode: "en-US",
};

const GoogleSTT = (request: {}): Promise<any> => {
  return client.recognize(request);
};

export { config, GoogleSTT };
