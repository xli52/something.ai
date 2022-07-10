import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar from "../../avatars/Avatar";

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
        <Avatar />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
