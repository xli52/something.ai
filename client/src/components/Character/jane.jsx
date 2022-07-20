import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import SkinMesh from './SkinMesh';
import usePrevious from '../../hooks/usePrevious';
// import getActionList from '../../helpers/getActionList';
const name = 'jane';

export default function Jane({ position, action, setStatus, initStatus }) {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(`models/${name}.glb`);
  scene.traverse(obj => obj.frustumCulled = false); // Avoid partial model rendering

  const { actions } = useAnimations(animations, group);
  const prevAction = usePrevious(action);

  // const actionList = getActionList();

  // Change default animation loop setting
  useEffect(() => {
    // const list = {};
    // for (const index in actions) {
    //   list[index] = actions[index].getClip().duration;
    // }
    // console.log(list);

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

  return (
    <>
      <primitive object={scene} />
      <group ref={group} dispose={null} >
        <group
          name="Scene"
          position={[position.x, position.y, position.z]}
        >
          <group name="Armature" >
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