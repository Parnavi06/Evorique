export interface CanvasEnvironment {
  id: number;
  depthCode: string;
  title: string;
  subtitle: string;
  headline: string;
  description: string;
  focalPrompt: string;
  progressRange: [number, number];
  cameraTargetZ: number;
}

export const CANVAS_ENVIRONMENTS: CanvasEnvironment[] = [
  {
    id: 1,
    depthCode: "DEPTH 01 // THE BEGINNING",
    title: "THE BEGINNING",
    subtitle: "Built to leave a mark.",
    headline: "Every great thing starts as an idea.",
    description: "Welcome to Evorique. An independent digital universe where architectural form, thoughtful engineering, and creative courage converge.",
    focalPrompt: "Scroll to enter the portal",
    progressRange: [0.0, 0.22],
    cameraTargetZ: 14.0
  },
  {
    id: 2,
    depthCode: "DEPTH 02 // SELECTED WORK",
    title: "SELECTED WORK",
    subtitle: "The Portfolio Exhibition",
    headline: "Selected works. Proof of intention.",
    description: "Explore our curated digital products, spatial identities, and interactive research initiatives. Each project is crafted with deliberate care.",
    focalPrompt: "Enter the crystalline aperture",
    progressRange: [0.22, 0.44],
    cameraTargetZ: 0.0
  },
  {
    id: 3,
    depthCode: "DEPTH 03 // SERVICES",
    title: "SERVICES",
    subtitle: "Disciplines & Craft",
    headline: "End-to-end craft across physical and digital frontiers.",
    description: "We partner with visionary founders and established brands to build enduring identities, tactile web experiences, and high-performance applications.",
    focalPrompt: "Pass through the marble doorway",
    progressRange: [0.44, 0.65],
    cameraTargetZ: -18.0
  },
  {
    id: 4,
    depthCode: "DEPTH 04 // ABOUT EVORIQUE",
    title: "ABOUT EVORIQUE",
    subtitle: "Studio Identity",
    headline: "Small studio. Big ideas.",
    description: "We are an independent, senior-led creative studio. When you work with us, you collaborate directly with the designers and engineers who craft the work.",
    focalPrompt: "Ascend to the summit horizon",
    progressRange: [0.65, 0.84],
    cameraTargetZ: -36.0
  },
  {
    id: 5,
    depthCode: "DEPTH 05 // THE DESTINATION",
    title: "THE DESTINATION",
    subtitle: "Collaborate",
    headline: "Have an idea? Let's make it matter.",
    description: "Every journey begins with a conversation. Tell us about your ambition and let's craft an enduring digital experience together.",
    focalPrompt: "Start a conversation",
    progressRange: [0.84, 1.0],
    cameraTargetZ: -54.0
  }
];

export interface PortfolioExhibit {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  metrics: string;
}

export const PORTFOLIO_EXHIBITS: PortfolioExhibit[] = [
  {
    id: "aurora",
    title: "Aurora",
    category: "Digital Banking & Product Design",
    year: "2025",
    tagline: "A more intuitive way to bank.",
    description: "An exploratory digital banking experience that replaces anxious tabular clutter with spatial cash-flow topologies and serene typography.",
    image: "/scenes/state_04_a_project.jpg",
    deliverables: ["Spatial Balance Topology", "42-Token Component System", "Multi-Device Prototype"],
    metrics: "Working prototype validated across desktop and mobile."
  },
  {
    id: "the-mark",
    title: "The Mark",
    category: "Brand Identity & Spatial Architecture",
    year: "2025",
    tagline: "Monolithic form meets digital typography.",
    description: "An exploration of physical-digital brand environments, translating warm limestone, natural daylight, and circular portals into an enduring identity.",
    image: "/scenes/state_01_the_mark.jpg",
    deliverables: ["Spatial Brand Guidelines", "Architectural Material Book", "Monogram Suite"],
    metrics: "Foundational brand world for Evorique."
  },
  {
    id: "studio-workspace",
    title: "Studio Workspace",
    category: "Environmental & Spatial Design",
    year: "2024",
    tagline: "A place where ideas turn real.",
    description: "An architectural workspace balancing raw limestone arches, natural daylight, and Scandinavian oak workbenches for focused creative exploration.",
    image: "/scenes/state_03_inside_studio.jpg",
    deliverables: ["Architectural Layout Plan", "Custom Oak Workstations", "Acoustic Dampening"],
    metrics: "Active creative studio headquarters."
  },
  {
    id: "archipelago",
    title: "Archipelago",
    category: "Creative Technology & Spatial Interaction",
    year: "2025",
    tagline: "Navigating interconnected digital realms.",
    description: "An interconnected network of spherical glass atriums and pedestrian bridges exploring spatial navigation on the real-time web.",
    image: "/scenes/state_06_capabilities.jpg",
    deliverables: ["Real-time Three.js Engine", "Spatial Navigation Pattern", "Custom Shader Package"],
    metrics: "Sub-16ms 60fps frame budget across devices."
  }
];

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Brand Identity",
    description: "Brand strategy, visual identity, typography systems, and art direction that establish an unmistakable presence.",
    deliverables: ["Brand Positioning", "Visual Identity Systems", "Typography & Design Guidelines", "Environmental & Spatial Branding"]
  },
  {
    number: "02",
    title: "UI/UX Design",
    description: "Digital tools, software surfaces, and applications crafted to quiet cognitive friction and inspire confidence.",
    deliverables: ["Information Architecture", "Wireframing & Prototyping", "Scalable Design Systems", "Usability & Accessibility Hardening"]
  },
  {
    number: "03",
    title: "Website Design",
    description: "Editorial, immersive web experiences that treat digital space with the dignity and permanence of architecture.",
    deliverables: ["Editorial Layouts", "Interactive Design Direction", "Responsive Choreography", "Design-to-Development Handoff"]
  },
  {
    number: "04",
    title: "Web Development",
    description: "Resilient frontends, cloud infrastructure, and fluid web applications engineered with mathematical precision.",
    deliverables: ["React & TypeScript Engineering", "Next.js & Vite Architectures", "API & Headless CMS Integrations", "Web Vitals & Performance Optimization"]
  },
  {
    number: "05",
    title: "Creative Technology",
    description: "Real-time 3D, WebGL experiences, procedural motion, and custom interactive experiments.",
    deliverables: ["Three.js & WebGL Pipelines", "Custom Shaders & Physics", "Micro-Interactions", "Audio-Reactive Experiences"]
  }
];
