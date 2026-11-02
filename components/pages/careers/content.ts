// Copy for /careers under the keep rule: Scale's words stay unless they're false for Vahue (positioning copy source §0, §5).
// `// PLACEHOLDER` lines are for Mike: press, benefit claims, roles, locations and links without a route yet.
import type { BoardStrings, CareersContent, CareersJob } from './types'

const DIR = '/careers'
const LINK = '/demo' // PLACEHOLDER: no /careers/<id> pages or applicant system yet; rows and Apply go to Contact us

const role = (id: number, title: string, department: string, location: string): CareersJob => ({ id, title, department, location, href: LINK, applyUrl: LINK })

const board: BoardStrings = {
  searchPlaceholder: 'Search positions…',
  searchAria: 'Search job positions',
  clearSearchAria: 'Clear search',
  allDepartments: 'All Departments',
  departmentsCount: 'Departments',
  allLocations: 'All Locations',
  locationsCount: 'Locations',
  loading: 'Loading positions…',
  showing: 'Showing',
  role: 'role',
  roles: 'roles',
  matching: 'matching',
  inDepartment: 'in 1 dept',
  inDepartments: 'in {n} depts',
  location: 'location',
  locations: 'locations',
  noRolesCriteria: 'No roles match your criteria.',
  noPositionsFound: 'No positions found matching your criteria.',
  noPositionsFilters: 'No positions match your filters.',
  noPositionsAvailable: 'No positions available at the moment.',
  clearFilters: 'Clear filters ×',
  clearFiltersArrow: 'Clear filters →',
  across: 'across',
  department: 'department',
  departments: 'departments',
  expandAll: 'Expand all',
  collapseAll: 'Collapse all',
  of: 'of',
  expanded: 'expanded',
  apply: 'Apply →',
  applyAria: 'Apply for',
  positionsSuffix: 'positions',
}

const jobs: CareersJob[] = [
  role(1001, 'Baseline Analyst, Workflow Audits', 'Data Science and Analytics', 'New York, NY'), // PLACEHOLDER
  role(1002, 'Evaluation Data Analyst', 'Data Science and Analytics', 'Remote'), // PLACEHOLDER
  role(1003, 'Associate Forward-Deployed Engineer', 'Early Careers', 'New York, NY'), // PLACEHOLDER
  role(1004, 'Forward-Deployed Engineer', 'Engineering', 'San Francisco, CA; New York, NY'), // PLACEHOLDER
  role(1005, 'Senior Forward-Deployed Engineer, Back-office Sync Agents', 'Engineering', 'New York, NY'), // PLACEHOLDER
  role(1006, 'Forward-Deployed Engineer, Document Intake Agents', 'Engineering', 'London, UK'), // PLACEHOLDER
  role(1007, 'Agent Engineer, Support and Voice Agents', 'Engineering', 'Austin, TX'), // PLACEHOLDER
  role(1008, 'Staff Software Engineer, Context and Integrations', 'Engineering', 'San Francisco, CA'), // PLACEHOLDER
  role(1009, 'Domain Expert, Insurance Claims', 'Domain Specialists', 'Remote'), // PLACEHOLDER
  role(1010, 'Finance Manager', 'Finance', 'New York, NY'), // PLACEHOLDER
  role(1011, 'IT Systems Engineer', 'IT', 'Austin, TX'), // PLACEHOLDER
  role(1012, 'Compliance Counsel, AI Governance', 'Legal & GRC', 'London, UK'), // PLACEHOLDER
  role(1013, 'Product Marketing Manager', 'Marketing and Communications', 'New York, NY'), // PLACEHOLDER
  role(1014, 'Agent Operations Lead', 'Operations', 'Toronto, Canada'), // PLACEHOLDER
  role(1015, 'Delivery Manager, Operated Workflows', 'Operations', 'London, UK'), // PLACEHOLDER
  role(1016, 'Technical Recruiter', 'People', 'Remote'), // PLACEHOLDER
  role(1017, 'Product Manager, Evals and Guardrails', 'Product and Design', 'San Francisco, CA'), // PLACEHOLDER
  role(1018, 'Product Designer, Exception Review', 'Product and Design', 'New York, NY'), // PLACEHOLDER
  role(1019, 'Solutions Architect, Regulated Industries', 'Regulated Industries', 'Toronto, Canada'), // PLACEHOLDER
  role(1020, 'Applied Research Engineer, Agent Evaluation', 'Research', 'San Francisco, CA'), // PLACEHOLDER
  role(1021, 'Account Executive, Mid-market', 'Sales', 'New York, NY'), // PLACEHOLDER
  role(1022, 'Solutions Consultant, Workflow Audits', 'Sales', 'London, UK'), // PLACEHOLDER
  role(1023, 'Workflow Audit Specialist', 'Specialist', 'Remote'), // PLACEHOLDER
]

