import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Socket(props) {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [to, setTo] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    // Connect to server
    const socket = io("/");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("user", (msg) => {
      setMessages((prev) => [`${msg.from} says:" ${msg.text}`, ...prev]);
    });

    socket.on("server", (msg) => {
      setMessages((prev) => [msg, ...prev]);
    });

    socket.on("name", (data) => {
      setName(data);
    });

    return () => socket.disconnect(); // prevents memory leak!
  }, []);

  const list = messages.map((msg) => <li>{msg}</li>);

  const send = function () {
    socket.emit("message", { to, text });
  };

  return (
    <div className="App">
      <h1>Web Sockets React</h1>
      <div className="email">{name}</div>

      <div>
        <input
          onChange={(event) => setTo(event.target.value)}
          value={to}
          placeholder="Recipient"
        />
      </div>

      <div>
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
      </div>
      <button onClick={send}>Send</button>

      <button onClick={() => setMessages([])}>Clear</button>
      <ul>{list}</ul>
    </div>
  );
}
