export default function getActionList() {
  const offset = 1;
  return (
    {
      Angry:               {duration: 38.33,          gender: 'neutral', status: 'speakingGesture', sentiment: 'negative' },
      StandingIdle:        {duration: 6.00,           gender: 'female',  status: 'idle',            sentiment: 'neutral'  },
      HipHopDancing:       {duration: 7.04,           gender: 'neutral', status: 'idleGesture',     sentiment: 'neutral'  },
      ArmStretching:       {duration: 8.83  - offset, gender: 'male',    status: 'idleGesture',     sentiment: 'neutral'  },
      LookAround:          {duration: 13.33 - offset, gender: 'male',    status: 'idleGesture',     sentiment: 'neutral'  },
      NeckStretching:      {duration: 3.16,           gender: 'neutral', status: 'idleGesture',     sentiment: 'neutral'  },
      Yawn:                {duration: 8.33,           gender: 'neutral', status: 'idleGesture',     sentiment: 'neutral'  },
      HeadGesture:         {duration: 3.12,           gender: 'neutral', status: 'speakingGesture', sentiment: 'neutral'  },
      HeadNodYes:          {duration: 1,              gender: 'neutral', status: 'speakingGesture', sentiment: 'positive' },
      ShakingHeadNo:       {duration: 1.79,           gender: 'neutral', status: 'speakingGesture', sentiment: 'negative' },
      ThoughtfulHeadNod:   {duration: 1,              gender: 'neutral', status: 'speakingGesture', sentiment: 'positive' },
      ThoughtfulHeadShake: {duration: 1,              gender: 'neutral', status: 'speakingGesture', sentiment: 'negative' },
      StandingGreeting:    {duration: 4.70,           gender: 'female',  status: 'greeting',        sentiment: 'positive' },
      Waving:              {duration: 4.41 - offset,  gender: 'neutral', status: 'greeting',        sentiment: 'positive' }
    }
  );
}