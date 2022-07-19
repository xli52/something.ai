import React from "react";
import Jane from "./Jane";
import Joshua from "./Joshua";

export default function Character({ name, position, action, setStatus, initStatus }) {

  return (
    <>
      {name === "jane" && <Jane action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
      {name === "joshua" && <Joshua action={action} setStatus={setStatus} position={position} initStatus={initStatus} />}
    </>
  );
}
