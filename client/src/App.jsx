import "./App.scss";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Setup from "./pages/Setup";
import Chat from "./pages/Chat";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LoginModal from "./pages/Login/LoginModal";
import SignUpModal from "./pages/Signup/SignUpModal";
import CharacterProvider from "./contexts/CharacterContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedUser, setLoggedUser] = useState();
  const [unlocked, setUnlocked] = useState(["jane"]);

  useEffect(() => {
    const foundUser = localStorage.getItem("user");
    if (foundUser) {
      setLoggedUser(foundUser);
    }
  }, []);

  return (
    <>
      <Nav
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                setShowLogin={setShowLogin}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setShowSignUp={setShowSignUp}
                setLoggedUser={setLoggedUser}
              />
            }
          />
          <Route
            path="/setup"
            element={
              <Setup
                unlocked={unlocked}
                setShowLogin={setShowLogin}
                loggedUser={loggedUser}
              />
            }
          />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="*"
            element={
              <div className="errorClass">
                <h1>Error 404: Page Not Found!</h1>
              </div>
            }
          />
        </Routes>
      </CharacterProvider>
      {showLogin && (
        <LoginModal
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setLoggedUser={setLoggedUser}
          showCloseBtn
        />
      )}
      {showSignUp && (
        <SignUpModal
          showSignUp={showSignUp}
          setShowSignUp={setShowSignUp}
          setLoggedUser={setLoggedUser}
          showCloseBtn
        />
      )}
    </>
  );
}

export default App;
