import "./styles.scss";
import React from "react";
import Intro from "./Intro";
import ModelDisplay from "./ModelDisplay";

export default function Home(props) {
  return (
    <main>
      {/* <Nav loginBtn signupBtn /> */}
      <div className="mainBody">
        <Intro setPage={props.setPage} />
        <ModelDisplay />
      </div>
    </main>
  );
}
