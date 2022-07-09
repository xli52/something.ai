// /*
// Auto-generated by: https://github.com/pmndrs/gltfjsx
// */

// import React, { useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

// export default function Model({ ...props }) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF(
//     "../../public/cartoonGirl.glb"
//   );
//   const { actions } = useAnimations(animations, group);
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="AuxScene">
//         <group position={[0, -73.66, 2.17]}>
//           <primitive object={nodes.mixamorigHips} />
//           <skinnedMesh
//             name="Ch46"
//             geometry={nodes.Ch46.geometry}
//             material={materials.Ch46_body}
//             skeleton={nodes.Ch46.skeleton}
//           />
//         </group>
//       </group>
//     </group>
//   );
// }

// useGLTF.preload("/cartoonGirl.glb");
import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import * as THREE from "three";

export default function Model({ ...props }) {
  // Create scene, load and setup 3D model
  const scene = new THREE.Scene();
  const gltf = useLoader(GLTFLoader, "/cartoonGirl.glb");
  const model = gltf.scene;
  model.traverse(function (obj) {
    obj.frustumCulled = false;
  });
  scene.add(model);

  // Configure animation control
  const stats = Stats();
  const clock = new THREE.Clock();
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera();
  const mixer = new THREE.AnimationMixer(model);
  mixer.clipAction(gltf.animations[2]).play();

  // Create the animation loop
  function animate() {
    requestAnimationFrame(animate);
    var delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }
    renderer.render(scene, camera);
    stats.update();
  }

  //Run the animation loop
  animate();

  return <primitive object={scene} />;
}
