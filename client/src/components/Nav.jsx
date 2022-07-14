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

  // Get path
  const { pathname } = useLocation();

  return (
    <header>
      <div className="container">
        <div className="logo" onClick={homePage}>
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          {/* If path is login and signup, Don't show button and force user only choice home or finish task */}
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
