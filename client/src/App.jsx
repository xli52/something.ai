import "./App.scss";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Setup from "./pages/Setup";
import Chat from "./pages/Chat";
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<h1 align="center">Error 404: Page Not Found!</h1>} />
    </Routes>
  );
}

export default App;
