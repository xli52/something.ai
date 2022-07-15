import { useState } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

export default function ChatBox(props) {
  const [message, setMessage] = useState("");
  const [audio, setAudio] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("axios outgoing request");
    setAudio("");
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
        setMessage("");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      {" "}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="message"
          placeholder="Ask me a question"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Get a response" />
      </form>
      <ReactAudioPlayer src={audio} autoPlay={true} controls />
    </>
  );
}
