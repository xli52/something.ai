import React, { useState } from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

export default function Setup() {
  const [bgColor, setBgColor] = useState("bg1");
  const mainBodyClass = `setupMainBody ${bgColor}`;

  return (
    <div className={mainBodyClass}>
      <SetupBox setBgColor={setBgColor} />
      <ModelDisplay />
    </div>
  );
}
