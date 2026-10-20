import { CapabilityItem, CaseStudyData } from '../types';

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'strategy',
    title: 'Strategy & Architecture',
    tagline: 'Turn complex insight into clear product roadmaps.',
    description: 'We help founders and product leaders navigate ambiguity. Before opening Figma or writing code, we dissect domain economics, technical constraints, and user mental models to define an articulate product north-star.',
    deliverables: [
      'Product North-Star Definition',
      'Information Architecture & System Scoping',
      'Technical Feasibility & Stack Selection',
      'Competitive Positioning & User Research'
    ],
    metrics: 'Clear execution plans that align executive vision with engineering delivery.',
    coordinates: [-6.2, 1.8, -6.5]
  },
  {
    id: 'design',
    title: 'Product & System Design',
    tagline: 'Craft interfaces that feel deliberate, calm, and tactile.',
    description: 'We believe digital tools should quiet the mind rather than amplify cognitive friction. We build multi-platform design systems and high-density application surfaces where every proportion, gesture, and typographical choice serves clarity.',
    deliverables: [
      'Multi-Platform Design Systems',
      'Tactile Web & Mobile Application UI',
      'Micro-Interactions & Motion Choreography',
      'Accessibility & Usability Hardening'
    ],
    metrics: 'Scalable component architectures designed for long-term maintainability.',
    coordinates: [-4.2, 1.2, -2.2]
  },
  {
    id: 'technology',
    title: 'Creative Technology & WebGL',
    tagline: 'Engineer interactive digital worlds with zero compromise.',
    description: 'We push the boundaries of real-time web rendering. From custom Three.js / WebGL shader pipelines to spatial digital experiences, we build performant, 60fps web graphics that load quickly and scale across device tiers.',
    deliverables: [
      'Three.js & WebGL Interactive Experiences',
      'Shader Development & Lighting Pipelines',
      'Hardware-Accelerated Canvas Rendering',
      'Rigorous Frame-Budget Performance Tuning'
    ],
    metrics: 'Sub-16ms render loops and smooth frame-delivery on mobile and desktop.',
    coordinates: [6.2, 1.8, -6.5]
  },
  {
    id: 'engineering',
    title: 'Engineering & Applied AI',
    tagline: 'Build resilient software and purposeful intelligence.',
    description: 'We architect and build full-stack web applications with modern TypeScript frameworks, robust APIs, and thoughtful machine intelligence integrations that solve practical workflow bottlenecks rather than acting as marketing gimmicks.',
    deliverables: [
      'High-Performance React & TypeScript Frontends',
      'Resilient Serverless & Cloud Infrastructure',
      'Contextual AI & Domain Agent Integrations',
      'Continuous Integration & End-to-End Testing'
    ],
    metrics: 'Reliable, well-documented codebases built for internal team handover.',
    coordinates: [4.5, 1.2, -2.2]
  }
];

export const AURORA_CASE_STUDY: CaseStudyData = {
  title: 'Aurora',
  tagline: 'A more intuitive way to bank.',
  client: 'Evorique R&D Lab (Conceptual Study)',
  category: 'Conceptual Product Study — Digital Banking Infrastructure',
  duration: 'Internal Research Initiative',
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
    { label: 'Component System', value: '42 Tokens' },
    { label: 'Interactive Surfaces', value: 'Desktop + Mobile' },
    { label: 'Studio Discipline', value: 'Design + WebGL' }
  ]
};
