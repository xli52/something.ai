import React, { useState, useContext, useEffect } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";
import { characterContext } from "../../contexts/CharacterContext";
import UnlockModal from "./UnlockModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Setup({ unlocked }) {
  const { character, nextChar, lastChar, bgColor, setBgColor } =
    useContext(characterContext);

  const [layer, setLayer] = useState(false);

  useEffect(() => {
    unlockCheck(unlocked, character);
  }, [character]);

  function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function unlockCheck(unlocked, character) {
    if (!unlocked.includes(character.name)) {
      console.log("locked");
      setLayer(true);
    } else {
      setLayer(false);
    }
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
          <ModelDisplay character={character} layer={layer} />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="rightArrow"
            onClick={nextChar}
          />
        </div>
        <SetupBox setBgColor={setBgColor} layer={layer} />
      </div>
    </main>
  );
}
