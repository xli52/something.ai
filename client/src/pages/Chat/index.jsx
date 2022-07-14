import React, { useState } from "react";
import Nav from '../../components/Nav';
import ChatScene from "./ChatScene";
import InputBox from "./InputBox";
import Bubble from "../../components/Bubble";

import './styles.scss';

export default function Chat(props) {

  const [userText, setUserText] = useState('');
  const [botText, setBotText] = useState('Font family names must either be given quoted as strings, or unquoted as a sequence of one or more identifiers. This means that punctuation characters and digits at the start of each token must be escaped in unquoted font family names.');

  return (
    <main>
      <Nav loginBtn={false} signupBtn={false} />
      <div className="chat-container">
        <div className="chat-scene-container">
          <ChatScene />
          <InputBox setText={setUserText} />
          {userText &&
            <Bubble
              text={userText}
              user
              bot={false}
              setText={setUserText}
            />
          }
          {botText &&
            <Bubble
              text={botText}
              user={false}
              bot
              setText={setBotText}
            />
          }
        </div>
      </div>
    </main>
  );
}