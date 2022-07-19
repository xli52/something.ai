import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Character from "../../components/Character";
import getCharacterList from "../../helpers/getCharacterList";
import useCharacter from "../../hooks/useCharacter";
import useAction from "../../hooks/useAction";

export default function ModelDisplay() {
  const { character } = useCharacter(getCharacterList().jane);
  const { action, setStatus } = useAction();

  return (
    <Canvas
      className="chat-scene-canvas"
      camera={{ fov: 100, near: 0.01, far: 1000, position: [5, 0, 30], zoom: 5 }}
      style={{ width: "60%", margin: "auto" }}
    >
      <ambientLight intensity={1.25} />
      <Suspense fallback={null}>
        <PresentationControls global snap >
          <Character
            name={character.name}
            position={{ x: 1, y: -14, z: 0 }}
            action={action}
            setStatus={setStatus}
            initStatus={{ status: 'thinking', sentiment: 'neutral' }}
          />
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
