import React, { useState } from "react";
import "./styles.scss";

import LoginModal from "./LoginModal";

export default function Login(props) {
  console.log("from login index:", props);

  // for logout /user/logout
  return (
    <main>
      <LoginModal
        showLogin={true}
        showCloseBtn={false}
        setLoggedUser={props.setLoggedUser}
      />
    </main>
  );
}
