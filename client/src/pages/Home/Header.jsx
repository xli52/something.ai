import React from "react";
import hero from '../../assets/hero.png'
import useNavigation from "../../hooks/useNavigation";

export default function Header(props) {

  const { setupPage } = useNavigation();

  return (
    <>
      <div className="home-header">
        <img src={hero} className="home-header-image" />
        <div className="home-intro">
          <div className="home-intro-title">GPT-3 Powered AI Chat Bot</div>
          <div className="home-intro-subtitle">Powerful, knowledgeable and entertaining</div>
          <button className="home-intro-btn" onClick={setupPage}>
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}