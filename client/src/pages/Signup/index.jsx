import React from "react";
import "./styles.scss";

import SignUpModal from "./SignUpModal";

export default function SignUp(props) {
  return (
    <main>
      {/* <Nav loginBtn signupBtn={false} /> */}
      <SignUpModal showSignUp={true} showCloseBtn={false} />
    </main>
  );
}
