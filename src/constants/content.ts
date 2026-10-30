import { ChapterInfo, CapabilityItem, CaseStudyData } from '../types';

export const CHAPTERS: ChapterInfo[] = [
  {
    index: 1,
    number: "01",
    title: "THE HEADQUARTERS",
    subtitle: "Built to leave a mark.",
    narrative: "Every great product starts somewhere.",
    headline: "From ambitious ideas to meaningful digital products. Discover how we turn possibilities into reality.",
    description: "Welcome to Evorique. A creative technology and digital product agency. Step inside our interconnected architectural facility to follow the journey of a digital product from inception to launch.",
    locationCode: "FACILITY // CAMPUS CENTRAL",
    department: "Executive Campus",
    transitionPrompt: "Enter glass portal",
    artifacts: [
      { label: "Campus Architecture", value: "Limestone & Glass" },
      { label: "Methodology", value: "Digital Product Factory" },
      { label: "Discipline", value: "Strategy • Design • Tech" }
    ]
  },
  {
    index: 2,
    number: "02",
    title: "THE IDEATION ROOM",
    subtitle: "THE IDEA",
    narrative: "Every solution begins with a question.",
    headline: "Before anything is built, the right questions must be asked.",
    description: "Every meaningful product begins with understanding the problem, defining the opportunity, and establishing a clear direction.",
    locationCode: "WING A // BOARDROOM 01",
    department: "Product Inception & Vision",
    transitionPrompt: "Approach presentation display",
    artifacts: [
      { label: "Core Question", value: "Can banking feel calm?" },
      { label: "Opportunity", value: "Spatial Wealth Management" },
      { label: "Target Project", value: "Aurora (Conceptual Study)" }
    ]
  },
  {
    index: 3,
    number: "03",
    title: "THE STRATEGY LAB",
    subtitle: "STRATEGY & DISCOVERY",
    narrative: "Understand before you build.",
    headline: "Clarity creates direction.",
    description: "Research, product thinking, and strategic planning transform an initial idea into a structured product vision.",
    locationCode: "WING B // STRATEGY SUITE",
    department: "Research & Systems Architecture",
    transitionPrompt: "Follow journey pathways",
    artifacts: [
      { label: "User Behavioral Archetypes", value: "3 Primary Personas" },
      { label: "Information Architecture", value: "Fluid Cashflow Topology" },
      { label: "Feature Matrix", value: "4 Core Value Horizons" }
    ]
  },
  {
    index: 4,
    number: "04",
    title: "THE DESIGN STUDIO",
    subtitle: "DESIGN & EXPERIENCE",
    narrative: "Give the idea a form.",
    headline: "Make every interaction intentional.",
    description: "From user experience to visual identity, we design interfaces that are intuitive, distinctive, and meaningful.",
    locationCode: "WING C // DESIGN LAB",
    department: "UI/UX & Design Systems",
    transitionPrompt: "Zoom into studio display",
    artifacts: [
      { label: "Design System", value: "Aurora Minimal Tokens" },
      { label: "Typography Scale", value: "Serif Display + Mono Ledger" },
      { label: "Motion Choreography", value: "Physical Spring Damping" }
    ]
  },
  {
    index: 5,
    number: "05",
    title: "THE ENGINEERING LAB",
    subtitle: "ENGINEERING & DEVELOPMENT",
    narrative: "Turn design into a working system.",
    headline: "Designed with intention. Built with precision.",
    description: "Frontend, backend, infrastructure, integrations, and intelligent systems come together to transform the design into a working product.",
    locationCode: "WING D // ENGINEERING FACILITY",
    department: "Software & Creative Technology",
    transitionPrompt: "Trace system code logic",
    artifacts: [
      { label: "Frontend Stack", value: "React • TypeScript • WebGL" },
      { label: "Architecture", value: "Event-Driven Microservices" },
      { label: "Latency Target", value: "< 16ms 60fps Render Loop" }
    ]
  },
  {
    index: 6,
    number: "06",
    title: "THE QUALITY LAB",
    subtitle: "QUALITY & VALIDATION",
    narrative: "Nothing leaves unfinished.",
    headline: "Precision in every detail.",
    description: "Every experience is tested, refined, optimized, and validated before it reaches the real world.",
    locationCode: "WING E // VALIDATION RIG",
    department: "QA, Security & Performance",
    transitionPrompt: "Verify release approval",
    artifacts: [
      { label: "Automated Test Suites", value: "428 / 428 Passing" },
      { label: "Lighthouse Score", value: "100 Performance / 100 A11y" },
      { label: "Release Status", value: "Production Approved" }
    ]
  },
  {
    index: 7,
    number: "07",
    title: "THE LAUNCH CHAMBER",
    subtitle: "PRODUCT LAUNCH",
    narrative: "From a shared vision to something real.",
    headline: "An idea, brought to life.",
    description: "Aurora: A more intuitive way to bank. A functional demonstration showcasing our complete end-to-end digital product development methodology.",
    locationCode: "WING F // LAUNCH PAVILION",
    department: "Product Deployment",
    transitionPrompt: "Ascend to facility overview",
    artifacts: [
      { label: "Product Status", value: "Ready for Market" },
      { label: "Multi-Platform UI", value: "Desktop • Tablet • Mobile" },
      { label: "Classification", value: "Conceptual Portfolio Study" }
    ]
  },
  {
    index: 8,
    number: "08",
    title: "THE NEXT CREATION",
    subtitle: "Built to leave a mark.",
    narrative: "Your idea could be next.",
    headline: "Every great product has a story behind it. Let's build yours.",
    description: "Every journey leads to the same place — a conversation. Tell us about your ambition and let's craft an enduring digital product together.",
    locationCode: "ATRIUM // RETROSPECTIVE",
    department: "Client Partnership",
    transitionPrompt: "Start a conversation",
    artifacts: [
      { label: "Agency Status", value: "Accepting Q1/Q2 Projects" },
      { label: "Engagement Models", value: "End-to-End Product Design" },
      { label: "Response SLA", value: "Within 24 Hours" }
    ]
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'strategy',
    title: 'Strategy & Discovery',
    tagline: 'Turn complex insight into clear product roadmaps.',
    description: 'We help founders and product leaders navigate ambiguity. Before opening Figma or writing code, we dissect domain economics, technical constraints, and user mental models to define an articulate product north-star.',
    deliverables: [
      'Product North-Star Definition',
      'Information Architecture & System Scoping',
      'Technical Feasibility & Stack Selection',
      'Competitive Positioning & User Research'
    ],
    metrics: 'Clear execution plans that align executive vision with engineering delivery.',
    coordinates: [-8.0, 3.0, -8.0]
  },
  {
    id: 'design',
    title: 'Design & Experience',
    tagline: 'Craft interfaces that feel deliberate, calm, and tactile.',
    description: 'We believe digital tools should quiet the mind rather than amplify cognitive friction. We build multi-platform design systems and high-density application surfaces where every proportion, gesture, and typographical choice serves clarity.',
    deliverables: [
      'Multi-Platform Design Systems',
      'Tactile Web & Mobile Application UI',
      'Micro-Interactions & Motion Choreography',
      'Accessibility & Usability Hardening'
    ],
    metrics: 'Scalable component architectures designed for long-term maintainability.',
    coordinates: [-8.0, 3.0, -18.0]
  },
  {
    id: 'engineering',
    title: 'Engineering & Systems',
    tagline: 'Engineer interactive digital worlds with zero compromise.',
    description: 'We push the boundaries of real-time web rendering and robust software engineering. From custom Three.js / WebGL pipelines to resilient microservices, we build performant, 60fps web applications.',
    deliverables: [
      'Three.js & WebGL Interactive Experiences',
      'High-Performance React & TypeScript Frontends',
      'Resilient Serverless & Cloud Infrastructure',
      'Rigorous Frame-Budget Performance Tuning'
    ],
    metrics: 'Sub-16ms render loops and 99.99% uptime architectures across enterprise deployments.',
    coordinates: [8.0, 3.0, -18.0]
  },
  {
    id: 'quality',
    title: 'Quality & Optimization',
    tagline: 'Build resilient software and purposeful intelligence.',
    description: 'We architect comprehensive automated testing pipelines, performance audits, and applied machine intelligence workflows that eliminate edge-case regressions and maximize operational velocity.',
    deliverables: [
      'End-to-End Automated Regression Testing',
      'Lighthouse & Web Vitals Hardening',
      'Contextual AI & Domain Agent Integrations',
      'Cross-Platform Security & Zero-Trust Auditing'
    ],
    metrics: 'Flawless production releases backed by automated verification gates.',
    coordinates: [8.0, 3.0, -8.0]
  }
];

