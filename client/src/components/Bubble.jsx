import React from "react";
import classNames from 'classnames';
import './Bubble.scss';

export default function Bubble({ text, setText, user, bot, typing }) {

  const bubbleClass = classNames(
    'speech-bubble',
    { 'speech-bubble--user': user },
    { 'speech-bubble--bot': bot },
  );

  const bubbleTailClass = classNames(
    'bubble-tail',
    { 'bubble-tail--user': user },
    { 'bubble-tail--bot': bot }
  );

  return (
    <>
      <div className={bubbleClass}>
        {!typing && text}
        {typing &&
          <div className="typing">
            <div className="ellipsis one"></div>
            <div className="ellipsis two"></div>
            <div className="ellipsis three"></div>
          </div>
        }
        <div className={bubbleTailClass}></div>
        <i className="material-icons" onClick={() => setText('')}>close</i>
      </div>
    </>
  );
}