import React from "react";
import Circle from "./Circle";
import "./styles.scss";

export default function BgSetup(props) {
  return (
    <>
      <Circle bg="bg1" setBgColor={props.setBgColor} />
      <Circle bg="bg2" setBgColor={props.setBgColor} />
      <Circle bg="bg3" setBgColor={props.setBgColor} />
    </>
  );
}
