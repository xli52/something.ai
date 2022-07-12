import React from "react";
import Jane from "./jane";
import Joshua from "./joshua";

export default function Character({ name, position, action }) {
  return (
    <>
      {name === "jane" && <Jane action={action} position={position} />}
      {name === "joshua" && <Joshua action={action} position={position} />}
    </>
  );
}
