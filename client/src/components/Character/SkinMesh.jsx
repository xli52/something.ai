import React from "react";

const skinMeshData = function (character, nodes, materials) {
  switch (character) {
    case 'jane':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body" geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
          <skinnedMesh name="Wolf3D_Hair" geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom" geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear" geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top" geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
          <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
          <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
        </>
      );
    case 'joshua':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials['Wolf3D_Body.023']} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Glasses" geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials['Wolf3D_Hair.023']} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials['Wolf3D_Outfit_Bottom.023']} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials['Wolf3D_Outfit_Footwear.023']} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Wolf3D_Outfit_Top.023']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials['Wolf3D_Skin.023']} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.023']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </>
      );
      case 'adam':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials['Wolf3D_Body.023']} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Glasses" geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials['Wolf3D_Hair.023']} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials['Wolf3D_Outfit_Bottom.023']} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials['Wolf3D_Outfit_Footwear.023']} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Wolf3D_Outfit_Top.023']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials['Wolf3D_Skin.023']} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.023']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </>
      );
      case 'chris':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials['Wolf3D_Body.023']} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials['Wolf3D_Hair.023']} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials['Wolf3D_Outfit_Bottom.023']} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials['Wolf3D_Outfit_Footwear.023']} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Wolf3D_Outfit_Top.023']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials['Wolf3D_Skin.023']} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.023']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </>
      );
      case 'elizabeth':
      return (
        <>
          <primitive object={nodes.Hips} />
          <skinnedMesh name="Wolf3D_Body001" geometry={nodes.Wolf3D_Body001.geometry} material={materials['Wolf3D_Body.023']} skeleton={nodes.Wolf3D_Body001.skeleton} />
          <skinnedMesh name="Wolf3D_Hair001" geometry={nodes.Wolf3D_Hair001.geometry} material={materials['Wolf3D_Hair.023']} skeleton={nodes.Wolf3D_Hair001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Bottom001" geometry={nodes.Wolf3D_Outfit_Bottom001.geometry} material={materials['Wolf3D_Outfit_Bottom.023']} skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Footwear001" geometry={nodes.Wolf3D_Outfit_Footwear001.geometry} material={materials['Wolf3D_Outfit_Footwear.023']} skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton} />
          <skinnedMesh name="Wolf3D_Outfit_Top001" geometry={nodes.Wolf3D_Outfit_Top001.geometry} material={materials['Wolf3D_Outfit_Top.023']} skeleton={nodes.Wolf3D_Outfit_Top001.skeleton} />
          <skinnedMesh name="EyeLeft001" geometry={nodes.EyeLeft001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeLeft001.skeleton} morphTargetDictionary={nodes.EyeLeft001.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft001.morphTargetInfluences} />
          <skinnedMesh name="EyeRight001" geometry={nodes.EyeRight001.geometry} material={materials['Wolf3D_Eye.023']} skeleton={nodes.EyeRight001.skeleton} morphTargetDictionary={nodes.EyeRight001.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Head001" geometry={nodes.Wolf3D_Head001.geometry} material={materials['Wolf3D_Skin.023']} skeleton={nodes.Wolf3D_Head001.skeleton} morphTargetDictionary={nodes.Wolf3D_Head001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head001.morphTargetInfluences} />
          <skinnedMesh name="Wolf3D_Teeth001" geometry={nodes.Wolf3D_Teeth001.geometry} material={materials['Wolf3D_Teeth.023']} skeleton={nodes.Wolf3D_Teeth001.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth001.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth001.morphTargetInfluences} />
        </>
      );
    default:
      break;
  }
};

export default function SkinMesh({ character, nodes, materials }) {
  return skinMeshData(character, nodes, materials);
}