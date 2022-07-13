import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Character from "../../components/Character";

export default function ModelDisplay({ character }) {
  return (
    <Canvas
      className="chat-scene-canvas"
      camera={{
        fov: 100,
        near: 0.01,
        far: 1000,
        position: [0, 0, 20],
        zoom: 5,
      }}
      style={{ width: "60%", height: "100%" }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <PresentationControls global snap >
          <Character
            name={character.name}
            position={{ x: 0, y: character.setupPageY, z: 0 }}
            action={character.greetingAction}
          />
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
