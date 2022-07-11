import "./App.scss";
import React, { useState } from "react";
import Nav from "./Nav";
import Chat from "./Chat";
import Home from "./Home";
import Setup from "./Setup";
import Login from "./Login";

const HOME = "HOME";
const CHAT = "CHAT";
const SETUP = "SETUP";

function App() {
  const [page, setPage] = useState(HOME);
  const [show, setShow] = useState("noShow");

  return (
    <>
      <Nav setPage={setPage} setShow={setShow} />

      <main>
        <Login show={show} setShow={setShow} />
        {page === HOME && <Home setPage={setPage} />}
        {page === CHAT && <Chat />}
        {page === SETUP && <Setup />}
      </main>
    </>
  );
}

export default App;
