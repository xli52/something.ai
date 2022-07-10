import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar from "../../avatars/Avatar";

export default function ModelDisplay(props) {
  return (
    <Canvas
      className="chat-scene-canvas"
      camera={{ fov: 20, near: 0.02, far: 1000, position: [0, 0, 9] }}
      style={{ width: "100%", height: "100%", margin: "auto" }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Avatar y={0.6} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
