import React, { useState } from "react";
import axios from "axios";

export default function InputBox({ setText, textMode, setBotText }) {
  const [input, setInput] = useState("");

  function send(event) {
    event.preventDefault();
    setText(input);
    setInput("");
    setBotText("em . . .");
    if (input) {
      console.log(input);
      return axios({
        method: "POST",
        url: "/api/openai/textToSpeech",
        data: JSON.stringify({ input }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("React render stage", res);
          // setAudio(`/${res.data.audioID}.mp3`);

          setBotText(res.data.aiText);
        })
        .catch((e) => console.log(e.input));
    }
  }

  return (
    <div className="input-box-container__text">
      <div className="chat-bar">
        <form className="chat-bar__message" onSubmit={(event) => send(event)}>
          <input
            className="chat-bar__input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Chat Message..."
          />
        </form>
        <div className="chat-bar__send" onClick={send}>
          <i className="material-icons">send</i>
        </div>
      </div>
    </div>
  );
}
