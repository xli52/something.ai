import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../../avatars/Avatar';
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

  return (
    <Canvas
      className='chat-scene-canvas'
      camera={{ fov: 20, near: 0.01, far: 1000, position: [0, 0, 2] }}
    >
      <ambientLight intensity={1.25} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Avatar />
      </Suspense>
      <OrbitControls />
      {/* <CameraHelper /> */}
    </Canvas>
  );

};