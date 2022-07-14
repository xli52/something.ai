import React from "react";
import "./styles.scss";

import SignUpModal from "./SignUpModal";

export default function SignUp(props) {
  return (
    <main>
      <SignUpModal
        showSignUp={true}
        showCloseBtn={false}
        setLoggedUser={props.setLoggedUser}
      />
    </main>
  );
}
