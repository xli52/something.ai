import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import SkinMesh from './SkinMesh';
import usePrevious from '../../hooks/usePrevious';
const name = 'joshua';

export default function Joshua({ position, action, setStatus, initStatus }) {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(`models/${name}.glb`);
  scene.traverse(obj => obj.frustumCulled = false); // Avoid partial model rendering

  const { actions } = useAnimations(animations, group);
  const prevAction = usePrevious(action);

  // Change default animation loop setting
  useEffect(() => {
    setStatus(initStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animation play control
  useEffect(() => {
    console.log(prevAction, action);
    if (prevAction && action) {
      actions[prevAction].fadeOut(1.5);
      actions[action].stop();
      actions[action].play();
      actions[action].fadeIn(1.5);
    } else if (action) {
      actions[action].play();
      actions[action].fadeIn(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  console.log(position);

  return (
    <>
      <primitive object={scene} />
      <group ref={group} dispose={null} >
        <group
          name="Scene"
          position={[position.x, position.y, position.z]}
        >
          <group name="Armature001" >
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