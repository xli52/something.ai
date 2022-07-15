import React, { useState, useContext } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import { ReactMic } from "react-mic";
import blobToBase64 from "blob-to-base64";

import { characterContext } from "../../contexts/CharacterContext";

export default function InputBox({ setUserText, setBotText, textMode }) {
  const { character } = useContext(characterContext);
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState("");
  const [gender] = useState(character.gender);
  const [record, setRecord] = useState(false);

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onStop = (recordedBlob) => {
    setUserText(". . .");
    setBotText("em . . . ");
    return blobToBase64(recordedBlob.blob, (error, base64) => {
      if (!error) {
        return axios({
          method: "POST",
          url: "/api/openai/speechToText",
          data: JSON.stringify({ base64 }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log("sucessfully finished", res);
            setAudio(`/${res.data.audioID}.mp3`);
            setUserText(res.data.requestedText);
            setBotText(res.data.aiText);
          })
          .catch((e) => console.log(e));
      } else {
        console.log(error);
        return;
      }
    });
  };

  function handleSendMsg(event) {
    if (message) {
      event.preventDefault();
      setUserText(message);
      setMessage("");

      // Send message to api
      return axios({
        method: "POST",
        url: "/api/openai/textToSpeech",
        data: JSON.stringify({ message, gender }),
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
  }

  return (
    <div className="input-box-container__text">
      <ReactAudioPlayer src={audio} autoPlay={true} />
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={onStop}
        mimeType="audio/webm"
        sampleRate={24000}
      />
      <div className="chat-bar">
        <form
          className="chat-bar__message"
          onSubmit={(event) => handleSendMsg(event)}
        >
          <input
            className="chat-bar__input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Sent Message..."
          />
        </form>
        <div className="chat-bar__send" onClick={handleSendMsg}>
          <i className="material-icons">send</i>
        </div>
      </div>
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        type="button"
      >
        <i className="material-icons">mic</i>
      </button>
      <button>
        <i className="material-icons">volume_up</i>
      </button>
    </div>
  );
}
