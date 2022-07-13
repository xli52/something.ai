import React, { useState } from "react";
import "./styles.scss";
import Nav from '../../components/Nav';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import useNavigation from "../../hooks/useNavigation";

export default function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  let modalClass = `popModal ${props.show}`;

  const { homePage } = useNavigation();

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
    setLogin({ email: "", password: "" });
  };

  // for logout /user/logout
  return (
    <main>
      <Nav loginBtn signupBtn />
      <div className={modalClass}>
        <form
          className="formGroup"
          onSubmit={(e) => {
            submitLogin(e);
          }}
        >
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={homePage}
          ></FontAwesomeIcon>
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
            min={3}
          />
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
