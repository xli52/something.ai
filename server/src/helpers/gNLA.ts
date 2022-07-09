import language from "@google-cloud/language";

const client = new language.LanguageServiceClient();

const GoogleNLA = (text: string) => {
  const document: {} = {
    content: text,
    type: "PLAIN_TEXT",
  };

  return client.analyzeSentiment({ document });
};

export { GoogleNLA };
