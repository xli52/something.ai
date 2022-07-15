import React, { useState, useContext } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";
import { characterContext } from "../../contexts/CharacterContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Setup() {

  const { character, nextChar, lastChar, bgColor, setBgColor } = useContext(characterContext);
  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main>
      <div className={`setupMainBody ${bgColor}`}>
        <h1>{capFirstLetter(character.name)}</h1>
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
      </div>
    </main>
  );
}
