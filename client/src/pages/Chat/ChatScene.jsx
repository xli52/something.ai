import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from '../../components/Character';
import getCharacterList from '../../helpers/getCharacterList';
// import { PerspectiveCamera } from "three";

export default function ChatScene(props) {
  // function CameraHelper() {
  //   const camera = new PerspectiveCamera(20, 1, 0.01, 5);
  //   return (
  //     <group position={[0, 0, 3.5]}>
  //       <cameraHelper args={[camera]} />
  //     </group>
  //   );
  // }
  const [character, setCharacter] = useState(getCharacterList().jane);
  const [action, setAction] = useState(character.greetingAction);

  return (
    <>
      <Canvas
        className='chat-scene-canvas'
        // This controls carema angle I believe
        camera={{ fov: 100, near: 0.01, far: 1000, position: [0, 0, 20], zoom: 8 }}
      >
        <ambientLight intensity={1.25} />
        <Suspense fallback={null}>
          <Character
            name={character.name}
            position={{ x: 0, y: character.chatPageY, z: 0 }}
            action={action}
          />
        </Suspense>
        <OrbitControls />
        {/* <CameraHelper /> */}
      </Canvas>
      <button onClick={() => { setAction('Waving') }}>Wave</button>
      <button onClick={() => { setAction('StandingIdle') }}>StandingIdle</button>
      <button onClick={() => { setAction('HipHopDancing') }}>Hip Hop</button>
      <button onClick={() => { setAction('Yawn') }}>Yawn</button>
      <button onClick={() => { setAction('Angry') }}>Angry</button>
    </>
  );

};