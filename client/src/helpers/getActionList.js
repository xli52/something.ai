export default function getActionList() {

  return (
    {
      Angry: {name: 'Angry', duration: 38.33333206176758, loop: false, status: 'speakingGesture', sentiment: 'netural'},
      StandingIdle: {name: 'StandingIdle', duration: 6,  loop: true, status: 'idle', sentiment: 'netural'},
      PullingLever: {name: 'PullingLever', duration: 6.25, loop: false, status: 'idleGesture', sentiment: 'netural'},
      HipHopDancing: {name: 'HipHopDancing', duration: 7.041666507720947, loop: false, status: 'idleGesture', sentiment: 'netural'},
      ArmStretching: {name: 'ArmStretching', duration: 8.833333015441895, loop: false, status: 'idleGesture', sentiment: 'netural'},
      LookAround: {name: 'LookAround', duration: 13.333333015441895, loop: false, status: 'idleGesture', sentiment: 'netural'},
      NeckStretching: {name: 'NeckStretching', duration: 3.1666667461395264, loop: false, status: 'idleGesture', sentiment: 'netural'},
      Yawn: {name: 'Yawn', duration: 8.333333015441895, loop: false, status: 'idleGesture', sentiment: 'netural'},
      HeadGesture: {name: 'HeadGesture', duration: 3.125, loop: false, status: 'speakingGesture', sentiment: 'netural'},
      HeadNodYes: {name: 'HeadNodYes', duration: 2.5833332538604736, loop: false, status: 'speakingGesture', sentiment: 'positive'},
      ShakingHeadNo: {name: 'ShakingHeadNo', duration: 1.7916666269302368, loop: false, status: 'speakingGesture', sentiment: 'negative'},
      ThoughtfulHeadNod: {name: 'ThoughtfulHeadNod', duration: 2.9166667461395264, loop: false, status: 'speakingGesture', sentiment: 'positive'},
      ThoughtfulHeadShake: {name: 'ThoughtfulHeadShake', duration: 3.0416667461395264, loop: false, status: 'speakingGesture', sentiment: 'negative'},
      StandingGreeting: {name: 'StandingGreeting', duration: 4.708333492279053, loop: false, status: 'greeting', sentiment: 'positive'},
      Waving: {name: 'Waving', duration: 4.416666507720947, loop: false, status: 'greeting', sentiment: 'positive'}
    }
  );
}