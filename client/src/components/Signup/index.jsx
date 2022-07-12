import React, { useState } from "react";
import "./styles.scss";

export default function Signup() {
  return (
    <div className={modalClass}>
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
