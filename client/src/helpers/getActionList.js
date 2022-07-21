export default function getActionList() {
  const offset = 1;
  return (
    {
      Acknowledging: { duration: 1.93, status: 'speakingGesture', sentiment: 'neutral' },
      Agreeing: { duration: 1.83, status: 'speakingGesture', sentiment: 'neutral' },
      HeadGesture: { duration: 2.81, status: 'speakingGesture', sentiment: 'neutral' },
      HappyHandGesture: { duration: 2.95, status: 'speakingGesture', sentiment: 'positive' },
      HardHeadNod: { duration: 1.63, status: 'speakingGesture', sentiment: 'positive' },
      HeadNodYes: { duration: 2.59, status: 'speakingGesture', sentiment: 'positive' },
      ThoughtfulHeadNod: { duration: 2.93, status: 'speakingGesture', sentiment: 'positive' },
      Dismiss: { duration: 2.95, status: 'speakingGesture', sentiment: 'negative' },
      ShakingHeadNo: { duration: 1.81, status: 'speakingGesture', sentiment: 'negative' },
      ThoughtfulHeadShake: { duration: 3.06, status: 'speakingGesture', sentiment: 'negative' },
      Waving: { duration: 4.41 - 1, status: 'greeting', sentiment: 'positive' },
      StandingGreeting: { duration: 5.06, status: 'greeting', sentiment: 'positive' },
      DwarfIdle: { duration: 4.43 - 1, status: 'idleGesture', sentiment: 'neutral' },
      LookAround: { duration: 13.35 - 1.5, status: 'idleGesture', sentiment: 'neutral' },
      NeckStretching: { duration: 3.20, status: 'idleGesture', sentiment: 'neutral' },
      Yawn: { duration: 8.35, status: 'idleGesture', sentiment: 'neutral' },
      HappyIdle: { duration: 2.00, status: 'idle', sentiment: 'positive' },
      Idle: { duration: 8.35, status: 'idle', sentiment: 'neutral' },
      LeanIdle: { duration: 8.35, status: 'idle', sentiment: 'neutral' },
      StandingIdle: { duration: 6.01, status: 'idle', sentiment: 'neutral' },
      HandRaising: { duration: 3.86 - 1.5, status: 'intro', sentiment: 'positive' },
      PointingGesture: { duration: 2.31 - 1, status: 'none', sentiment: 'positive' },
      Talking: { duration: 2.09, status: 'none', sentiment: 'neutral' }
    }
  );
}

