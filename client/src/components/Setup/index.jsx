import React from "react";
import ModelDisplay from "./ModelDisplay";
import SetupBox from "./SetupBox";
import "./styles.scss";

export default function Setup() {
  return (
    <div className="setupMainBody">
      <SetupBox />
      <ModelDisplay />
    </div>
  );
}
