export interface Capability {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
}

export interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export const SITE = {
  brand: 'EVORIQUE',
  eyebrow: 'INDEPENDENT CREATIVE STUDIO',
  tagline: 'Built to leave a mark.',
  headline: 'WE MAKE IDEAS IMPOSSIBLE TO IGNORE.',
  positioning:
    'An independent creative studio shaping distinctive identities and digital experiences through design, technology and imagination.',
  philosophy: {
    headline: "GOOD DESIGN ISN'T DECORATION. IT'S INTENTION.",
    body: 'We believe every detail has a purpose. From the first concept to the final interaction, we bring clarity, character and craft to everything we create.',
    principles: [
      {
        title: 'Clarity Over Noise',
        description: 'We strip away superfluous ornament until only the essential gesture remains.'
      },
      {
        title: 'Architectural Restraint',
        description: 'We treat digital space with the spatial permanence, rhythm, and dignity of physical architecture.'
      },
      {
        title: 'Tactile Technology',
        description: 'We believe software should feel physical, deliberate, and calm to interact with.'
      }
    ]
  },
  capabilities: [
    {
      number: '01',
      title: 'BRAND IDENTITY',
      tagline: 'Distinctive visual language that creates an enduring presence.',
      description: 'Brand strategy, visual identity, typography and visual systems.',
      tags: ['Brand Strategy', 'Visual Identity', 'Typography', 'Visual Systems', 'Art Direction']
    },
    {
      number: '02',
      title: 'DIGITAL EXPERIENCES',
      tagline: 'Memorable web spaces that blur editorial craft with modern interaction.',
      description: 'Website design, web experiences, interaction design and digital interfaces.',
      tags: ['Editorial Websites', 'Web Experiences', 'Interaction Design', 'Digital Interfaces']
    },
    {
      number: '03',
      title: 'PRODUCT DESIGN',
      tagline: 'Digital tools designed to quiet cognitive load and inspire confidence.',
      description: 'UI/UX, wireframes, prototypes and design systems.',
      tags: ['UI/UX Design', 'Design Systems', 'Interactive Prototyping', 'Information Architecture']
    },
    {
      number: '04',
      title: 'CREATIVE TECHNOLOGY',
      tagline: 'Pushing real-time rendering, procedural motion, and applied intelligence.',
      description: 'Motion, 3D, interactive experiences and AI-led creative exploration.',
      tags: ['WebGL & Three.js', 'Motion Choreography', '3D Visualization', 'Creative Coding']
    }
  ] as Capability[],
  process: {
    headline: 'FROM FIRST THOUGHT TO FINAL FORM.',
    stages: [
      {
        number: '01',
        title: 'DISCOVER',
        subtitle: 'Listen, dissect, uncover',
        description: 'Understand the problem, audience and opportunity.',
        deliverables: ['Stakeholder Immersion', 'Audience Mental Models', 'Strategic Opportunity Matrix']
      },
      {
        number: '02',
        title: 'DEFINE',
        subtitle: 'Articulate the north-star',
        description: 'Establish creative direction, positioning and strategy.',
        deliverables: ['Creative Direction', 'Brand & Product Positioning', 'Information Architecture']
      },
      {
        number: '03',
        title: 'DESIGN',
        subtitle: 'Give form to the idea',
        description: 'Explore concepts, prototype and refine the experience.',
        deliverables: ['Design Explorations', 'Interactive Prototypes', 'Design System Tokens']
      },
      {
        number: '04',
        title: 'DELIVER',
        subtitle: 'Engineer with precision',
        description: 'Build, test and launch the final work.',
        deliverables: ['Production Frontend Build', 'Cross-Device QA & Tuning', 'Launch & Handover']
      }
    ] as ProcessStage[]
  },
  studio: {
    headline: 'SMALL STUDIO. BIG IDEAS.',
    body: 'We are an independent creative studio interested in the intersection of design, technology and meaningful digital experiences.',
    statement:
      'We deliberately maintain a lean, senior-led practice. When you work with Evorique, you collaborate directly with the designers and engineers who conceptualise and craft the work. No layers of account handlers. No diluted ideas. Just rigorous craft and clear thinking.',
    attributes: [
      { label: 'Studio Model', value: 'Independent & Senior-Led' },
      { label: 'Practice Focus', value: 'Digital Experiences & Identities' },
      { label: 'Location', value: 'Remote / Global Engagements' },
      { label: 'Availability', value: 'Accepting Q1 / Q2 Inquiries' }
    ]
  },
  contact: {
    headline: "LET'S MAKE SOMETHING WORTH REMEMBERING.",
    body: "Have a project, an idea or a challenge? We'd love to hear about it.",
    cta: 'START A PROJECT',
    email: 'inquiries@evorique.agency',
    phone: '+1 (415) 890-4820',
    responseSla: 'We respond to all new inquiries within 24 hours.'
  },
  socials: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Twitter / X', url: 'https://x.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'GitHub', url: 'https://github.com/Parnavi06/Evorique' }
  ],
  navLinks: [
    { label: 'WORK', href: '#work' },
    { label: 'STUDIO', href: '#studio' },
    { label: 'SERVICES', href: '#services' },
    { label: 'CONTACT', href: '#contact' }
  ]
};
