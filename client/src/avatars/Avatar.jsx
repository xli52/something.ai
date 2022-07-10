import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import * as THREE from "three";

export default function Model({ ...props }) {
  // Create scene, load and setup 3D model
  const scene = new THREE.Scene();
  const gltf = useLoader(GLTFLoader, "/avatar.glb");
  const model = gltf.scene;
  // Position of the model
  model.translateY(props.y);
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
