import React from "react";

import BgSetup from "./BgSetup";

import "./styles.scss";

export default function SetupBox(props) {
  return (
    <div className="setupBox">
      <BgSetup setBgColor={props.setBgColor} />
    </div>
  );
}
