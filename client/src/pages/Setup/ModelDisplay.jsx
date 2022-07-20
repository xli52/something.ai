import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Character from "../../components/Character";
import useAction from "../../hooks/useAction";

export default function ModelDisplay({ character, layer, setShowUnlock }) {

  const { action, setStatus } = useAction();

  return (
    <>
      {layer && (
        <>
          <div className="locked">
            <i className="material-icons lockIcon" onClick={setShowUnlock}>
              lock
            </i>
            <h2 className="unlockText">Unlock Character</h2>
          </div>
        </>
      )}
      <Canvas
        className="chat-scene-canvas"
        camera={{ fov: 100, near: 0.01, far: 1000, position: [0, 0, 3], zoom: 5 }}
        style={{ width: "60%", height: "100%" }}
      >
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[2, 2, 0]} />
        <Suspense fallback={null}>
          <PresentationControls global snap>
            <Character
              name={character.name}
              position={{ x: 0, y: character.setupPageY, z: 0 }}
              action={action}
              setStatus={setStatus}
              initStatus={{ status: 'intro', sentiment: 'positive' }}
            />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </>
  );
}
