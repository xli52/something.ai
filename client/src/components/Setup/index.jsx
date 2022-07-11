import React, { useState } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Setup() {
  const [bgColor, setBgColor] = useState("bg1");
  const [aVa, setAva] = useState();
  const mainBodyClass = `setupMainBody ${bgColor}`;

  return (
    <div className={mainBodyClass}>
      <div className="mdSetup">
        <FontAwesomeIcon icon={faCircleChevronLeft} className="leftArrow" />
        <ModelDisplay />
        <FontAwesomeIcon icon={faCircleChevronRight} className="rightArrow" />
      </div>
      <SetupBox setBgColor={setBgColor} setAv={setAva} />
    </div>
  );
}
