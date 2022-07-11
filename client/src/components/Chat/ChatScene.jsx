import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Character from '../../avatars/Character';
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
  const [action, setAction] = useState('StandingIdle');
  const [name, setName] = useState('joshua');

  return (
    <>
      <Canvas
        className='chat-scene-canvas'
        camera={{ fov: 20, near: 0.01, far: 1000, position: [0, 0, 1.5] }}
      // camera={{ fov: 20, near: 0.02, far: 1000, position: [0.1, 0.1, 3.5] }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <Character
            name={name}
            action={action}
          />
        </Suspense>
        <OrbitControls />
        {/* <CameraHelper /> */}
      </Canvas>
      <button onClick={() => { setAction('Waving') }}>Wave</button>
      <button onClick={() => { setAction('StandingIdle') }}>StandingIdle</button>
      <button onClick={() => { setAction('HipHopDancing') }}>Hip Hop</button>
    </>
  );

};