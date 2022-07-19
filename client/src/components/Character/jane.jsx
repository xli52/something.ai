import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import SkinMesh from './SkinMesh';
import usePrevious from '../../hooks/usePrevious';
import getActionList from '../../helpers/getActionList';
const name = 'jane';

export default function Jane({ position, action, setStatus }) {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF(`models/${name}.glb`);
  scene.traverse(obj => obj.frustumCulled = false); // Avoid partial model rendering

  const { actions } = useAnimations(animations, group);
  const actionList = useRef(getActionList());
  const prevAction = usePrevious(action);

  // Change default animation loop setting
  useEffect(() => {
    // const list = {...actionList.current};
    // for (const index in actions) {
    //   if (!actionList.current[index].loop) {
    //     actions[index].setLoop(1, 1);
    //   }
    //   // list[index].duration = actions[index].getClip().duration;
    // }
    // console.log(list);

    console.log('I got called')
    setStatus({ status: 'greeting', sentiment: 'neutral' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Animation play control
  useEffect(() => {
    if (prevAction) {
      actions[prevAction].fadeOut(1);
      actions[action].stop();
    }
    actions[action].play();
    actions[action].fadeIn(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

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