export const AURORA_CASE_STUDY: CaseStudyData = {
  title: 'Aurora',
  tagline: 'A more intuitive way to bank.',
  client: 'Evorique R&D Lab (Conceptual Study)',
  category: 'Conceptual Product Study — Digital Banking Infrastructure',
  duration: 'Internal Research & Design Initiative',
  year: '2025',
  overview: 'Aurora is an internal research and design study conducted by Evorique to explore the future of wealth management interfaces. Rather than mimicking the noisy, tabular grids of conventional retail banks, Aurora investigates whether spatial hierarchy, ambient data visualization, and serene typography can fundamentally reduce financial anxiety.',
  problem: 'Modern banking applications overwhelm users with flashing banners, cluttered transaction ledgers, and fragmented views between cash accounts, credit lines, and investments. The cognitive load forces users into a state of chronic defensive monitoring.',
  approach: 'Our studio developed a prototype centered around cash-flow topology rather than static ledgers. By rendering capital trajectories as continuous spatial curves and presenting sensitive actions with physical-feeling biometric affordances, we created an interface that feels like a calm personal sanctuary.',
  features: [
    {
      title: 'Predictive Horizon Mapping',
      description: 'Calculates true discretionary liquidity by modeling scheduled commitments and recurring cash inflows.'
    },
    {
      title: 'Tactile Security Affordance',
      description: 'Clear, reassuring physical gestures for authorizing high-value transfers, eliminating ambiguity.'
    },
    {
      title: 'Adaptive Typographical Density',
      description: 'Dynamic typographic scale that shifts between contemplative overview mode and dense tabular audit mode.'
    },
    {
      title: 'Unified Cross-Device Design System',
      description: 'Modular token system ensuring visual and spatial consistency between desktop monitors and handheld devices.'
    }
  ],
  impact: [
    { label: 'Project Status', value: 'Working Prototype' },
    { label: 'Design System', value: '42 Component Tokens' },
    { label: 'Interactive Surfaces', value: 'Desktop + Mobile' },
    { label: 'Studio Discipline', value: 'End-to-End Factory' }
  ]
};
