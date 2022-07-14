import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function LoginModal(props) {
  const [login, setLogin] = useState({ email: "", password: "" });

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Need axios send to backend.../user/login
  // will get res.json(userID) for success

  const submitLogin = function (e) {
    e.preventDefault();
    console.log(login);
    return axios({
      method: "POST",
      url: "/user/login",
      data: { ...login },
      contentType: { "Content-Type": "application/json" },
    }).then((res) => {
      props.setShowLogin(false);
      console.log("Login status: ", res);
      setLogin({ email: "", password: "" });
    });
  };

  // Get path name
  const { pathname } = useLocation();

  // Return true if not login and signup path
  const checkPath = () => {
    if (pathname === "/login" || pathname === "/signup") {
      return false;
    }
    return true;
  };

  // Use checkPath get to set z-index to 0
  let modalClass = `popModal ${props.showLogin ? "show" : "noShow"} ${
    checkPath() ? "" : "bottom"
  }`;

  return (
    <div className={modalClass}>
      <form
        className="formGroup"
        onSubmit={(e) => {
          submitLogin(e);
        }}
      >
        {props.showCloseBtn && (
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={() => {
              props.setShowLogin(false);
            }}
          ></FontAwesomeIcon>
        )}

        <h2>LOGIN</h2>

        <input
          placeholder="Email"
          type="email"
          name="email"
          value={login["email"]}
          onChange={handleChange}
          required
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={login["password"]}
          onChange={handleChange}
          required
          minLength={3}
        />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
