import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./styles.scss";

import SignUpModal from "./SignUpModal";

export default function SignUp(props) {
  return (
    <main>
      <Nav loginBtn signupBtn />
      <SignUpModal showSignUp={true} showCloseBtn={false} />
    </main>
  );
}
