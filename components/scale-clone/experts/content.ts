// Content for /scale-clone/experts: scale.com/experts copy (captured 2026-11-01), so QA lines up with the live page.
// Every section reads its slice from ExpertsContent; a Vahue page passes its own content object.
// Third-party logos are not shipped: logo slots carry the institution name (alt) and Scale's intrinsic size, and
// render as text tiles (sphere textures, marquee tiles, testimonial tabs). A page may pass `src` to use real marks.

export const ASSET = '/scale-clone/experts'

export type Cta = { label: string; href: string }

export type HeroContent = { headline: string; body?: string; cta: Cta; video?: string; poster: string }

export type ExpertCard = { title: string; body: string; icon: 'academic' | 'industry' | 'worldwide' | 'domain'; hover: string }
export type CardGridContent = { heading: string; cards: ExpertCard[] }

export type Logo = { alt: string; width: number; height: number; src?: string }
export type Domain = {
  label: string
  key: string
  whoTheyAre: string
  skills: string
  projectType: string
  peerReviewedPublications?: string
  logos: Logo[]
}
export type DomainContent = {
  heading: string
  /** row labels: Who they are / Expertise / Project Type / Peer Reviewed Publications */
  labels: { who: string; skills: string; project: string; peer: string }
  /** domain key -> colour (word, active pill, swatch) */
  colors: Record<string, string>
  domains: Domain[]
}

export type TestimonialItem = { name: string; title: string; quote: string; logo: Logo }
export type TestimonialsContent = { heading: string; items: TestimonialItem[] }

export type ResourcePost = { title: string; category: string; href: string; image?: string }
export type ResourcesContent = { heading: string; posts: ResourcePost[] }

export type ExpertsContent = {
  hero?: HeroContent
  cardGrid?: CardGridContent
  domains?: DomainContent
  testimonials?: TestimonialsContent
  resources?: ResourcesContent
  prefooter?: HeroContent
}

