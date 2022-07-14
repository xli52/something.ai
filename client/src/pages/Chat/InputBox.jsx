import React, { useState } from "react";

export default function InputBox({ setText, textMode }) {

  const [message, setMessage] = useState('');

  function send(event) {
    if (message) {
      event.preventDefault();
      setText(message);
      setMessage('');
      // Send message to api here
      
    }
  };

  return (
    <div className="input-box-container__text">
      <div className="chat-bar">
        <form className="chat-bar__message" onSubmit={event => send(event)}>
          <input
            className="chat-bar__input"
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
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