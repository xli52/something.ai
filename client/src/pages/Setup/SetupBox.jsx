import React from "react";
import BgSetup from "./BgSetup";
import useNavigate from "../../hooks/useNavigation";

import "./styles.scss";

export default function SetupBox(props) {
  const { chatPage } = useNavigate();
  return (
    <div className="setupBox">
      <BgSetup setBgColor={props.setBgColor} />
      <button
        className="circleBtn bg4"
        onClick={chatPage}
        disabled={props.layer}
      >
        GO!
      </button>
    </div>
  );
}
