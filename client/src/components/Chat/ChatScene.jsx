import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PerspectiveCamera } from "three";
import Avatar from '../../avatars/Avatar';
import './ChatScene.scss';

export default function ChatScene(props) {
  function CameraHelper() {
    const camera = new PerspectiveCamera(40, 1, 1, 3);
    return (
      <group position={[0, 1.4, 2.1]}>
        <cameraHelper args={[camera]} />
      </group>
    );
  }
  
  return (
    <Canvas
      className={'chat-scene-canvas'}
      camera={{ fov: 40, near: 1, far: 3, position: [0, 1.4, 2.1] }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Avatar />
      </Suspense>
      <OrbitControls />
      <CameraHelper />
    </Canvas>
  );

};