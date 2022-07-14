import React, { useState } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useCharacter from "../../hooks/useCharacter";

export default function Setup() {
  const [bgColor, setBgColor] = useState("bg1");
  const { character, nextChar, lastChar } = useCharacter();
  const mainBodyClass = `setupMainBody ${bgColor}`;

  return (
    <main>
      {/* <Nav loginBtn={false} signupBtn={false} /> */}
      <div className={mainBodyClass}>
        <div className="mdSetup">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="leftArrow"
            onClick={lastChar}
          />
          <ModelDisplay character={character} />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="rightArrow"
            onClick={nextChar}
          />
        </div>
        <SetupBox setBgColor={setBgColor} />
        <button>CHAT</button>
      </div>
    </main>
  );
}
