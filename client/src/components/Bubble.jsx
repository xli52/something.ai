import React from "react";
import classNames from 'classnames';
import './Bubble.scss';

export default function Bubble({ text, user, bot, setText }) {

  const bubbleClass = classNames(
    'speech-bubble',
    { 'speech-bubble--user': user },
    { 'speech-bubble--bot': bot }
  );

  const bubbleTailClass = classNames(
    'bubble-tail',
    { 'bubble-tail--user': user },
    { 'bubble-tail--bot': bot }
  );

  return (
    <div className={bubbleClass}>
      {text}
      <div className={bubbleTailClass}></div>
      <i className="material-icons" onClick={() => setText('')}>close</i>
    </div>
  );
}