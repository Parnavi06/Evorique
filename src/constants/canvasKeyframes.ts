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
    progress: 0.11,
    position: [0, 2.7, 21.0],
    target: [0, 2.3, 14.0],
    fov: 45,
    environmentId: 1
  },
  {
    progress: 0.20,
    position: [0, 2.2, 14.8],
    target: [0, 2.2, 0.0],
    fov: 40,
    environmentId: 1
  },

  // Environment 02 — Selected Work
  {
    progress: 0.22,
    position: [0, 2.6, 8.5],
    target: [0, 2.2, -8.0],
    fov: 43,
    environmentId: 2
  },
  {
    progress: 0.33,
    position: [0, 2.3, 0.5],
    target: [0, 2.2, -8.0],
    fov: 40,
    environmentId: 2
  },
  {
    progress: 0.42,
    position: [0, 2.2, -7.2],
    target: [0, 2.2, -18.0],
    fov: 38,
    environmentId: 2
  },

  // Environment 03 — Services
  {
    progress: 0.44,
    position: [0, 2.5, -10.5],
    target: [0, 2.2, -26.0],
    fov: 42,
    environmentId: 3
  },
  {
    progress: 0.54,
    position: [0, 2.3, -18.0],
    target: [0, 2.2, -26.0],
    fov: 40,
    environmentId: 3
  },
  {
    progress: 0.63,
    position: [0, 2.2, -25.2],
    target: [0, 2.2, -36.0],
    fov: 38,
    environmentId: 3
  },

  // Environment 04 — About Evorique
  {
    progress: 0.65,
    position: [0, 2.7, -28.5],
    target: [0, 2.4, -44.0],
    fov: 43,
    environmentId: 4
  },
  {
    progress: 0.74,
    position: [0, 2.4, -36.0],
    target: [0, 2.4, -44.0],
    fov: 41,
    environmentId: 4
  },
  {
    progress: 0.83,
    position: [0, 2.3, -43.2],
    target: [0, 2.4, -54.0],
    fov: 39,
    environmentId: 4
  },

  // Environment 05 — The Destination
  {
    progress: 0.86,
    position: [0, 2.9, -47.0],
    target: [0, 2.6, -62.0],
    fov: 43,
    environmentId: 5
  },
  {
    progress: 0.93,
    position: [0, 2.6, -54.0],
    target: [0, 2.5, -62.0],
    fov: 41,
    environmentId: 5
  },
  {
    progress: 1.0,
    position: [0, 2.4, -60.5],
    target: [0, 2.4, -70.0],
    fov: 39,
    environmentId: 5
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
  if (p < 0.22) envId = 1;
  else if (p < 0.44) envId = 2;
  else if (p < 0.65) envId = 3;
  else if (p < 0.84) envId = 4;
  else envId = 5;

  return {
    position: pos,
    target: target,
    fov: fov,
    environmentId: envId
  };
}
