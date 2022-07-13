import React from "react";
import useNavigation from '../hooks/useNavigation';

export default function Nav({ loginBtn, signupBtn }) {

  const { homePage, loginPage, signupPage } = useNavigation();

  return (
    <header>
      <div className="container">
        <div
          className="logo"
          onClick={homePage}
        >
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          {loginBtn &&
            <button
              className="btn"
              onClick={loginPage}
            >
              Login
            </button>
          }
          {signupBtn &&
            <button
              className="btn btn2"
              onClick={signupPage}
            >
              Sign Up
            </button>
          }
        </nav>
      </div>
    </header>
  );
}
