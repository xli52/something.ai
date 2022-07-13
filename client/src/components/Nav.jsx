import React from "react";
import useNavigation from "../hooks/useNavigation";
import { useLocation } from "react-router-dom";

export default function Nav({
  loginBtn,
  signupBtn,

  setShowLogin,
  setShowSignUp,
}) {
  const { homePage, loginPage, signupPage } = useNavigation();

  const { pathname } = useLocation();

  return (
    <header>
      <div className="container">
        <div className="logo" onClick={homePage}>
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          {pathname !== "/login" && pathname !== "/signup" && (
            <>
              <button
                className="btn"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </button>

              <button
                className="btn btn2"
                onClick={() => {
                  setShowSignUp(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
