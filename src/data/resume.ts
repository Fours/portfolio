// Content for the page, kept apart from layout so it's easy to edit.

export const email = 'kylewillett@gmail.com'

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

export type SystemNode = { title: string; sub: string }
export type SystemLayer = { name: string; nodes: SystemNode[] }

// The first node in each layer gets the accent outline.
export const systemLayers: SystemLayer[] = [
  {
    name: 'Client',
    nodes: [
      { title: 'React apps', sub: 'earlier AngularJS' },
      { title: 'EventSource', sub: 'async, message-driven UI' },
      { title: 'UX design', sub: 'B2B · B2C · admin tools' },
    ],
  },
  {
    name: 'API',
    nodes: [
      { title: 'REST services', sub: 'Node · Express' },
      { title: 'AWS Lambda', sub: 'serverless endpoints' },
      { title: 'Play Framework', sub: 'Scala web services' },
    ],
  },
  {
    name: 'Services',
    nodes: [
      { title: 'Scala + Akka', sub: 'clustered actor systems' },
      { title: 'Java + Spring', sub: 'B2B commerce · $80M/yr' },
      { title: 'Bounded contexts', sub: 'domain-driven design' },
    ],
  },
  {
    name: 'Data',
    nodes: [
      { title: 'Postgres', sub: 'relational · SQL' },
      { title: 'MongoDB', sub: 'document store' },
      { title: 'DynamoDB', sub: 'key-value at scale' },
    ],
  },
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

export type SkillGroup = { name: string; skills: string[]; featured?: boolean }

export const skillGroups: SkillGroup[] = [
  { name: 'Languages', skills: ['Scala', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { name: 'Frameworks & runtime', skills: ['React', 'Node.js', 'Akka', 'Kafka'] },
  { name: 'Data', skills: ['Postgres', 'MongoDB', 'DynamoDB', 'NoSQL'] },
  {
    name: 'Cloud & delivery',
    skills: ['AWS', 'Docker + Kubernetes', 'CI/CD', 'Git/GitHub', 'Unit Testing'],
  },
  { name: 'Practice', skills: ['Domain-Driven Design', 'Agile/Scrum', 'UX Design'] },
  { name: 'AI-assisted', skills: ['LLM-assisted development', 'Claude Code'], featured: true },
]
