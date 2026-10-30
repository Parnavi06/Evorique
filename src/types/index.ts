export interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  chapterIndex: number;
  chapterNumber: string;
  chapterTitle: string;
  locationCode: string;
  narrative: string;
}

export interface ChapterInfo {
  index: number;
  number: string;
  title: string;
  subtitle: string;
  narrative: string;
  headline: string;
  description: string;
  locationCode: string;
  department: string;
  transitionPrompt?: string;
  artifacts?: {
    label: string;
    value: string;
  }[];
}

export interface CapabilityItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metrics: string;
  coordinates: [number, number, number];
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
