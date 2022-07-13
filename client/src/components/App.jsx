import "./App.scss";
import React, { useState } from "react";
import Nav from "./Nav";
import Chat from "./Chat";
import Home from "./Home";
import Setup from "./Setup";
import Login from "./Login";
import SignUp from "./Signup";
import ChatBox from "./Chat/ChatBox";
import UserLogin from "./Login/UserLogin";

const HOME = "HOME";
const CHAT = "CHAT";
const SETUP = "SETUP";

function App() {
  const [page, setPage] = useState(HOME);
  const [logInShow, setLogInShow] = useState("noShow");
  const [signUpShow, setSignUpShow] = useState("noShow");

  return (
    <>
      <ChatBox />
      <UserLogin />
      {/* <Nav
        setPage={setPage}
        setLogInShow={setLogInShow}
        setSignUpShow={setSignUpShow}
      />

      <main>
        <Login show={logInShow} setShow={setLogInShow} />
        <SignUp show={signUpShow} setShow={setSignUpShow} />
        {page === HOME && <Home setPage={setPage} />}
        {page === CHAT && <Chat />}
        {page === SETUP && <Setup />}
      </main> */}
    </>
  );
}

export default App;
