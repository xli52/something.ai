import React from "react";

export default function Nav() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1 className="main">something</h1>
          <span className="sub">.AI</span>
        </div>
        <nav>
          <button className="btn">Login</button>
          <button className="btn btn2">Start Chat</button>
        </nav>
      </div>
    </header>
  );
}
