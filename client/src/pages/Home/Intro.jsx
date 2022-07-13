import React from "react";
import useNavigation from "../../hooks/useNavigation";

export default function Intro(props) {
  const { setupPage } = useNavigation();

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
        onClick={setupPage}
      >
        Let's Chat
      </button>
    </div>
  );
}
