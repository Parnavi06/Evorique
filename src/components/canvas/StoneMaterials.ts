import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function useStoneMaterials() {
  // High-resolution authentic CC0 PBR textures from ambientCG
  const [
    limestoneColor,
    limestoneNormal,
    limestoneRoughness,
    travertineColor,
    travertineNormal,
    travertineRoughness,
    travertineAO,
    waterNormal
  ] = useTexture([
    '/textures/stone/limestone_color.jpg',
    '/textures/stone/limestone_normal.jpg',
    '/textures/stone/limestone_roughness.jpg',
    '/textures/stone/travertine_color.jpg',
    '/textures/stone/travertine_normal.jpg',
    '/textures/stone/travertine_roughness.jpg',
    '/textures/stone/travertine_ao.jpg',
    '/textures/water/water_normal.jpg'
  ]);

  useMemo(() => {
    // Configure Limestone textures
    [limestoneColor, limestoneNormal, limestoneRoughness].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.anisotropy = 16;
    });
    limestoneColor.colorSpace = THREE.SRGBColorSpace;

    // Configure Travertine textures
    [travertineColor, travertineNormal, travertineRoughness, travertineAO].forEach((tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(3, 3);
      tex.anisotropy = 16;
    });
    travertineColor.colorSpace = THREE.SRGBColorSpace;

    // Configure Water Normal
    waterNormal.wrapS = THREE.RepeatWrapping;
    waterNormal.wrapT = THREE.RepeatWrapping;
    waterNormal.repeat.set(8, 8);
  }, [
    limestoneColor, limestoneNormal, limestoneRoughness,
    travertineColor, travertineNormal, travertineRoughness, travertineAO,
    waterNormal
  ]);

  // Honed natural limestone for monumental oculus ring and walkway
  const limestoneMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: limestoneColor,
      normalMap: limestoneNormal,
      roughnessMap: limestoneRoughness,
      normalScale: new THREE.Vector2(0.35, 0.35),
      color: '#F4F1EA',
      roughness: 0.78,
      metalness: 0.02
    });
  }, [limestoneColor, limestoneNormal, limestoneRoughness]);

  // Warm layered travertine with ambient occlusion for pedestals, coping and steps
  const travertineMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: travertineColor,
      normalMap: travertineNormal,
      roughnessMap: travertineRoughness,
      aoMap: travertineAO,
      aoMapIntensity: 0.8,
      normalScale: new THREE.Vector2(0.4, 0.4),
      color: '#E6E1D7',
      roughness: 0.82,
      metalness: 0.03
    });
  }, [travertineColor, travertineNormal, travertineRoughness, travertineAO]);

  // Architectural satin champagne bronze for precision metal inlays
  const champagneBronzeMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#B89F77',
      roughness: 0.22,
      metalness: 0.88
    });
  }, []);

  // Deep mineral reflective water for the architectural reflecting pool
  const waterMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      normalMap: waterNormal,
      normalScale: new THREE.Vector2(0.06, 0.06),
      color: '#1E2F2E',
      roughness: 0.04,
      metalness: 0.35,
      transparent: true,
      opacity: 0.95
    });
  }, [waterNormal]);

  // Natural Mediterranean cypress foliage
  const foliageMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#384A36',
      roughness: 0.86,
      metalness: 0.02
    });
  }, []);

  // Natural weathered bark
  const trunkMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#3B3026',
      roughness: 0.94,
      metalness: 0.02
    });
  }, []);

  return {
    limestoneMat,
    travertineMat,
    champagneBronzeMat,
    waterMat,
    foliageMat,
    trunkMat,
    waterNormal
  };
}
