import React from "react";
import "./styles.scss";

export default function Circle(prop) {
  const buttonClass = `circleBtn  ${prop.bg}`;
  console.log(prop);
  return (
    <button
      className={buttonClass}
      onClick={() => {
        prop.setBgColor(prop.bg);
      }}
    ></button>
  );
}
