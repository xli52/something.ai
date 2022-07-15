import React, { useState, useContext } from "react";
import ChatScene from "./ChatScene";
import InputBox from "./InputBox";
import Bubble from "../../components/Bubble";
import { characterContext } from "../../contexts/CharacterContext";

import "./styles.scss";

export default function Chat(props) {

  const [userText, setUserText] = useState('');
  const [botText, setBotText] = useState('');
  const { bgColor } = useContext(characterContext);

  return (
    <main>
      <div className={`chat-container ${bgColor}`}>
        <div className="chat-scene-container">
          <ChatScene />
          <InputBox
            setUserText={setUserText}
            setBotText={setBotText}
          />
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
