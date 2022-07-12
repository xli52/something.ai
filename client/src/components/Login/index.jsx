import React from "react";
import { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Login(props) {
  const [login, setLogin] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let modalClass = `popModal ${props.show}`;

  const submitUser = function (e) {
    e.preventDefault();
    setLogin = { email, password };
    console.log(login);
  };

  return (
    <div
      className={modalClass}
      onClick={() => {
        props.setShow("noShow");
      }}
    >
      <form className="formGroup" onSubmit={submitUser}>
        <FontAwesomeIcon
          className="close"
          icon={faXmark}
          onClick={() => {
            props.setShow("noShow");
          }}
        ></FontAwesomeIcon>
        <h2>LOGIN</h2>

        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          placeholder="Password"
          type="text"
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
