import React from "react";
import "./styles.scss";

export default function Circle(props) {
  const buttonClass = `circleBtn ${props.bg} ${props.img}`;
  // console.log(props);
  return (
    <button
      className={buttonClass}
      onClick={() => {
        if (props.setAva) {
          props.setAva();
        }
        if (props.setBgColor(props.bg)) {
          props.setBgColor(props.bg);
        }
      }}
    ></button>
  );
}
