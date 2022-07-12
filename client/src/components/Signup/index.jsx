import React, { useState } from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function SignUp(props) {
  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });
  let modalClass = `popModal ${props.show}`;

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    setSignUp({ ...signUp, [name]: value });
  };

  // Need axios send to backend... /user/register
  const submitSignUp = function (e) {
    e.preventDefault();
    console.log(signUp);
    setSignUp({ email: "", password: "" });
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
          value={signUp["confirmPass"]}
          onChange={handleChange}
          required
          min={3}
        />
        <button className="btn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}
