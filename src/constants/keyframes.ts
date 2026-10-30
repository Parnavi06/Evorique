import { CameraKeyframe } from '../types';

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // CHAPTER 01 — THE HEADQUARTERS (Campus Overview & Entrance)
  {
    progress: 0.0,
    position: [0, 3.8, 22.0],
    target: [0, 1.8, 0],
    fov: 48,
    chapterIndex: 1,
    chapterNumber: "01",
    chapterTitle: "THE HEADQUARTERS",
    locationCode: "HQ // CAMPUS CENTRAL",
    narrative: "Every great product starts somewhere."
  },
  {
    progress: 0.07,
    position: [0, 2.3, 13.5],
    target: [0, 1.6, 0],
    fov: 46,
    chapterIndex: 1,
    chapterNumber: "01",
    chapterTitle: "ENTRANCE PROMENADE",
    locationCode: "HQ // PLAZA APPROACH",
    narrative: "Built to leave a mark."
  },
  {
    progress: 0.13,
    position: [0, 1.55, 5.0],
    target: [0, 1.5, -2.5],
    fov: 42,
    chapterIndex: 1,
    chapterNumber: "01",
    chapterTitle: "GLASS PORTAL",
    locationCode: "HQ // PIVOT PORTAL",
    narrative: "Passing through the threshold."
  },

  // CHAPTER 02 — THE IDEATION ROOM (Boardroom & Presentation Screen)
  {
    progress: 0.20,
    position: [0, 1.35, 1.2],
    target: [0, 1.35, -2.8],
    fov: 40,
    chapterIndex: 2,
    chapterNumber: "02",
    chapterTitle: "THE IDEATION ROOM",
    locationCode: "WING A // BOARDROOM 01",
    narrative: "Every solution begins with a question."
  },
  {
    progress: 0.26,
    position: [0, 1.35, -2.0],
    target: [0, 1.35, -2.8],
    fov: 30,
    chapterIndex: 2,
    chapterNumber: "02",
    chapterTitle: "CONCEPT PRESENTATION",
    locationCode: "WING A // SCREEN 01",
    narrative: "Before anything is built, the right questions must be asked."
  },

  // CHAPTER 03 — THE STRATEGY LAB (Discovery & Journey Architecture)
  {
    progress: 0.33,
    position: [0.6, 1.28, -4.8],
    target: [0.6, 1.25, -8.0],
    fov: 38,
    chapterIndex: 3,
    chapterNumber: "03",
    chapterTitle: "THE STRATEGY LAB",
    locationCode: "WING B // STRATEGY SUITE",
    narrative: "Understand before you build."
  },
  {
    progress: 0.39,
    position: [0.5, 1.25, -7.2],
    target: [0.5, 1.25, -8.0],
    fov: 28,
    chapterIndex: 3,
    chapterNumber: "03",
    chapterTitle: "USER JOURNEY MATRIX",
    locationCode: "WING B // DISCOVERY MAP",
    narrative: "Clarity creates direction."
  },

  // CHAPTER 04 — THE DESIGN STUDIO (Design Systems & Ultrawide Workspace)
  {
    progress: 0.46,
    position: [0, 1.22, -11.5],
    target: [0, 1.15, -16.2],
    fov: 38,
    chapterIndex: 4,
    chapterNumber: "04",
    chapterTitle: "THE DESIGN STUDIO",
    locationCode: "WING C // DESIGN LAB",
    narrative: "Give the idea a form."
  },
  {
    progress: 0.52,
    position: [0, 1.15, -15.4],
    target: [0, 1.15, -16.2],
    fov: 26,
    chapterIndex: 4,
    chapterNumber: "04",
    chapterTitle: "INTERFACE PROTOTYPE",
    locationCode: "WING C // STUDIO DISPLAY",
    narrative: "Make every interaction intentional."
  },

  // CHAPTER 05 — THE ENGINEERING LAB (Software Facility & Code Engine)
  {
    progress: 0.59,
    position: [-0.5, 1.18, -18.6],
    target: [-0.5, 1.15, -23.5],
    fov: 38,
    chapterIndex: 5,
    chapterNumber: "05",
    chapterTitle: "THE ENGINEERING LAB",
    locationCode: "WING D // ENGINEERING FACILITY",
    narrative: "Turn design into a working system."
  },
  {
    progress: 0.65,
    position: [-0.3, 1.15, -22.7],
    target: [-0.3, 1.15, -23.5],
    fov: 26,
    chapterIndex: 5,
    chapterNumber: "05",
    chapterTitle: "CODE REPOSITORY & ARCHITECTURE",
    locationCode: "WING D // LIVE ENGINE",
    narrative: "Designed with intention. Built with precision."
  },

  // CHAPTER 06 — THE QUALITY LAB (QA Rig & Release Dashboard)
  {
    progress: 0.72,
    position: [0, 1.22, -26.0],
    target: [0, 1.20, -31.5],
    fov: 38,
    chapterIndex: 6,
    chapterNumber: "06",
    chapterTitle: "THE QUALITY LAB",
    locationCode: "WING E // VALIDATION RIG",
    narrative: "Nothing leaves unfinished."
  },
  {
    progress: 0.78,
    position: [0, 1.20, -30.7],
    target: [0, 1.20, -31.5],
    fov: 26,
    chapterIndex: 6,
    chapterNumber: "06",
    chapterTitle: "RELEASE VERIFICATION",
    locationCode: "WING E // APPROVAL GATE",
    narrative: "Precision in every detail."
  },

  // CHAPTER 07 — THE LAUNCH CHAMBER (Product Launch & Pavilion)
  {
    progress: 0.84,
    position: [0, 1.35, -34.2],
    target: [0, 1.28, -38.5],
    fov: 36,
    chapterIndex: 7,
    chapterNumber: "07",
    chapterTitle: "THE LAUNCH CHAMBER",
    locationCode: "WING F // LAUNCH PAVILION",
    narrative: "From a shared vision to something real."
  },
  {
    progress: 0.89,
    position: [0, 1.28, -37.4],
    target: [0, 1.28, -38.5],
    fov: 28,
    chapterIndex: 7,
    chapterNumber: "07",
    chapterTitle: "AURORA DEPLOYMENT",
    locationCode: "WING F // SHOWCASE",
    narrative: "An idea, brought to life."
  },

  // CHAPTER 08 — THE NEXT CREATION (Atrium Retrospective & Project CTA)
  {
    progress: 0.94,
    position: [0, 6.2, -18.0],
    target: [0, 1.4, -12.0],
    fov: 46,
    chapterIndex: 8,
    chapterNumber: "08",
    chapterTitle: "FACILITY ASCENT",
    locationCode: "ATRIUM // ELEVATED MEZZANINE",
    narrative: "Every great product has a story behind it."
  },
  {
    progress: 1.0,
    position: [0, 12.8, 6.0],
    target: [0, 1.2, -8.0],
    fov: 52,
    chapterIndex: 8,
    chapterNumber: "08",
    chapterTitle: "THE NEXT CREATION",
    locationCode: "ATRIUM // FACILITY RETROSPECTIVE",
    narrative: "Your idea could be next. Let's build yours."
  }
];

// Helper: Smooth Hermite interpolation (smoothstep)
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Catmull-Rom or smooth spline between keyframes
export function interpolateCamera(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const frames = CAMERA_KEYFRAMES;

  let idx = 0;
  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].progress && p <= frames[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k1 = frames[idx];
  const k2 = frames[idx + 1];

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

  // Determine current active chapter index (1-8)
  let activeChapter = 1;
  if (p < 0.15) activeChapter = 1;
  else if (p < 0.28) activeChapter = 2;
  else if (p < 0.41) activeChapter = 3;
  else if (p < 0.54) activeChapter = 4;
  else if (p < 0.67) activeChapter = 5;
  else if (p < 0.80) activeChapter = 6;
  else if (p < 0.91) activeChapter = 7;
  else activeChapter = 8;

  return {
    position: pos,
    target: target,
    fov: fov,
    activeChapter: activeChapter,
    activeKeyframe: k1
  };
}
