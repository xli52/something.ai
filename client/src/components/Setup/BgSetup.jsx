import React from "react";
import Circle from "./Circle";
import "./styles.scss";

export default function BgSetup(prop) {
  return (
    <div>
      <Circle bg="bg1" setBgColor={prop.setBgColor} />
      <Circle bg="bg2" setBgColor={prop.setBgColor} />
      <Circle bg="bg3" setBgColor={prop.setBgColor} />
    </div>
  );
}
