import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Character from "../Character/Character";

export default function ModelDisplay(props) {
  return (
    <Canvas
      className="chat-scene-canvas"
      camera={{ fov: 20, near: 0.02, far: 1000, position: [0.1, 0.1, 3.5] }}
      style={{ width: "60%", margin: "auto" }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Character name="jane" action="Waving" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
