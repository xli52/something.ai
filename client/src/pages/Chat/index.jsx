import React, { useState, useContext } from "react";
import ChatScene from "./ChatScene";
import InputBox from "./InputBox";
import Bubble from "../../components/Bubble";
import { characterContext } from "../../contexts/CharacterContext";

import "./styles.scss";

export default function Chat() {
  const [userText, setUserText] = useState("");
  const [botText, setBotText] = useState("");
  const { bgColor } = useContext(characterContext);
  const [botTyping, setBotTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  return (
    <main>
      <div className={`chat-container ${bgColor}`}>
        <div className="chat-scene-container">
          <ChatScene />
          <InputBox
            setUserText={setUserText}
            setBotText={setBotText}
            setBotTyping={setBotTyping}
            setUserTyping={setUserTyping}
          />
          {(userText || userTyping) && (
            <Bubble text={userText} user bot={false} setText={setUserText} typing={userTyping} />
          )}
          {(botText || botTyping) && (
            <Bubble text={botText} user={false} bot setText={setBotText} typing={botTyping} />
          )}
        </div>
      </div>
    </main>
  );
}
