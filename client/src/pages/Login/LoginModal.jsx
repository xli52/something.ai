import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginModal(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  // Get path name
  const { pathname } = useLocation();

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    if (msg) {
      setMsg();
    }
    setLogin({ ...login, [name]: value });
  };

  const getUnlockArray = function (characters) {
    let result = [];
    for (let character of characters) {
      result.push(character.name.toLowerCase());
    }
    console.log(result);
    props.setUnlocked(result);
  };

  const submitLogin = function (e) {
    e.preventDefault();
    console.log(login);
    return axios({
      method: "POST",
      url: "/user/login",
      data: { ...login },
      contentType: { "Content-Type": "application/json" },
    }).then((res) => {
      console.log("Login status: ", res.data);
      // If res is object mean success
      if (typeof res.data === "object") {
        props.setLoggedUser(res.data.username);

        setLogin({ email: "", password: "" });
        localStorage.setItem("user", res.data.username);

        getUnlockArray(res.data.characters);

        if (!checkPath()) {
          return navigate("../", { replace: true });
        }

        props.setShowLogin(false);
      } else {
        setMsg(res.data);
      }
    });
  };

  // Return false for login and signup path
  const checkPath = function () {
    if (pathname === "/login" || pathname === "/signup") {
      return false;
    }
    return true;
  };

  // Use checkPath get to set z-index to 0
  let modalClass = `popModal ${props.showLogin ? "show" : "noShow"} ${
    checkPath() ? "" : "bottom"
  }`;

  // console.log(props);

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
        {msg && <h3 className="error">{msg}</h3>}
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
