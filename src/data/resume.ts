// Content for the page, kept apart from layout so it's easy to edit.

import type { TechIconName } from '../components/Icons'

export const email = 'kylewillett@gmail.com'

export type Social = { kind: 'x' | 'github' | 'youtube'; label: string; href: string }

export const socials: Social[] = [
  { kind: 'x', label: 'X (Twitter)', href: 'https://x.com/kylewillett' },
  { kind: 'github', label: 'GitHub', href: 'https://github.com/Fours' },
  { kind: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@kylewillett_' },
]

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#systems', label: 'Systems' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export const highlights = [
  { value: '$80M', label: 'annual revenue through the B2B commerce app I built' },
  { value: '1M+', label: 'users served by event-driven services with millions of records' },
  { value: '14 yrs', label: 'engineering at LifeWay, Designer to Senior Software Engineer' },
  { value: '1999', label: 'designing and building for the web since the last century' },
]

// Systems diagram: a made-up commerce + learning platform drawn in SVG user
// units (viewBox below). Coordinates are hand-placed; nudge them together.
export const archViewBox = { w: 1210, h: 560 }

export type ArchNode = {
  id: string
  kind: 'box' | 'store' | 'bus'
  title: string
  sub: string
  x: number
  y: number
  w: number
  h: number
  accent?: boolean
  // Outline color by role; see the .arch-node.is-* rules in index.css.
  tone?: 'gateway' | 'service' | 'store'
  // Draws stacked copies behind the box to suggest a clustered service.
  cluster?: boolean
}

export type ArchLabel = { text: string; x: number; y: number; anchor?: 'start' | 'middle' | 'end' }

export type ArchEdge = {
  kind: 'request' | 'event'
  points: [number, number][]
  // Arrowheads on both ends (publish + subscribe).
  twoWay?: boolean
  label?: ArchLabel
}

export type ArchRegion = { kind: 'cluster' | 'context'; x: number; y: number; w: number; h: number; label?: ArchLabel }

export const archRegions: ArchRegion[] = [
  { kind: 'context', x: 548, y: 194, w: 204, h: 242 },
  { kind: 'context', x: 768, y: 194, w: 204, h: 242 },
  { kind: 'context', x: 988, y: 194, w: 204, h: 242 },
]

export const archLabels: ArchLabel[] = [
  { text: 'CLIENTS', x: 110, y: 40, anchor: 'middle' },
  { text: 'EDGE', x: 365, y: 40, anchor: 'middle' },
]

export const archNodes: ArchNode[] = [
  { id: 'storefront', kind: 'box', title: 'Storefront', sub: 'React · TypeScript', x: 20, y: 60, w: 180, h: 80 },
  { id: 'admin', kind: 'box', title: 'Admin console', sub: 'React · live dashboards', x: 20, y: 470, w: 180, h: 80 },
  { id: 'api', kind: 'box', title: 'API gateway', sub: 'Auth · Rate-Limiting', x: 270, y: 60, w: 190, h: 80, tone: 'gateway' },
  { id: 'sse', kind: 'box', title: 'SSE gateway', sub: 'Node · EventSource', x: 270, y: 470, w: 190, h: 80, tone: 'gateway' },
  { id: 'orders', kind: 'box', title: 'Orders service', sub: 'Java · Spring', x: 560, y: 220, w: 180, h: 80, cluster: true, tone: 'service' },
  { id: 'licensing', kind: 'box', title: 'Licensing service', sub: 'Scala · Akka cluster', x: 780, y: 220, w: 180, h: 80, cluster: true, tone: 'service' },
  { id: 'learning', kind: 'box', title: 'Learning service', sub: 'Node · Express', x: 1000, y: 220, w: 180, h: 80, cluster: true, tone: 'service' },
  { id: 'postgres', kind: 'store', title: 'Postgres', sub: 'SQL', x: 610, y: 350, w: 130, h: 70, tone: 'store' },
  { id: 'dynamo', kind: 'store', title: 'DynamoDB', sub: 'key-value', x: 830, y: 350, w: 130, h: 70, tone: 'store' },
  { id: 'mongo', kind: 'store', title: 'MongoDB', sub: 'documents', x: 1050, y: 350, w: 130, h: 70, tone: 'store' },
  { id: 'kafka', kind: 'bus', title: 'Kafka event bus', sub: 'streamed, event-driven collaboration', x: 560, y: 480, w: 620, h: 60, accent: true },
]

// API routes are nested elbows (farthest service on the highest track) so they
// never cross. They stop at y 208, the top of each service's cluster stack.
export const archEdges: ArchEdge[] = [
  { kind: 'request', twoWay: true, points: [[200, 100], [270, 100]], label: { text: 'REST', x: 235, y: 91, anchor: 'middle' } },
  { kind: 'request', twoWay: true, points: [[460, 80], [1090, 80], [1090, 208]] },
  { kind: 'request', twoWay: true, points: [[460, 100], [870, 100], [870, 208]] },
  { kind: 'request', twoWay: true, points: [[460, 120], [650, 120], [650, 208]] },
  { kind: 'request', twoWay: true, points: [[675, 300], [675, 350]] },
  { kind: 'request', twoWay: true, points: [[895, 300], [895, 350]] },
  { kind: 'request', twoWay: true, points: [[1115, 300], [1115, 350]] },
  { kind: 'event', twoWay: true, points: [[585, 300], [585, 480]], label: { text: 'orderPlaced', x: 595, y: 460 } },
  { kind: 'event', twoWay: true, points: [[805, 300], [805, 480]], label: { text: 'licenseGranted', x: 815, y: 460 } },
  { kind: 'event', twoWay: true, points: [[1025, 300], [1025, 480]], label: { text: 'courseEnrolled', x: 1035, y: 460 } },
  { kind: 'event', points: [[560, 510], [460, 510]], label: { text: 'consume', x: 510, y: 501, anchor: 'middle' } },
  { kind: 'event', points: [[270, 510], [200, 510]], label: { text: 'SSE', x: 235, y: 501, anchor: 'middle' } },
  { kind: 'event', points: [[320, 470], [320, 200], [110, 200], [110, 140]], label: { text: 'SSE', x: 215, y: 191, anchor: 'middle' } },
]

