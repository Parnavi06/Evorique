export interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  label: string;
  stateIndex: number;
}

export interface CapabilityItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: string;
  coordinates: [number, number, number]; // 3D coordinates in the scene
}

export interface CaseStudyData {
  title: string;
  tagline: string;
  client: string;
  category: string;
  duration: string;
  year: string;
  overview: string;
  problem: string;
  approach: string;
  features: {
    title: string;
    description: string;
  }[];
  impact: {
    label: string;
    value: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}
