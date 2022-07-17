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
  if (score >= 0.3333333333333333 && score <= 1.0) {
    return "positive";
  } else if (score > -1.0 && score <= -0.3333333333333333) {
    return "negative";
  } else {
    return "neutral";
  }
};

export { GoogleNLA, checkSentiment };
