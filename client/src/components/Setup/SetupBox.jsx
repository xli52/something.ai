import React from "react";

import BgSetup from "./BgSetup";
import MdSetup from "./MdSetup";
import "./styles.scss";

export default function SetupBox(props) {
  return (
    <div className="setupBox">
      <div className="container">
        <h2>Avatar :</h2>
        <MdSetup setAva={props.setAva} />
        <h2>Background :</h2>
        <BgSetup setBgColor={props.setBgColor} />
        <button className="btn">GO</button>
      </div>
    </div>
  );
}
