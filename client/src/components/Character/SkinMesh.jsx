import React from "react";

const skinMeshData = function (character, nodes, materials) {
  switch (character) {
    case 'jane':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body002" geometry={nodes.Wolf3D_Body002.geometry} material={materials['Wolf3D_Body.001']} skeleton={nodes.Wolf3D_Body002.skeleton} />
          <skinnedMesh name="Wolf3D_Hair002" geometry={nodes.Wolf3D_Hair002.geometry} material={materials['Wolf3D_Hair.001']} skeleton={nodes.Wolf3D_Hair002.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom002" geometry={nodes.Wolf3D_Outfit_Bottom002.geometry} material={materials['Wolf3D_Outfit_Bottom.001']} skeleton={nodes.Wolf3D_Outfit_Bottom002.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear002" geometry={nodes.Wolf3D_Outfit_Footwear002.geometry} material={materials['Wolf3D_Outfit_Footwear.001']} skeleton={nodes.Wolf3D_Outfit_Footwear002.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top002" geometry={nodes.Wolf3D_Outfit_Top002.geometry} material={materials['Wolf3D_Outfit_Top.001']} skeleton={nodes.Wolf3D_Outfit_Top002.skeleton} />
          <skinnedMesh name="EyeLeft002" geometry={nodes.EyeLeft002.geometry} material={materials['Wolf3D_Eye.001']} skeleton={nodes.EyeLeft002.skeleton} morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences} />
          <skinnedMesh name="EyeRight002" geometry={nodes.EyeRight002.geometry} material={materials['Wolf3D_Eye.001']} skeleton={nodes.EyeRight002.skeleton} morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head002" geometry={nodes.Wolf3D_Head002.geometry} material={materials['Wolf3D_Skin.001']} skeleton={nodes.Wolf3D_Head002.skeleton} morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth002" geometry={nodes.Wolf3D_Teeth002.geometry} material={materials['Wolf3D_Teeth.001']} skeleton={nodes.Wolf3D_Teeth002.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth002.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth002.morphTargetInfluences} />
        </>
      );
    case 'joshua':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Glasses001" geometry={nodes.Wolf3D_Glasses001.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses001.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </>
      );
    default:
      break;
  }
};

export default function SkinMesh({ character, nodes, materials }) {
  return skinMeshData(character, nodes, materials);
}