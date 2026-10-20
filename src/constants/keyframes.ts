import * as THREE from 'three';
import { CameraKeyframe } from '../types';

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    progress: 0.0,
    position: [0, 3.4, 15.0],
    target: [0, 1.4, 0],
    fov: 46,
    label: "01 — THE MARK",
    stateIndex: 1
  },
  {
    progress: 0.12,
    position: [0, 1.8, 6.5],
    target: [0, 1.3, 0],
    fov: 44,
    label: "01 — THE MARK (APPROACH)",
    stateIndex: 1
  },
  {
    progress: 0.24,
    position: [0, 1.25, 0.4],
    target: [0, 1.2, -6.0],
    fov: 42,
    label: "02 — THE THINKING",
    stateIndex: 2
  },
  {
    progress: 0.38,
    position: [0, 0.95, -7.0],
    target: [0, 0.8, -16.0],
    fov: 40,
    label: "03 — INSIDE OUR STUDIO",
    stateIndex: 3
  },
  {
    progress: 0.50,
    position: [0, 0.65, -14.5],
    target: [0, 0.5, -16.0],
    fov: 36,
    label: "04 — A PROJECT",
    stateIndex: 4
  },
  {
    progress: 0.58,
    position: [0, 0.53, -15.65],
    target: [0, 0.52, -16.0],
    fov: 28,
    label: "04 — SCREEN PORTAL",
    stateIndex: 4
  },
  {
    progress: 0.65,
    position: [0, 0.52, -15.82],
    target: [0, 0.52, -16.0],
    fov: 22,
    label: "05 — INSIDE THE PROJECT",
    stateIndex: 5
  },
  {
    progress: 0.76,
    position: [0, 6.5, -5.0],
    target: [0, 1.0, -10.0],
    fov: 45,
    label: "PULLBACK TO CAMPUS",
    stateIndex: 6
  },
  {
    progress: 0.86,
    position: [0, 14.5, 4.0],
    target: [0, 1.2, -5.0],
    fov: 52,
    label: "06 — CAPABILITIES",
    stateIndex: 6
  },
  {
    progress: 1.0,
    position: [0, 1.5, 9.5],
    target: [0, 1.4, 0],
    fov: 45,
    label: "07 — CONTACT",
    stateIndex: 7
  }
];

// Helper: Smooth Hermite interpolation (smoothstep)
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Cubic Catmull-Rom or cubic spline between keyframes
export function interpolateCamera(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const frames = CAMERA_KEYFRAMES;

  // Find surrounding keyframes
  let idx = 0;
  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].progress && p <= frames[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k1 = frames[idx];
  const k2 = frames[idx + 1];

  // Normalized local t between 0 and 1
  const span = k2.progress - k1.progress;
  const rawT = span > 0 ? (p - k1.progress) / span : 0;
  // Apply cubic ease-in-out for silky camera curves
  const t = smoothstep(0, 1, rawT);

  const pos: [number, number, number] = [
    k1.position[0] + (k2.position[0] - k1.position[0]) * t,
    k1.position[1] + (k2.position[1] - k1.position[1]) * t,
    k1.position[2] + (k2.position[2] - k1.position[2]) * t,
  ];

  const target: [number, number, number] = [
    k1.target[0] + (k2.target[0] - k1.target[0]) * t,
    k1.target[1] + (k2.target[1] - k1.target[1]) * t,
    k1.target[2] + (k2.target[2] - k1.target[2]) * t,
  ];

  const fov = k1.fov + (k2.fov - k1.fov) * t;

  // Determine current active visual state (1-7)
  let activeState = 1;
  if (p < 0.18) activeState = 1;
  else if (p < 0.32) activeState = 2;
  else if (p < 0.45) activeState = 3;
  else if (p < 0.54) activeState = 4;
  else if (p < 0.72) activeState = 5;
  else if (p < 0.92) activeState = 6;
  else activeState = 7;

  return {
    position: pos,
    target: target,
    fov: fov,
    activeState: activeState,
    nearestLabel: k1.label
  };
}