export type Job = {
  dates: string
  title: string
  org: string
  bullets?: string[]
  summary?: string
  tags?: string[]
}

export const jobs: Job[] = [
  {
    dates: '2009 — 2023',
    title: 'Software Engineer → Senior SWE',
    org: 'LifeWay · Nashville, TN',
    bullets: [
      'Built an enterprise B2B e-commerce application with Java and Spring, responsible for $80M in annual revenue.',
      'Built resilient, event-driven enterprise services in Scala on clustered actor systems for e-commerce, online learning and digital licensing, serving 1M+ users with millions of records.',
      'Built REST web services in JavaScript (Node, Express, AWS Lambda) and Scala (Play Framework).',
      'Built modern front-end web applications with React, and earlier AngularJS, using EventSource for async, message-driven communication.',
      'Used Kafka for flexible, streamed, event-driven collaboration between microservices.',
      'Gathered requirements with product owners and business stakeholders and designed systems using domain-driven design and event-storming.',
      'Delivered incremental value with Scrum, versioning, code review, CI/CD, unit and end-to-end testing, and monitoring/analytics.',
      'Designed UX for B2B and B2C commerce, digital curriculum, internal dashboards and admin tools.',
    ],
    tags: ['Scala', 'Akka', 'Java · Spring', 'React', 'Node.js', 'Kafka', 'AWS'],
  },
  {
    dates: '2007 — 2009',
    title: 'Web Designer / Developer',
    org: 'Jewelry Television · Nashville, TN',
    summary:
      "Hired as web designer for ShopatHome.com, then JTVwatches.com, and grew into the head designer/developer role for the website. Created support materials for the site and marketing campaigns, and became the company's sole designer after the Web Director's departure, working alongside marketing, photographers and more.",
  },
  {
    dates: '2002 — 2007',
    title: 'Web Designer / Developer & Graphic Designer',
    org: 'Kyle W Design · Midland, MI',
    summary:
      'Ran graphic and web design projects from first client consultation through concept, design and launch: setting objectives, shaping the vision, content and structure, and consistently meeting deadlines within budget. Worked in HTML, CSS, PHP, MySQL, Photoshop and Illustrator.',
  },
  {
    dates: '2002 — 2006',
    title: 'Webmaster',
    org: 'Midland Free · Midland, MI',
    summary:
      'Organized and edited website content and designed marketing materials, from direct mailers and booklets to large banners. Built a 200-page website plus multimedia and video projects with Photoshop, Illustrator, HTML, CSS, JavaScript, PHP and MySQL.',
  },
]

// icon is a TechIcon name (see Icons.tsx); omit it when no logo fits.
export type Skill = { label: string; icon?: TechIconName }
export type SkillGroup = { name: string; skills: Skill[]; featured?: boolean }

export const skillGroups: SkillGroup[] = [
  {
    name: 'Languages',
    skills: [
      { label: 'Scala', icon: 'scala' },
      { label: 'Java', icon: 'openjdk' },
      { label: 'TypeScript', icon: 'typescript' },
      { label: 'JavaScript', icon: 'javascript' },
      { label: 'SQL' },
      { label: 'HTML/CSS', icon: 'html5' },
    ],
  },
  {
    name: 'Frameworks & runtime',
    skills: [
      { label: 'React', icon: 'react' },
      { label: 'Node.js', icon: 'nodedotjs' },
      { label: 'Akka' },
      { label: 'Kafka', icon: 'apachekafka' },
    ],
  },
  {
    name: 'Data',
    skills: [
      { label: 'Postgres', icon: 'postgresql' },
      { label: 'MongoDB', icon: 'mongodb' },
      { label: 'DynamoDB', icon: 'amazondynamodb' },
      { label: 'NoSQL' },
    ],
  },
  {
    name: 'Cloud & delivery',
    skills: [
      { label: 'AWS', icon: 'amazonwebservices' },
      { label: 'Docker + Kubernetes', icon: 'docker' },
      { label: 'CI/CD' },
      { label: 'Git/GitHub', icon: 'git' },
      { label: 'Unit Testing' },
    ],
  },
  {
    name: 'Practice',
    skills: [{ label: 'Domain-Driven Design' }, { label: 'Agile/Scrum' }, { label: 'UX Design' }],
  },
  {
    name: 'AI-assisted',
    skills: [{ label: 'LLM-assisted development' }, { label: 'Claude Code', icon: 'claude' }],
    featured: true,
  },
]
