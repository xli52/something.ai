import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { ReactMic } from "react-mic";
import blobToBase64 from "blob-to-base64";

export default function AudioChat(props) {
  const [record, setRecord] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [audio, setAudio] = useState("");

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("recordedBlob is: ", recordedBlob);
    console.log(recordedBlob.blobURL);
    return blobToBase64(recordedBlob.blob, (error, base64) => {
      if (!error) {
        if (recordedBlob.stopTime - recordedBlob.startTime < 1000) {
          console.log("Please record your input again");
        } else {
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
              setRecognizedText(res.data.recognizedText);
            })
            .catch((e) => console.log(e));
        }
      } else {
        console.log(error);
        return;
      }
    });
  };

  return (
    <div>
      <ReactAudioPlayer src={audio} autoPlay={true} controls />
      <div className="recorder-wave">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#6d69ea"
          mimeType="audio/webm"
          sampleRate={24000}
        />
        <div className="recorder-btn">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            type="button"
          >
            Click &amp; Hold to record
          </button>
        </div>
      </div>
      <div className="recorder-response">{recognizedText}</div>
    </div>
  );
}
