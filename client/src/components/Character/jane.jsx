import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import SkinMesh from './SkinMesh';
import usePrevious from '../../hooks/usePrevious';
const name = 'jane';

export default function Character({ action, position }) {

  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(`models/${name}.glb`);
  const { actions } = useAnimations(animations, group);
  scene.traverse(obj => obj.frustumCulled = false); // Avoid partial model rendering
  const prevAction = usePrevious(action);

  // Body animation play control
  useEffect(() => {
    if (prevAction) {
      actions[prevAction].fadeOut(0.5);
      actions[prevAction].stop();
    }
    actions[action].play();
    actions[action].fadeIn(0.5);
  }, [action, actions, prevAction]);

  return (
    <>
      <primitive object={scene} />
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group
            name="Armature"
            // Control camera defalt location x,y,z and rx, ry, rz
            position={[position.x, position.y, position.z]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={10}
          >
            <SkinMesh
              character={name}
              nodes={nodes}
              materials={materials}
            />
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload(`models/${name}.glb`);