import React from "react";

const SETUP = "SETUP";

export default function Intro(props) {
  return (
    <div className="introBody">
      <h1 className="center">What to chat ?</h1>
      <div className="line right"></div>
      <h2 className="right">But all your friend busy ?</h2>
      <div className="line left"></div>
      <h2 className="left">You have a secert cannot tell anyone ?</h2>
      <h2 className="right">or, you get no friend ....</h2>
      <h2 className="center">No worry, We get it !</h2>
      <button
        className="btn"
        onClick={() => {
          props.setPage(SETUP);
        }}
      >
        Let's have a talk
      </button>
    </div>
  );
}
