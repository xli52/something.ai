import React from "react";
import Jane from "./jane";
import Joshua from "./joshua";

export default function Character({ name, position, action, setStatus, initStatus }) {

  return (
    <>
      {name === "jane" && <Jane action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "joshua" && <Joshua action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
    </>
  );
}
