import React from "react";
import "./styles.scss";

export default function Circle(props) {
  const buttonClass = `circleBtn ${props.bg ? props.bg : ""} ${
    props.img ? props.img : ""
  }`;
  // console.log(props);
  return (
    <button
      className={buttonClass}
      onClick={(event) => {
        event.preventDefault();
        props.setBgColor(props.bg);
      }}
    ></button>
  );
}
