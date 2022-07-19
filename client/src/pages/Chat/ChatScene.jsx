import React, { useContext, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Character from '../../components/Character';
import { characterContext } from "../../contexts/CharacterContext";

export default function ChatScene({ action, setStatus }) {
  const { character } = useContext(characterContext);

  return (
    <Canvas
      className='chat-scene-canvas' camera={{ fov: 100, near: 0.01, far: 1000, position: [0, 0, 20], zoom: 5 }}>
        <ambientLight intensity={1.25} />
        <Suspense fallback={null}>
          <Character
            name={character.name}
            position={{ x: 0, y: character.chatPageY, z: 0 }}
            action={action}
            setStatus={setStatus}
            initStatus={{ status: 'greeting', sentiment: 'positive' }}
            style={{ touchAction: 'none' }}
          />
        </Suspense>
    </Canvas>
  );

};