export const expertsContent: ExpertsContent = {
  hero: {
    headline: 'The human experts behind frontier AI.',
    body: "Millions of experts deployed against the world's hardest training problems.",
    cta: { label: 'Work With Us', href: '/scale-clone/demo' },
    video: `${ASSET}/hero.mp4`,
    poster: `${ASSET}/hero-poster.webp`,
  },
  cardGrid: {
    heading: 'World class experts from top institutions',
    cards: [
      { icon: 'academic', title: 'Elite academic backgrounds', body: 'Alumni of every Ivy League school, plus Stanford, MIT, and beyond', hover: '#a8927c' },
      { icon: 'industry', title: 'Deep, top-tier industry experience', body: 'Representation from employees of 60%+ of the Fortune 500', hover: '#79648c' },
      { icon: 'worldwide', title: 'Worldwide representation', body: '65+ languages. 117 countries.', hover: '#929292' },
      { icon: 'domain', title: 'Specialized domain expertise', body: 'Expertise across 370+ unique fields', hover: '#839cb2' },
    ],
  },
  domains: {
    heading: 'The best minds in',
    labels: { who: 'Who they are', skills: 'Expertise', project: 'Project Type', peer: 'Peer Reviewed Publications' },
    colors: {
      finance: '#193A29',
      'law & policy': '#273252',
      healthcare: '#1A4A5A',
      'software engineering': '#839CB2',
      'other engineering': '#A8927C',
      'research & academia': '#79648C',
      'professional services': '#3D5566',
    },
    domains: [{ label: "Finance", key: "finance", whoTheyAre: "Investment bankers, sell-side analysts, portfolio managers, quant researchers, risk & compliance officers, buy-side private equity analysts", skills: "Financial statement analysis, earnings modeling, valuation methodology, trading logic", projectType: "Financial reasoning evaluation, content understanding, prompt generation, and model preference ranking", logos: [{ alt: "Goldman Sachs", width: 70, height: 29 }, { alt: "JP Morgan", width: 110, height: 22 }, { alt: "Citadel", width: 100, height: 12 }, { alt: "Jane Street", width: 110, height: 29 }, { alt: "Morgan Stanley", width: 120, height: 17 }, { alt: "KKR", width: 44, height: 44 }, { alt: "Two Sigma", width: 110, height: 21 }, { alt: "Citi", width: 60, height: 38 }, { alt: "Bank of America", width: 110, height: 11 }, { alt: "Barclays", width: 110, height: 19 }, { alt: "Blackstone", width: 110, height: 43 }, { alt: "TPG", width: 60, height: 25 }, { alt: "Brookfield", width: 110, height: 16 }, { alt: "Silver Lake", width: 110, height: 21 }, { alt: "Carlyle", width: 110, height: 14 }, { alt: "Apollo", width: 100, height: 15 }, { alt: "Vista Equity", width: 100, height: 21 }, { alt: "Ares", width: 80, height: 25 }] }, { label: "Law & Policy", key: "law & policy", whoTheyAre: "Verified big law partners & practicing attorneys, public policy specialists, regulatory & compliance professionals, M&A corporate counsel, federal litigators, state prosecutors, defense lawyers, appellate attorneys", skills: "Contract review & clause-level annotation, Regulatory interpretation, Legislative drafting & policy analysis, Case law reasoning & legal citation verification", projectType: "Legal reasoning evaluation, content understanding, prompt generation, and model preference ranking", logos: [{ alt: "White House", width: 55, height: 56 }, { alt: "United Nations", width: 36, height: 36 }, { alt: "Pentagon", width: 120, height: 22 }, { alt: "Latham & Watkins", width: 140, height: 22 }, { alt: "Sullivan & Cromwell", width: 150, height: 9 }, { alt: "Linklaters", width: 140, height: 24 }, { alt: "Skadden", width: 100, height: 22 }, { alt: "Clifford Chance", width: 140, height: 22 }, { alt: "Freshfields", width: 150, height: 14 }, { alt: "Cravath", width: 140, height: 20 }, { alt: "Kirkland & Ellis", width: 110, height: 13 }, { alt: "Gibson Dunn", width: 130, height: 22 }, { alt: "CIA", width: 44, height: 44 }, { alt: "NSA", width: 56, height: 22 }, { alt: "DARPA", width: 70, height: 40 }, { alt: "U.S. Courts", width: 120, height: 22 }, { alt: "Brookings", width: 130, height: 17 }, { alt: "RAND", width: 100, height: 20 }, { alt: "DOJ", width: 110, height: 42 }, { alt: "SEC", width: 56, height: 22 }] }, { label: "Healthcare", key: "healthcare", whoTheyAre: "Attending physicians, board-certified specialists, postdoctoral researchers, registered nurses, computational biologists — including oncologists, cardiologists, radiologists, dermatologists, and neurologists", skills: "Diagnostic reasoning, medical imaging annotation, trial data review", projectType: "Clinical reasoning evaluation, content understanding, prompt generation, and model preference ranking", logos: [{ alt: "WHO", width: 170, height: 52 }, { alt: "Mount Sinai", width: 190, height: 56 }, { alt: "Mass General", width: 180, height: 26 }, { alt: "Mayo Clinic", width: 36, height: 36 }, { alt: "Johns Hopkins", width: 120, height: 25 }, { alt: "Cleveland Clinic", width: 120, height: 19 }, { alt: "UCSF", width: 90, height: 44 }, { alt: "Stanford Medicine", width: 110, height: 36 }, { alt: "NYU Langone", width: 80, height: 34 }, { alt: "NIH", width: 170, height: 26 }, { alt: "CDC", width: 140, height: 33 }] }, { label: "Software Engineering", key: "software engineering", whoTheyAre: "Engineers specializing in backend, system & infrastructure, frontend, data, distributed systems, performance, hardware architecture, cryptography, network and protocols", skills: "Code generation and correctness evaluation, security vulnerability identification, system architecture review, debugging", projectType: "Code generation and review, reinforcement learning with verifiable rewards, tool use evaluation, and model preference ranking", logos: [{ alt: "Jane Street", width: 110, height: 29 }, { alt: "Two Sigma", width: 110, height: 21 }, { alt: "Citadel", width: 100, height: 12 }, { alt: "SpaceX", width: 110, height: 14 }, { alt: "Waymo", width: 90, height: 82 }, { alt: "Stripe", width: 65, height: 31 }, { alt: "Palantir", width: 110, height: 27 }, { alt: "Anduril", width: 110, height: 25 }, { alt: "Hugging Face", width: 44, height: 44 }] }, { label: "Other Engineering", key: "other engineering", whoTheyAre: "Mechanical and chemical engineers with hands-on domain expertise across industrial systems, materials science, and process engineering", skills: "Technical analysis, system design, quality assurance, CAD review", projectType: "Technical task completion, chain-of-thought reasoning, tool use, and model preference ranking", logos: [{ alt: "GE", width: 44, height: 44 }, { alt: "Siemens", width: 110, height: 18 }, { alt: "Honeywell", width: 110, height: 20 }, { alt: "Bosch", width: 110, height: 25 }, { alt: "Shell", width: 48, height: 44 }, { alt: "BP", width: 44, height: 44 }, { alt: "Dow", width: 100, height: 33 }, { alt: "3M", width: 80, height: 42 }, { alt: "ABB", width: 90, height: 36 }, { alt: "ExxonMobil", width: 110, height: 21 }] }, { label: "Research & Academia", key: "research & academia", whoTheyAre: "Postdoctoral researchers, research scientists, tenure-track faculty, and verified h-index contributors — published in Nature, Science, or Cell", skills: "Published in Nature, Science, or Cell — plus recipients of Rhodes, Fulbright, and NSF fellowships", projectType: "Research reasoning tasks, content understanding, tool use, and model preference ranking", peerReviewedPublications: "Verified peer reviewed publications in top-tier journals including Nature, Science, and Cell", logos: [{ alt: "Harvard", width: 110, height: 36 }, { alt: "Stanford", width: 110, height: 30 }, { alt: "Caltech", width: 110, height: 30 }, { alt: "Cambridge", width: 110, height: 36 }, { alt: "Fulbright", width: 110, height: 21 }, { alt: "MIT", width: 80, height: 32 }, { alt: "Princeton", width: 110, height: 32 }, { alt: "Yale", width: 80, height: 40 }, { alt: "UChicago", width: 110, height: 32 }, { alt: "UPenn", width: 110, height: 28 }, { alt: "Imperial", width: 110, height: 28 }, { alt: "UCL", width: 80, height: 36 }, { alt: "Nature", width: 100, height: 24 }, { alt: "Science", width: 100, height: 28 }, { alt: "Cell", width: 100, height: 18 }, { alt: "Rhodes Trust", width: 36, height: 36 }, { alt: "NSF", width: 60, height: 8 }, { alt: "NIH", width: 170, height: 26 }] }, { label: "Professional Services", key: "professional services", whoTheyAre: "Management consultants, strategy advisors, Big 4 auditors & accountants, actuaries, tax specialists, operations professionals", skills: "Business process analysis, financial controls & audit, strategy frameworks, organizational design", projectType: "Business reasoning evaluation, document comprehension & summarization, structured decision-making annotation", logos: [{ alt: "McKinsey", width: 110, height: 22 }, { alt: "Deloitte", width: 118, height: 22 }, { alt: "PwC", width: 72, height: 22 }, { alt: "KPMG", width: 55, height: 22 }, { alt: "EY", width: 22, height: 22 }, { alt: "Accenture", width: 120, height: 22 }, { alt: "Oliver Wyman", width: 120, height: 22 }, { alt: "Booz Allen", width: 110, height: 22 }, { alt: "Roland Berger", width: 130, height: 22 }, { alt: "A.T. Kearney", width: 110, height: 22 }] }],
  },
  testimonials: {
    heading: 'Expert voices',
    items: [
      {
        name: 'Amer Iqbal',
        title: 'MIT, Goldman Sachs',
        quote:
          'I\'ve asked the frontier models a lot of questions related to the Gopakumar-Vafa invariants for a specific geometry, and I\'ve always used my favorite technique in order to solve it: the "topological vertex" method. Now, it often defaults to that technique. So I think somewhere in there, my contributions to the training might be having a visible impact.',
        logo: { alt: 'Goldman Sachs', width: 70, height: 29 },
      },
      {
        name: 'Vivian Wei',
        title: 'Harvard, Bank of America',
        quote:
          'At Bank of America, I analyzed regulatory capital data across eight lines of business. It led me to develop a strong intuition that I now use to stump the model: I know precisely where humans make the most mistakes in financial modeling, and I can transfer that knowledge into an agent environment.',
        logo: { alt: 'Bank of America', width: 110, height: 11 },
      },
    ],
  },
  resources: {
    heading: 'Resources',
    posts: [
      { title: 'Scale Labs: AI Model Leaderboards & Benchmarks', category: 'Leaderboard', href: 'https://labs.scale.com/leaderboard' },
      { title: 'Human Frontier Collective: Lead the Future of Intelligence, Together', category: 'Fellowship', href: 'https://hfc.scale.com/', image: `${ASSET}/resource-hfc.webp` },
      { title: 'Outlier: Become the Expert That AI Learns From', category: 'Platform', href: 'https://outlier.ai/', image: `${ASSET}/resource-outlier.webp` },
      { title: 'Reinforcement Learning Environments for AI Agents', category: 'Product', href: '/scale-clone/rlenvironments', image: `${ASSET}/resource-rlenvironments.webp` },
      { title: 'Generative AI Data Engine', category: 'Product', href: '/scale-clone/generative-ai-data-engine', image: `${ASSET}/resource-genai-data-engine.webp` },
    ],
  },
  prefooter: {
    headline: 'Start with the Right Experts.',
    body: "Scale's team will match your project to the verified domain experts, fast.",
    cta: { label: 'Work With Us', href: '/scale-clone/demo' },
    poster: `${ASSET}/prefooter.webp`,
  },
}
