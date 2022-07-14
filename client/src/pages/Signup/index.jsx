import React, { useState } from "react";
import Nav from "../../components/Nav";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useNavigation from "../../hooks/useNavigation";
import axios from "axios";

export default function SignUp(props) {
  const [confirmPass, setConfirmPass] = useState("");
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { homePage } = useNavigation();

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
      return alert("Password not same!!");
    }
    console.log(signUp);

    return axios({
      method: "POST",
      url: "/user/register",
      data: { ...signUp },
      contentType: "application/json",
    }).then((res) => {
      console.log("Registration status: ", res);
      setSignUp({
        username: "",
        email: "",
        password: "",
      });
      setConfirmPass("");
    });
  };

  let modalClass = `signuppopModal ${props.show}`;

  return (
    <main>
      <Nav loginBtn signupBtn />
      <div className={modalClass}>
        <form
          className="formGroup"
          onSubmit={(e) => {
            submitSignUp(e);
          }}
        >
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={homePage}
          ></FontAwesomeIcon>
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
            min={3}
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
            min={3}
          />
          <button className="btn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </main>
  );
}
