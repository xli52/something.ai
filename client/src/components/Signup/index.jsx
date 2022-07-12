import React, { useState } from "react";
import "./styles.scss";

export default function SignUp() {
  const [signUp, setSignUp] = useState({});
  const submitSignUp = function () {
    console.log(signUp);
  };

  return (
    <div className={modalClass}>
      <form
        className="formGroup"
        onSubmit={(e) => {
          e.preventDefault();
          submitSignUp();
        }}
      >
        <FontAwesomeIcon
          className="close"
          icon={faXmark}
          onClick={() => {
            props.setShow("noShow");
          }}
        ></FontAwesomeIcon>
        <h2>Sign Up</h2>

        <input
          placeholder="Username"
          type="text"
          value={email}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
