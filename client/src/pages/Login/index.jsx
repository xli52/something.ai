import React, { useState } from "react";
import "./styles.scss";

import LoginModal from "./LoginModal";

export default function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // for logout /user/logout
  return (
    <main>
      {/* <Nav loginBtn={false} signupBtn /> */}
      <LoginModal showLogin={true} showCloseBtn={false} />
    </main>
  );
}
