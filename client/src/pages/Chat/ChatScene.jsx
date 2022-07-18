import React, { useState, useContext, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Character from '../../components/Character';
import { characterContext } from "../../contexts/CharacterContext";

export default function ChatScene(props) {
  const { character } = useContext(characterContext);
  const [action, setAction] = useState('StandingIdle');

  return (
    <Canvas
      className='chat-scene-canvas'
      // This controls carema angle
      camera={{ fov: 100, near: 0.01, far: 1000, position: [0, 0, 20], zoom: 5 }}
    >
      <ambientLight intensity={1.25} />
      <Suspense fallback={null}>
        <Character
          name={character.name}
          position={{ x: 0, y: character.chatPageY, z: 0 }}
          action={action}
          style={{ touchAction: 'none' }}
        />
      </Suspense>
    </Canvas>
  );

};