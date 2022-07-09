import React from "react";
import Intro from "./Intro";
import ModelDisplay from "./ModelDisplay";

import "./styles.scss";

export default function Home() {
  return (
    <div className="mainBody">
      <Intro />
      <ModelDisplay />
    </div>
  );
}
