import React, { useState } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import getCharacterList from '../../helpers/getCharacterList';
import useCharacter from "../../hooks/useCharacter";

const characterList = getCharacterList();

export default function Setup() {
  const [bgColor, setBgColor] = useState("bg1");
  const { character, nextChar, lastChar } = useCharacter();
  const mainBodyClass = `setupMainBody ${bgColor}`;

  return (
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
    </div>
  );
}
