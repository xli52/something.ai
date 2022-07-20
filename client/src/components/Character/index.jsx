import React from "react";
import Jane from "./jane";
import Joshua from "./joshua";
import Adam from "./adam";
import Chris from "./chris";
import Elizabeth from "./elizabeth";

export default function Character({ name, position, action, setStatus, initStatus }) {

  return (
    <>
      {name === "jane" && <Jane action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "joshua" && <Joshua action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "chris" && <Chris action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "adam" && <Adam action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "elizabeth" && <Elizabeth action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
    </>
  );
}