export const content: CareersContent = {
  meta: {
    title: 'Careers at Vahue | Build the Future of AI | Vahue',
    description: "Join Vahue and power reliable AI systems. We're hiring engineers, researchers, and operators.",
  },
  hero: {
    headline: 'Vahue is growing. Grow with Us.',
    body: 'Join us as we develop reliable AI systems for the world’s most important workflows.',
    cta: { text: 'View Open Positions', url: '/careers#open-roles', smoothScrollTargetId: 'open-roles' },
    image: `${DIR}/careers.webp`,
  },
  news: {
    overtitle: 'In The News',
    title: 'Vahue In The News',
    cta: 'Read Article',
    items: [
      { key: 'news-1', label: 'Publication', title: "Vahue CEO Full Name pushes 'reliability' reality", href: '/blog', bgClass: 'bg-evergreen' }, // PLACEHOLDER
      { key: 'news-2', label: 'Publication', title: "Vahue's CEO says AI-related layoffs are often theater", href: '/blog', bgClass: 'bg-atlas-blue' }, // PLACEHOLDER
      { key: 'news-3', label: 'Publication', title: 'Most AI Pilots Are Stalling Before Full Production, Vahue Says', href: '/blog', bgClass: 'bg-scale-gray-10' }, // PLACEHOLDER
    ],
  },
  mission: {
    overtitle: 'Why',
    title: 'Our Mission',
    lead: "At Vahue, our mission is to develop reliable AI systems for the world's most important workflows. ",
    body: "Every industry across mid-market and enterprise is bringing AI to the center of operations. Yet despite this explosion of investment, there's still no clear blueprint for organizations to move from pilot to profit.",
    products: 'We run Back-office Sync, Document Intake, Sales and Booking, Scoring and Decision, Knowledge, and Support and Voice Agents inside the systems our customers already use, measured against a baseline we record on day one. ',
    engine: {
      before: 'Our ',
      firstLink: { text: 'Context and Integrations', href: '/data-engine' },
      middle: ' layer powers the most demanding agents, workflows, and enterprise knowledge systems with high-quality context. We then apply our experience partnering with operations teams running these agents to help more organizations customize and ',
      secondLink: { text: 'Apply AI', href: '/enterprise' },
      after: ' in their organizations.',
    },
    platform: 'And we encode our tradecraft into our Evals and Guardrails to help organizations successfully apply AI to their most critical business and operating decisions.',
  },
  credos: {
    overtitle: 'OUR CREDOS',
    title: 'Our Internal Core Values',
    subtitle: 'Our credos provide a framework for us to make decisions and work effectively as a team, ensuring we are aligned in executing on our mission.',
    items: [
      { title: 'Earn Customer Love', image: `${DIR}/img-earn-customer-love.svg`, description: 'We are passionate about our customers and their people and are devoted to their success. We know that trust and confidence is earned, not given, with every interaction, every delivery, and every time we solve their problems.' },
      { title: 'Team Flow', image: `${DIR}/img-team-flow.svg`, description: "We work as one Vahue. Ideas, energy, and support flow freely across teams because we are invested in each other's success. Optimize for the whole." },
      { title: 'Quality is Our Cheat Code', image: `${DIR}/img-quality-fractal.svg`, description: 'The systems that deliver quality are rare enough to be a structural advantage. When we deliver effectively and consistently, the economics change. Deals get bigger, cycles get shorter, and growth stops being incremental.' },
      { title: 'Find the 20%', image: `${DIR}/img-find-20.svg`, description: 'Not all hard work is equal. 80% of outcomes come from 20% of inputs. We find that 20% and execute completely, even when the work is tedious or meticulous. What we reject is effort without impact.' },
      { title: 'Write the Market', image: `${DIR}/img-write-the-market.svg`, description: "We don't read the market. We write it. Running live workflows puts us ahead of the market, and our job is to bring our partners there first." },
      { title: 'Three Moves Ahead', image: `${DIR}/img-three-moves-ahead.svg`, description: 'When making decisions, consider the consequences of consequences. Plan accordingly.' },
    ],
  },
  benefits: {
    overtitle: 'OUR BENEFITS',
    title: 'Supporting You To Do Your Best Work',
    subtitle: 'At Vahue, we believe your talent and achievements deserve to be met with a supportive community and flexible environment.',
    items: [
      { image: `${DIR}/img-health-wellbeing.webp`, title: 'Health & Wellbeing', description: "Our holistic approach to supporting our team includes comprehensive health coverage, dental and vision insurance, mental healthcare services, and more. PTO policies and accommodating schedules ensure you'll get time off when you need it to relax and recharge. Note that our offerings may vary by region as we strive to respond to the unique needs of our team around the globe." }, // PLACEHOLDER: benefits to confirm
      { image: `${DIR}/img-personal-career-growth.webp`, title: 'Personal & Career Growth', description: 'Continuously learn and grow through annual learning & development stipend, attending leadership breakfasts, manager training, speaker series, and joining an ERG.' }, // PLACEHOLDER: benefits to confirm
      { image: `${DIR}/img-building-community.webp`, title: 'Building Vahue Community', description: 'We welcome guests to our offices, and you can expect to see team families and friends around. Join local happy hours, and accept invites to game nights, book clubs, and many other employee-led community events.' }, // PLACEHOLDER: benefits to confirm
      { image: `${DIR}/img-parental-support.webp`, title: 'Parental Support', description: 'Balancing work and family is essential, and Vahue understands the importance of having adequate leave policies in place to promote a healthy home and work life.' }, // PLACEHOLDER: benefits to confirm
    ],
  },
  openRoles: {
    overtitle: 'Open positions',
    title: 'Help us bring human intelligence to software',
    board,
    jobs,
  },
  university: {
    headline: 'Join Graduate Engineer Careers', // PLACEHOLDER: Scale's university programme; confirm Vahue runs one
    cta: { text: 'Explore Opportunities', url: '/careers#open-roles', smoothScrollTargetId: 'open-roles' },
    image: `${DIR}/university-hero.webp`,
  },
}
