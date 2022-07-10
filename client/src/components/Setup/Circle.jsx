import React from "react";
import "./styles.scss";

export default function Circle(props) {
  const buttonClass = `circleBtn  ${props.bg}`;
  console.log(props);
  return (
    <button
      className={buttonClass}
      onClick={() => {
        props.setBgColor(props.bg);
      }}
    ></button>
  );
}
