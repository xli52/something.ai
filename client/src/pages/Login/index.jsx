import React, { useState } from "react";
import "./styles.scss";
import Nav from "../../components/Nav";

import useNavigation from "../../hooks/useNavigation";
import LoginModal from "./LoginModal";

export default function Login(props) {
  return (
    <main>
      {/* <Nav loginBtn={false} signupBtn /> */}
      <LoginModal showLogin={true} showCloseBtn={false} />
    </main>
  );
}
