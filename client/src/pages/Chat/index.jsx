import React, { useState } from "react";
import ChatScene from "./ChatScene";
import InputBox from "./InputBox";
import Bubble from "../../components/Bubble";

import "./styles.scss";

export default function Chat(props) {
  const [userText, setUserText] = useState("");
  const [botText, setBotText] = useState("Hello Human!");

  return (
    <main>
      <div className="chat-container">
        <div className="chat-scene-container">
          <ChatScene />
          <InputBox setText={setUserText} setBotText={setBotText} />
          {userText && (
            <Bubble text={userText} user bot={false} setText={setUserText} />
          )}
          {botText && (
            <Bubble text={botText} user={false} bot setText={setBotText} />
          )}
        </div>
      </div>
    </main>
  );
}
