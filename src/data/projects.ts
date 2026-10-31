export interface Project {
  slug: string;
  title: string;
  eyebrow: string;
  category: string;
  tagline: string;
  year: string;
  client: string;
  role: string[];
  shortDescription: string;
  overview: string;
  challenge: string;
  creativeDirection: string;
  designExploration: string;
  deliverables: string[];
  impact: { label: string; value: string }[];
  featuredImage: string;
  heroImage: string;
  galleryImages: { url: string; caption: string }[];
  isFeaturedLarge?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: 'aurora',
    title: 'Aurora',
    eyebrow: '01 / DIGITAL EXPERIENCE',
    category: 'Digital Experience & Product Design',
    tagline: 'A more intuitive way to bank.',
    year: '2025',
    client: 'Evorique R&D Lab (Conceptual Study)',
    role: ['Product Strategy', 'UI/UX Architecture', 'Design Systems', 'Prototyping'],
    shortDescription: 'A modern banking experience focused on simplicity, trust and control. By replacing anxious tabular clutter with spatial cash-flow topologies, Aurora turns financial management into a quiet, confident ritual.',
    overview: 'Aurora is an internal research and design study conducted by Evorique to explore the future of wealth management interfaces. Rather than mimicking the noisy, tabular grids of conventional retail banks, Aurora investigates whether spatial hierarchy, ambient data visualization, and serene typography can fundamentally reduce financial anxiety.',
    challenge: 'Modern banking applications overwhelm users with flashing banners, cluttered transaction ledgers, and fragmented views between cash accounts, credit lines, and investments. The cognitive load forces users into a state of chronic defensive monitoring.',
    creativeDirection: 'We created an interface that feels like a calm personal sanctuary. Every typographical choice, whitespace ratio, and gesture affordance was designed to soothe rather than overwhelm.',
    designExploration: 'Our studio developed a prototype centered around cash-flow topology rather than static ledgers. By rendering capital trajectories as continuous spatial curves and presenting sensitive actions with physical-feeling biometric affordances, users gain instant clarity.',
    deliverables: [
      'Spatial Balance Map & Topology',
      '42-Token Component Design System',
      'Unified Multi-Device System (Desktop & Mobile)',
      'Predictive Discretionary Cash Flow Curves'
    ],
    impact: [
      { label: 'Prototypes', value: 'Desktop + Mobile' },
      { label: 'Token Architecture', value: '42 Atoms & Molecules' },
      { label: 'Interaction Model', value: 'Spatial Topology' },
      { label: 'Research Initiative', value: 'Evorique R&D' }
    ],
    featuredImage: '/scenes/state_04_a_project.jpg',
    heroImage: '/scenes/state_05_inside_project.jpg',
    galleryImages: [
      { url: '/scenes/state_04_a_project.jpg', caption: 'Aurora interface evaluated in the natural daylight of the design studio.' },
      { url: '/scenes/state_05_inside_project.jpg', caption: 'Interface architecture showing responsive spatial hierarchy between desktop and handheld viewports.' },
      { url: '/scenes/aurora_mobile.png', caption: 'Handheld viewport focusing on discretionary capital horizons.' },
      { url: '/scenes/aurora_mountain.png', caption: 'Topographical art direction reflecting serene, enduring financial peace.' },
      { url: '/screens/design_screen.jpg', caption: 'Comprehensive typographic scale and component token matrix.' }
    ],
    isFeaturedLarge: true
  },
  {
    slug: 'the-mark',
    title: 'The Mark',
    eyebrow: '02 / BRAND IDENTITY',
    category: 'Brand Identity & Spatial Architecture',
    tagline: 'Monolithic form meets digital typography.',
    year: '2025',
    client: 'Evorique Studio Brand Initiative',
    role: ['Brand Strategy', 'Spatial Identity', 'Material Exploration'],
    shortDescription: 'An exploration of physical-digital brand environments, translating warm limestone, natural daylight, and monumental circular geometry into an enduring spatial identity.',
    overview: 'Created as a foundational brand world for Evorique, The Mark explores how physical architectural presence can anchor a modern digital creative studio. By balancing timeless limestone structures with crisp editorial typography, the project bridges ancient craftsmanship and contemporary technology.',
    challenge: 'Digital agency identities often lean into ephemeral neon gradients or sterile tech aesthetics that age rapidly. The challenge was to create a visual identity that feels permanent, architectural, and tactile.',
    creativeDirection: 'Warm ivory daylight, honed limestone surfaces, and circular monolithic apertures that frame natural light, perspective, and transition.',
    designExploration: 'Multiple spatial studies examining how sunlight interacts with curved stone portals at various times of day, creating dramatic light-shadow transitions.',
    deliverables: [
      'Spatial Brand Guidelines & Material Book',
      'Architectural Geometry Framework',
      'Editorial Monogram & Typographical Suite',
      'Digital Environmental Asset Suite'
    ],
    impact: [
      { label: 'Materiality', value: 'Honed Limestone' },
      { label: 'Geometry', value: 'Monolithic Portal' },
      { label: 'Identity System', value: 'Physical + Digital' },
      { label: 'Year', value: '2025' }
    ],
    featuredImage: '/scenes/state_01_the_mark.jpg',
    heroImage: '/scenes/state_02_the_thinking.jpg',
    galleryImages: [
      { url: '/scenes/state_01_the_mark.jpg', caption: 'The monolithic circular portal set on a limestone promontory.' },
      { url: '/scenes/state_02_the_thinking.jpg', caption: 'Natural daylight casting geometric shadow through the portal steps.' },
      { url: '/screens/ideation_screen.jpg', caption: 'Conceptual rationale and spatial layout documentation.' }
    ]
  },
  {
    slug: 'studio-interior',
    title: 'Studio Workspace',
    eyebrow: '03 / SPATIAL DESIGN',
    category: 'Environmental & Spatial Design',
    tagline: 'A place where ideas turn real.',
    year: '2024',
    client: 'Evorique Creative Studio',
    role: ['Spatial Planning', 'Interior Architecture', 'Material Sourcing'],
    shortDescription: 'A physical workspace designed to foster deep focus and collaboration, balancing raw limestone arches, natural daylight, and Scandinavian oak workbenches.',
    overview: 'The Evorique studio space was designed as an antidote to frantic open-plan offices. Generous ceiling heights, arched travertine portals, and floor-to-ceiling glass connect the interior with nature, providing a serene backdrop for creative exploration.',
    challenge: 'Balancing dedicated high-focus workstations with fluid collaborative areas, while maintaining exceptional acoustic dampening and natural daylight penetration.',
    creativeDirection: 'Honest materials—limestone, solid oak, brushed brass, and linen—arranged with minimal visual clutter to maximize mental clarity.',
    designExploration: 'Acoustic studies and natural light modeling ensuring workstations receive glare-free northern daylight throughout working hours.',
    deliverables: [
      'Architectural Layout Plan & Spatial Zones',
      'Custom Oak Furniture Specifications',
      'Integrated Dual-Display Workstation Ergonomics'
    ],
    impact: [
      { label: 'Natural Light', value: 'Floor-to-Ceiling' },
      { label: 'Primary Timber', value: 'Solid White Oak' },
      { label: 'Acoustic Rating', value: 'Quiet Studio Class' },
      { label: 'Status', value: 'Active Studio' }
    ],
    featuredImage: '/scenes/state_03_inside_studio.jpg',
    heroImage: '/scenes/state_03_inside_studio.jpg',
    galleryImages: [
      { url: '/scenes/state_03_inside_studio.jpg', caption: 'Double-height arched studio space with natural north-facing illumination.' },
      { url: '/screens/strategy_screen.jpg', caption: 'Collaborative strategy workshop suite and research map.' }
    ]
  },
  {
    slug: 'archipelago',
    title: 'Archipelago',
    eyebrow: '04 / CREATIVE TECHNOLOGY',
    category: 'Creative Technology & Spatial Interaction',
    tagline: 'Navigating interconnected digital realms.',
    year: '2025',
    client: 'Evorique Interactive Research',
    role: ['Interaction Design', 'Creative Coding', 'Real-Time WebGL'],
    shortDescription: 'An interconnected network of spherical glass atriums, water promenades, and pedestrian bridges exploring spatial navigation on the web.',
    overview: 'Archipelago investigates how spatial web environments can replace traditional hierarchical page navigation. By organizing studio capabilities and case studies as interconnected islands across a calm water expanse, visitors explore work through intuitive orientation.',
    challenge: 'Creating an expansive 3D web environment that maintains sub-16ms 60fps render loops and accessibility on modern mobile devices.',
    creativeDirection: 'Pristine glass atriums, tranquil turquoise waters, and stone causeways inspired by Mediterranean coastal pavilions.',
    designExploration: 'Level-of-detail optimization, procedural water shaders with dynamic light caustics, and responsive camera trajectories.',
    deliverables: [
      'WebGL Real-Time Rendering Pipeline',
      'Spatial Navigation Interface Pattern',
      'Multi-Device Lightweight Shader Package'
    ],
    impact: [
      { label: 'Target Frame Budget', value: '< 16.6ms (60fps)' },
      { label: 'Shader Architecture', value: 'Custom Three.js' },
      { label: 'Topology', value: 'Multi-Node Island Network' },
      { label: 'Year', value: '2025' }
    ],
    featuredImage: '/scenes/state_06_capabilities.jpg',
    heroImage: '/scenes/state_07_contact.jpg',
    galleryImages: [
      { url: '/scenes/state_06_capabilities.jpg', caption: 'The interconnected spherical atriums and pedestrian bridges of the Archipelago network.' },
      { url: '/scenes/state_07_contact.jpg', caption: 'Panoramic architectural arch pavilion overlooking the calm horizon.' },
      { url: '/screens/code_screen.jpg', caption: 'System code engine and event-driven architecture overview.' }
    ],
    isFeaturedLarge: true
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
