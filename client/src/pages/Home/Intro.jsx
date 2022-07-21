import React from "react";
import useNavigation from "../../hooks/useNavigation";

export default function Intro(props) {
  const { setupPage } = useNavigation();

  return (
    <div className="introBody">
      <h1 className="center">Want to chat ?</h1>
      <div className="line right"></div>
      <h2 className="right">But all your friends are busy ?</h2>
      <div className="line left"></div>
      <h2 className="left">Do you have a secert but cannot tell anyone ?</h2>
      <h2 className="right">or, you get no friends ....</h2>
      <h2 className="center">No worries. We've got you !</h2>
      <button
        className="btn"
        onClick={setupPage}
      >
        Let's Chat
      </button>
    </div>
  );
}
