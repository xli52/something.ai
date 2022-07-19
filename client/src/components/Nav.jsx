import React, { useState, useEffect } from "react";
import useNavigation from "../hooks/useNavigation";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Nav({
  setShowLogin,
  setShowSignUp,
  loggedUser,
  setLoggedUser,
}) {
  const { homePage } = useNavigation();
  const navigate = useNavigate();

  const [showComp, setShowComp] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    buttonCheck();
  }, [pathname, loggedUser]);

  const routepath = ["/", "/home", "/chat", "/setup", "/signup", "/login"];

  const buttonCheck = () => {
    if (!routepath.includes(pathname)) {
      setShowComp(false);
    } else if (pathname === "/login" || pathname === "/signup") {
      setShowComp(false);
    } else if (loggedUser) {
      setShowComp(false);
    } else {
      setShowComp(true);
    }
  };

  const submitLogout = function (e) {
    e.preventDefault();
    return axios({
      method: "POST",
      url: "/user/logout",
      contentType: { "Content-Type": "application/json" },
    }).then((res) => {
      setLoggedUser();
      localStorage.clear();
      return navigate("../", { replace: true });
    });
  };

  return (
    <header>
      <div className="container">
        <div className="logo" onClick={homePage}>
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          {/* If path is login and signup, Don't show button and force user only choice home or finish task */}
          {showComp && (
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
          {loggedUser && (
            <>
              <h3>{loggedUser}</h3>
              <button
                className="btn"
                onClick={(e) => {
                  submitLogout(e);
                }}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
