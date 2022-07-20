import "./styles.scss";
import React from "react";
import Intro from "./Intro";
import ModelDisplay from "./ModelDisplay";
import Header from "./Header";

export default function Home(props) {
  return (
    <main>
      <Header />
      <div className="mainBody">
        <Intro setPage={props.setPage} />
        <ModelDisplay />
      </div>
    </main>
  );
}
