import React from "react";
import Nav from '../../components/Nav';
import Intro from "./Intro";
import ModelDisplay from "./ModelDisplay";

import "./styles.scss";

export default function Home(props) {
  return (
    <main>
      <Nav loginBtn signupBtn />
      <div className="mainBody">
        <Intro setPage={props.setPage} />
        <ModelDisplay />
      </div>
    </main>
  );
}
