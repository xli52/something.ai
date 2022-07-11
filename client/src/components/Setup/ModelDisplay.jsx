import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Character from "../Character/Character";
import Joshua from "../Character/joshua";
import Jane from "../Character/jane";

export default function ModelDisplay(props) {
  return (
    <Canvas
      className="chat-scene-canvas"
      camera={{ fov: 20, near: 0.02, far: 1000, position: [0, 0, 4] }}
      style={{ width: "50%", height: "100%" }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        {/* <Character name={props.name} action="StandingIdle" /> */}
        {props.name === "joshua" && <Joshua />}
        {props.name === "jane" && <Jane action="StandingIdle" />}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
