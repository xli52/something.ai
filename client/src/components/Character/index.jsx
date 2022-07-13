import React from "react";
import Jane from "./Jane";
import Joshua from "./Joshua";

export default function Character({ name, position, action }) {
  return (
    <>
      {name === "jane" && <Jane action={action} position={position} />}
      {name === "joshua" && <Joshua action={action} position={position} />}
    </>
  );
}
