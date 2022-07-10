import React from "react";
import Intro from "./Intro";
import ModelDisplay from "./ModelDisplay";

import "./styles.scss";

export default function Home(props) {
  return (
    <div className="mainBody">
      <Intro setPage={props.setPage} />
      <ModelDisplay />
    </div>
  );
}
