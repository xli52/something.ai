import React, { useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import * as THREE from 'three';

export default function Model(props) {
  const [scene] = useState(new THREE.Scene());
  const [gltf] = useState(useLoader(GLTFLoader, `/models/${props.name}.glb`));
  const [clock] = useState(new THREE.Clock());
  const [renderer] = useState(new THREE.WebGLRenderer());
  const [camera] = useState(new THREE.PerspectiveCamera());
  const [actions, setActions] = useState({});
  const [stats] = useState(Stats());
  const [activeActions, setActiveActions] = useState({ active: null, last: null });
  const model = gltf.scene;
  const mixer = new THREE.AnimationMixer(model);

  useEffect(() => {
    // Setup scene and 3D model
    model.traverse(function (obj) { obj.frustumCulled = false; });
    scene.add(model);

    // Setup animation actions
    const animationsActions = {};
    for (const animation of gltf.animations) {
      // console.log(animation);
      animationsActions[animation.name] = mixer.clipAction(animation);
    }
    setActions(animationsActions);

    // Start animation loop
    animate();

    //  Set default animation as active action
    setActiveActions({
      active: animationsActions['StandingIdle'],
      last: null
    });
  }, []);

  useEffect(() => {
    if (Object.keys(actions).length !== 0) {
      setAction(props.action);
    }
  }, [props.action]);

  useEffect(() => {
    if (activeActions.active && !activeActions.last) {
      activeActions.active.play();
    }
    if (activeActions.active && activeActions.last) {
      activeActions.last.fadeOut(1);
      activeActions.active.reset();
      activeActions.active.fadeIn(1);
      activeActions.active.play();
    }
  }, [activeActions]);

  function setAction(actionName) {
    if (actionName !== activeActions.active._clip.name) {
      setActiveActions({
        active: actions[actionName],
        last: activeActions.active
      });
    }
  }

  // Create the animation loop
  function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }
    renderer.render(scene, camera);
    stats.update();
  }

  return (
    <primitive object={scene} />
  )
}
