import React, { useState } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

export default function Setup() {
  const [bgColor, setBgColor] = useState("bg1");
  const [aVa, setAva] = useState();
  const mainBodyClass = `setupMainBody ${bgColor}`;

  return (
    <div className={mainBodyClass}>
      <ModelDisplay />
      <SetupBox setBgColor={setBgColor} setAv={setAva} />
    </div>
  );
}
