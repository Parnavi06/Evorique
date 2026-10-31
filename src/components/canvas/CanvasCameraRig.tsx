import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { interpolateCanvasCamera } from '../../constants/canvasKeyframes';

interface CanvasCameraRigProps {
  progress: number;
}

export function CanvasCameraRig({ progress }: CanvasCameraRigProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.6, 28.0));
  const currentTarget = useRef(new THREE.Vector3(0, 2.4, 14.0));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.4, 14.0));
  const pointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const camData = interpolateCanvasCamera(progress);

    // Subtle natural parallax
    const parallaxX = pointerPos.current.x * 0.18;
    const parallaxY = pointerPos.current.y * 0.12;

    const destX = camData.position[0] + parallaxX;
    const destY = camData.position[1] + parallaxY;
    const destZ = camData.position[2];

    const lerpFactor = Math.min(1, delta * 4.8);
    currentPos.current.x += (destX - currentPos.current.x) * lerpFactor;
    currentPos.current.y += (destY - currentPos.current.y) * lerpFactor;
    currentPos.current.z += (destZ - currentPos.current.z) * lerpFactor;

    camera.position.copy(currentPos.current);

    targetLookAt.current.set(
      camData.target[0] + parallaxX * 0.4,
      camData.target[1] + parallaxY * 0.4,
      camData.target[2]
    );

    currentTarget.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentTarget.current);

    if ('fov' in camera) {
      const persCam = camera as THREE.PerspectiveCamera;
      persCam.fov += (camData.fov - persCam.fov) * lerpFactor;
      persCam.updateProjectionMatrix();
    }
  });

  return null;
}
