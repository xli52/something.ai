import React from "react";
import Circle from "./Circle";
import BgSetup from "./BgSetup";
import MdSetup from "./MdSetup";

export default function SetupBox() {
  return (
    <div className="setupBox">
      <div className="container">
        <h2>Avatar :</h2>
        <MdSetup />
        <h2>Background :</h2>
        <BgSetup />
      </div>
    </div>
  );
}
