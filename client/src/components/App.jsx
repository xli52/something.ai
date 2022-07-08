import "./App.scss";

import React, { useState } from "react";

import Chat from "./Chat";
import Nav from "./Nav";
import Home from "./Home";

const HOME = "HOME";
const CHAT = "CHAT";

function App() {
  const [page, setPage] = useState(HOME);

  return (
    <>
      <Nav setPage={setPage} />
      <main>
        {page === HOME && <Home setPage={setPage} />}
        {page === CHAT && <Chat />}
      </main>
    </>
  );
}

export default App;
