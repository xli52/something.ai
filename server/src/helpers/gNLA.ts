import language from "@google-cloud/language";

const client = new language.LanguageServiceClient();

const GoogleNLA = (text: string) => {
  const document: {} = {
    content: text,
    type: "PLAIN_TEXT",
  };

  return client.analyzeSentiment({ document });
};

const checkSentiment = (score: number): string => {
  if (score >= 0.6 && score <= 1.0) {
    return "very positive";
  } else if (score >= 0.2 && score <= 0.5999999999999999) {
    return "postive";
  } else if (score >= -0.6 && score <= -0.2000000000000001) {
    return "negative";
  } else if (score > -1.0 && score <= -0.6000000000000001) {
    return "very negative";
  } else {
    return "neutral";
  }
};

export { GoogleNLA, checkSentiment };
