import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import { ReactMic } from "react-mic";
import blobToBase64 from "blob-to-base64";

import { characterContext } from "../../contexts/CharacterContext";
import getTimer from "../../helpers/getTimer";
import { capFirstLetter } from "../../helpers/getHelperFunc";

const SPEAK_TIME_LIMIT = 10000;

export default function InputBox({ setUserText, setBotText, setBotTyping, setUserTyping }) {

  const { character } = useContext(characterContext);
  const [gender] = useState(character.gender);
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState("");
  const [muted, setMuted] = useState(false);
  const [record, setRecord] = useState(false);
  const [icon, setIcon] = useState('keyboard');
  const [placeholder, setPlaceHolder] = useState("Type or hold ESC key to speak...");
  const speaking = useRef(false);
  const pressCount = useRef(0);
  const keyReleased = useRef(true);
  const timer = useRef(null);

  function startRecording() {
    console.log('Start recording');
    setRecord(true);
  };

  function stopRecording() {
    setRecord(false);
    setIcon('keyboard');
    setPlaceHolder("Type or hold ESC key to speak...")
    pressCount.current = 0;
    speaking.current = false;
    console.log('Recording stopped.');
  }

  const onStop = (recordedBlob) => {

    return blobToBase64(recordedBlob.blob, (error, base64) => {
      if (!error) {
        if (recordedBlob.stopTime - recordedBlob.startTime < 1000) {
          console.log("Recording too short. Please record your input again");
        } else {
          setUserTyping(true);
          return axios({
            method: "POST",
            url: "/api/openai/speechToText",
            data: JSON.stringify({ base64 }),
            headers: { "Content-Type": "application/json" },
          })
            .then(res => {
              console.log("sucessfully finished", res);
              if (res.data.transcript) {
                const transcript = capFirstLetter(res.data.transcript);
                setUserText(transcript);
                setTimeout(() => setBotTyping(true), 300);
                sendMsgRequest(transcript);
              } else {
                setBotText("Sorry, I didn't recongize that. Could you say that again?");
              }
              setUserTyping(false);
            })
            .catch(e => {
              setUserTyping(false);
              setBotText("Sorry, something is wrong, pleaes try again later!");
              console.log(e.message);
            });
        }
      } else {
        console.log(error);
        return;
      }
    });
  };

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      pressCount.current++;
      if (pressCount.current > 1 && !speaking.current && keyReleased.current) {
        setMessage("");
        setUserTyping(false);
        setUserText("");
        setIcon('mic');
        setPlaceHolder('Listening...');
        keyReleased.current = false;
        speaking.current = true;
        clearTimeout(timer.current);
        startRecording();
        timer.current = getTimer(SPEAK_TIME_LIMIT, stopRecording);
      }
    }
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') {
      keyReleased.current = true;
      pressCount.current = 0;
      clearTimeout(timer.current);
      if (speaking.current) {
        stopRecording();
      }
    }
  }

  function handleSendMsg(e) {
    setMessage("");
    setUserTyping(false);

    if (message.trim()) {
      e.preventDefault();
      setUserText(message);
      setTimeout(() => setBotTyping(true), 300);
      sendMsgRequest(message);
    }
  }

  function sendMsgRequest(message) {
    return axios({
      method: "POST",
      url: "/api/openai/textToSpeech",
      data: JSON.stringify({ message, gender }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log("React render stage", res);
        setAudio(`/${res.data.audioID}.mp3`);
        setBotText(res.data.aiText);
        setBotTyping(false);
      })
      .catch(e => {
        setBotTyping(false);
        setBotText("Sorry, something is wrong, pleaes try again later!");
        console.log(e.message);
      });
  }

  function handleChange(e) {
    setUserText("");
    const input = e.target.value;
    setMessage(input);
    input ? setUserTyping(true) : setUserTyping(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  });

  return (
    <div className="input-box-container">
      <ReactAudioPlayer src={audio} autoPlay={true} muted={muted} />
      <div className="chat-bar">
        <div className="chat-bar__speaker" onClick={() => setMuted(!muted)}>
          {!muted && <i className="material-icons">volume_up</i>}
          {muted && <i className="material-icons">volume_off</i>}
        </div>
        <form
          className="chat-bar__message"
          onSubmit={(event) => handleSendMsg(event)}
        >
          <div className="chat-bar__mic">
            {icon === 'keyboard' && <i className="material-icons keyboard">keyboard</i>}
            {icon === 'mic' && <i className="material-icons mic">mic</i>}
          </div>
          <ReactMic
            className="sound-wave"
            visualSetting="frequencyBars"
            record={record}
            onStop={onStop}
            strokeColor={"#fcfcfc"}
            backgroundColor={"transparent"}
            mimeType="audio/webm"
            sampleRate={24000}
          />
          <input
            className="chat-bar__input"
            autoFocus
            type="text"
            value={message}
            onChange={handleChange}
            onBlur={() => {
              if (!message.trim()) {
                setMessage('');
                setUserTyping(false);
              }
            }}
            placeholder={placeholder}
          />
        </form>
        <div className="chat-bar__send" onClick={handleSendMsg}>
          <i className="material-icons">send</i>
        </div>
      </div>
    </div>
  );
}
