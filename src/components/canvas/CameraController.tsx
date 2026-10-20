import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { interpolateCamera } from '../../constants/keyframes';

interface CameraControllerProps {
  progress: number;
}

export function CameraController({ progress }: CameraControllerProps) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 3.4, 15.0));
  const currentTarget = useRef(new THREE.Vector3(0, 1.4, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.4, 0));
  const pointerPos = useRef({ x: 0, y: 0 });

  // Window-level pointer tracking for organic parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    const camData = interpolateCamera(progress);

    // Subtle organic parallax based on mouse
    const parallaxX = pointerPos.current.x * 0.16;
    const parallaxY = pointerPos.current.y * 0.10;

    const destX = camData.position[0] + parallaxX;
    const destY = camData.position[1] + parallaxY;
    const destZ = camData.position[2];

    // Smooth camera position damping
    const lerpFactor = Math.min(1, delta * 4.5);
    currentPos.current.x += (destX - currentPos.current.x) * lerpFactor;
    currentPos.current.y += (destY - currentPos.current.y) * lerpFactor;
    currentPos.current.z += (destZ - currentPos.current.z) * lerpFactor;

    camera.position.copy(currentPos.current);

    // Smooth target lookAt damping
    targetLookAt.current.set(
      camData.target[0] + parallaxX * 0.35,
      camData.target[1] + parallaxY * 0.35,
      camData.target[2]
    );

    currentTarget.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentTarget.current);

    // Dynamic FOV interpolation
    if ('fov' in camera) {
      const persCam = camera as THREE.PerspectiveCamera;
      const targetFov = camData.fov;
      persCam.fov += (targetFov - persCam.fov) * lerpFactor;
      persCam.updateProjectionMatrix();
    }
  });

  return null;
}
