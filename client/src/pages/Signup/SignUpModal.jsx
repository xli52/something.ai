import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

export default function SignUpModal(props) {
  const [msg, setMsg] = useState();
  const [confirmPass, setConfirmPass] = useState("");
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Get recent path
  const { pathname } = useLocation();

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  // Check password and confirm password same or not
  const passwordCheck = function (signUp, confirmPass) {
    let password = signUp["password"].trim();
    let conPass = confirmPass.trim();
    if (password === conPass) {
      return true;
    }
    return false;
  };

  // Need axios send to backend... /user/register
  const submitSignUp = function (e) {
    e.preventDefault();
    if (!passwordCheck(signUp, confirmPass)) {
      return setMsg("Password and confirm password not same!");
    }
    console.log(signUp);
    setSignUp({
      username: "",
      email: "",
      password: "",
    });
  };

  // If it is not login or signup path return true
  const checkPath = () => {
    if (pathname === "/login" || pathname == "/signup") {
      return false;
    }
    return true;
  };

  // Use checkPath to set CSS z-index for the modal
  let modalClass = `signuppopModal ${props.showSignUp ? "show" : "noShow"} ${
    checkPath() ? "" : "bottom"
  }`;

  return (
    <div className={modalClass}>
      <form
        className="formGroup"
        onSubmit={(e) => {
          submitSignUp(e);
        }}
      >
        {props.showCloseBtn && (
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={() => {
              props.setShowSignUp(false);
            }}
          ></FontAwesomeIcon>
        )}
        {msg && <h3 className="error">{msg}</h3>}
        <h2>Sign Up</h2>

        <input
          placeholder="Username"
          type="text"
          name="username"
          value={signUp["username"]}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Email"
          type="email"
          name="email"
          value={signUp["email"]}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={signUp["password"]}
          onChange={handleChange}
          required
          minLength={5}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          name="confirmPass"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
          required
          minLength={5}
        />
        <button className="btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
