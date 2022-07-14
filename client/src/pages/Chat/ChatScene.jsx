import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PresentationControls } from '@react-three/drei';
import Character from '../../components/Character';
import getCharacterList from '../../helpers/getCharacterList';

export default function ChatScene(props) {
  const [character] = useState(getCharacterList().jane);
  const [action, setAction] = useState('StandingIdle');

  return (
    <>
      <Canvas
        className='chat-scene-canvas'
        // This controls carema angle I believe
        camera={{ fov: 100, near: 0.01, far: 1000, position: [0, 0, 20], zoom: 7 }}
      >
        <ambientLight intensity={1.25} />
        <Suspense fallback={null}>
          {/* <PresentationControls global snap > */}
          <Character
            name={character.name}
            position={{ x: 0, y: character.chatPageY, z: 0 }}
            action={action}
            style={{ touchAction: 'none' }}
          />
          {/* </PresentationControls> */}
        </Suspense>
      </Canvas>
    </>
  );

};