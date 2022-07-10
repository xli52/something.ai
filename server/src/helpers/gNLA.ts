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
  if (score >= 0.7 && score <= 1.0) {
    return "very positive";
  } else if (score >= 0.3 && score <= 0.6) {
    return "postive";
    // } else if (score >= -0.2 && score <= 0.2) {
    //   return "neutral";
  } else if (score >= -0.6 && score <= -0.3) {
    return "negative";
  } else if (score >= -1.0 && score <= -0.7) {
    return "very negative";
  } else {
    return "neutral";
  }
};

export { GoogleNLA, checkSentiment };
