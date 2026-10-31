export interface CanvasKeyframe {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  environmentId: number;
}

export const CANVAS_KEYFRAMES: CanvasKeyframe[] = [
  // Environment 01 — The Beginning
  {
    progress: 0.0,
    position: [0, 3.6, 28.0],
    target: [0, 2.4, 14.0],
    fov: 48,
    environmentId: 1
  },
  {
    progress: 0.09,
    position: [0, 2.7, 20.5],
    target: [0, 2.3, 14.0],
    fov: 45,
    environmentId: 1
  },
  {
    progress: 0.16,
    position: [0, 2.2, 14.8],
    target: [0, 2.2, 4.0],
    fov: 40,
    environmentId: 1
  },

  // Environment 02 — The Creative Mind
  {
    progress: 0.22,
    position: [0, 2.8, 10.0],
    target: [0, 2.4, -4.0],
    fov: 44,
    environmentId: 2
  },
  {
    progress: 0.29,
    position: [0, 2.4, 3.0],
    target: [0, 2.2, -4.0],
    fov: 41,
    environmentId: 2
  },
  {
    progress: 0.34,
    position: [0, 2.2, -3.2],
    target: [0, 2.2, -14.0],
    fov: 38,
    environmentId: 2
  },

  // Environment 03 — Selected Work
  {
    progress: 0.40,
    position: [0, 2.5, -8.0],
    target: [0, 2.2, -22.0],
    fov: 42,
    environmentId: 3
  },
  {
    progress: 0.47,
    position: [0, 2.2, -15.0],
    target: [0, 2.2, -22.0],
    fov: 40,
    environmentId: 3
  },
  {
    progress: 0.52,
    position: [0, 2.2, -21.2],
    target: [0, 2.2, -32.0],
    fov: 38,
    environmentId: 3
  },

  // Environment 04 — Services
  {
    progress: 0.58,
    position: [0, 2.6, -26.0],
    target: [0, 2.2, -40.0],
    fov: 42,
    environmentId: 4
  },
  {
    progress: 0.65,
    position: [0, 2.3, -33.0],
    target: [0, 2.2, -40.0],
    fov: 40,
    environmentId: 4
  },
  {
    progress: 0.70,
    position: [0, 2.2, -39.2],
    target: [0, 2.2, -50.0],
    fov: 38,
    environmentId: 4
  },

  // Environment 05 — About Evorique
  {
    progress: 0.76,
    position: [0, 2.8, -44.5],
    target: [0, 2.5, -58.0],
    fov: 44,
    environmentId: 5
  },
  {
    progress: 0.82,
    position: [0, 2.5, -51.5],
    target: [0, 2.5, -58.0],
    fov: 41,
    environmentId: 5
  },
  {
    progress: 0.86,
    position: [0, 2.4, -57.2],
    target: [0, 2.4, -68.0],
    fov: 39,
    environmentId: 5
  },

  // Environment 06 — The Destination
  {
    progress: 0.91,
    position: [0, 3.1, -62.5],
    target: [0, 2.6, -76.0],
    fov: 43,
    environmentId: 6
  },
  {
    progress: 0.96,
    position: [0, 2.7, -69.5],
    target: [0, 2.5, -80.0],
    fov: 41,
    environmentId: 6
  },
  {
    progress: 1.0,
    position: [0, 2.5, -74.8],
    target: [0, 2.4, -85.0],
    fov: 39,
    environmentId: 6
  }
];

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function interpolateCanvasCamera(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const frames = CANVAS_KEYFRAMES;

  let idx = 0;
  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].progress && p <= frames[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k1 = frames[idx];
  const k2 = frames[idx + 1] || k1;

  const span = k2.progress - k1.progress;
  const rawT = span > 0 ? (p - k1.progress) / span : 0;
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

  let envId = 1;
  if (p < 0.17) envId = 1;
  else if (p < 0.35) envId = 2;
  else if (p < 0.53) envId = 3;
  else if (p < 0.71) envId = 4;
  else if (p < 0.87) envId = 5;
  else envId = 6;

  return {
    position: pos,
    target: target,
    fov: fov,
    environmentId: envId
  };
}
