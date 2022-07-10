import React from "react";
import Circle from "./Circle";

export default function MdSetup(props) {
  return (
    <div>
      <Circle setAva={props.setAva} img="img1" />
      <Circle setAva={props.setAva} />
      <Circle setAva={props.setAva} />
    </div>
  );
}
