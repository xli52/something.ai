// general helper functions here

// session clean up for each request
const cleanup = (session: any): void => {
  session.audioID = null;
  session.requestedSentiment = null;
  session.requestedText = null;
  session.respondedSentiment = null;
};

export { cleanup };
