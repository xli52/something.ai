import React from "react";
import Nav from "../../components/Nav";
import ChatScene from "./ChatScene";
import ChatBox from "./ChatBox";

import "./styles.scss";

export default function Chat(props) {
  return (
    <main>
      {/* <Nav loginBtn={false} signupBtn={false}/> */}
      <div className="chat-container">
        <div className="chat-scene-container">
          <ChatScene />
        </div>
        <div className="chat-box-container">
          <ChatBox />
        </div>
      </div>
    </main>
  );
}
