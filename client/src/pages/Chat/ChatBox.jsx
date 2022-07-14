import { useState } from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";

export default function ChatBox(props) {
  const [input, setInput] = useState("");
  const [audio, setAudio] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("axios outgoing request");
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
        setAudio(`/${res.data.audioID}.mp3`);
        setInput("");
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      {" "}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="input"
          placeholder="Ask me a question"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="Get a response" />
      </form>
      <ReactAudioPlayer src={audio} autoPlay={true} controls />
    </>
  );
}
