import React, { useState } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

export default function InputBox({ setUserText, setBotText, textMode }) {

  const [message, setMessage] = useState('');
  const [audio, setAudio] = useState("");

  function handleSend(event) {
    if (message) {
      event.preventDefault();
      setUserText(message);
      setMessage('');

      // Send message to api
      return axios({
        method: "POST",
        url: "/api/openai/textToSpeech",
        data: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("React render stage", res);
          setAudio(`/${res.data.audioID}.mp3`);
          setBotText(res.data.aiText);
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <div className="input-box-container__text">
      <ReactAudioPlayer src={audio} autoPlay={false} controls />
      <div className="chat-bar">
        <form className="chat-bar__message" onSubmit={event => handleSend(event)}>
          <input
            className="chat-bar__input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Sent Message..."
          />
        </form>
        <div className="chat-bar__send" onClick={handleSend}>
          <i className="material-icons">send</i>
        </div>
      </div>
    </div>
  );
}