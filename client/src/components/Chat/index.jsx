import React from "react";
import ChatScene from "./ChatScene";
import ChatBox from "./ChatBox";

export default function Chat(props) {
  return (
    <div className="chat-container">
      <div className="chat-scene-container">
        <ChatScene />
      </div>
      <ChatBox />
    </div>
  );
}