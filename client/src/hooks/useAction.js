import { useState, useRef, useEffect } from "react";
import getActionList from "../helpers/getActionList";
import getTimer from "../helpers/getTimer";

const actionList = getActionList();
const actionArray = Object.keys(actionList);

export default function useAction() {
  const timer = useRef(null);
  const [action, setAction] = useState();
  //  Sentiment: negative, positive, neutral 
  //  Status: idle, speaking, greeting, error
  const [status, setStatus] = useState({});

  // Helper get functions
  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomGesture(status) {
    let noMatch = true;
    let gesture = '';
    while (noMatch) {
      const num = getRandomNum(0, actionArray.length - 1);
      if (actionList[actionArray[num]].status === status) {
        gesture = actionArray[num];
        noMatch = false;
      }
    }
    return gesture;
  }

  function getSpeakGesture(sentiment) {
    let noMatch = true;
    let gesture = 'Idle';
    while (noMatch) {
      const num = getRandomNum(0, actionArray.length - 1);
      const action = actionList[actionArray[num]]
      if (action.status === "speakingGesture" && action.sentiment === sentiment) {
        gesture = actionArray[num];
        noMatch = false;
      }
    }
    return gesture;
  }

  //  Handler functions for different status

  function handleIdle() {
    clearTimeout(timer.current);
    const gesture = getRandomGesture('idle');
    setAction(gesture);
    const num = getRandomNum(7, 15);
    timer.current = getTimer(num * 1000, playIdleGesture);
  }

  function handleGreeting() {
    clearTimeout(timer.current);
    const gesture = getRandomGesture('greeting');
    setAction(gesture);
    timer.current = getTimer(actionList[gesture].duration * 1000, () => setStatus({ status: 'idle', sentiment: 'neutral' }));
  }

  function handleThinking() {
    clearTimeout(timer.current);
    const gesture = getRandomGesture('idle');
    setAction(gesture);
  }

  function handleError() {
    clearTimeout(timer.current);
    const gesture = getSpeakGesture(status.sentiment);
    setAction(gesture);
    timer.current = getTimer(actionList[gesture].duration * 1000, () => setStatus({ status: 'idle', sentiment: 'neutral' }));
  }

  function handleSpeaking() {
    clearTimeout(timer.current);
    const gesture = getSpeakGesture(status.sentiment);
    setAction(gesture);
    timer.current = getTimer(actionList[gesture].duration * 1000, playSpeakingGesture);
  }

  function handlePureIdle() {
    clearTimeout(timer.current);
    const options = ['Idle', 'StandingIdle'];
    const num = getRandomNum(0, 1);
    setAction(options[num]);
  }

  function handleIntro() {
    clearTimeout(timer.current);
    const options = ['greeting', 'greeting', 'greeting', 'intro']
    const num = getRandomNum(0, 3);
    const gesture = getRandomGesture(options[num]);
    setAction(gesture);
    timer.current = getTimer(actionList[gesture].duration * 1000, handleThinking);
  }

  //  Play action functions
  function playSpeakingGesture() {
    clearTimeout(timer.current);
    const num = getRandomNum(2, 3);
    timer.current = getTimer(num * 1000, handleSpeaking);
  }

  function playIdleGesture() {
    clearTimeout(timer.current);
    const gesture = getRandomGesture('idleGesture');
    setAction(gesture);
    timer.current = getTimer(actionList[gesture].duration * 1000, handleIdle);
  }

  useEffect(() => {
    switch (status.status) {
      case 'greeting':
        handleGreeting();
        break;
      case 'idle':
        handleIdle();
        break;
      case 'speaking':
        handleSpeaking();
        break;
      case 'thinking':
        handleThinking();
        break;
      case 'error':
        handleError();
        break;
      case 'pureIdle':
        handlePureIdle();
        break;
      case 'intro':
        handleIntro();
        break;
      default:
        clearTimeout(timer.current);
        break;
    }

    return () => clearTimeout(timer.current);
  }, [status]);

  return { action, setAction, setStatus };
}