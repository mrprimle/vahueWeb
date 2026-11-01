// TODO: Vahue copy. Every string here is placeholder copy sized to match the
// length of the corresponding block on scale.com/public-sector-data-engine.

export const ASSET = '/templates/public-sector-data-engine'

export const hero = {
  title: 'Public Sector Signal Platform',
  body: 'Grounding decision intelligence for defense, intelligence, and civilian teams.',
  cta: 'Book a demo',
}

export const logos = {
  lead: 'Relied on by the most demanding teams in the field.',
  link: 'Meet our partners',
  // Same footprint as the five logos on the source page; neutral tiles only.
  tiles: [
    { w: 48, h: 63 },
    { w: 113, h: 30 },
    { w: 65, h: 51 },
    { w: 140, h: 31 },
    { w: 182, h: 20 },
  ],
}

export const overview = {
  eyebrow: 'Product overview',
  title: 'Public Sector Signal Platform',
  body: 'Raise model accuracy and reliability with carefully reviewed, expert data labels.',
  cards: [
    {
      icon: 'laptop' as const,
      title: 'Signal Labeling',
      body: 'Label every kind of input from text, video, maps, imagery and more. Turn around reliable data quickly with assisted tooling and a bench of trained domain reviewers.',
    },
    {
      icon: 'sparkles' as const,
      title: 'Signal Curation',
      body: 'See exactly what is inside your data. Search collections in plain language. Rank the slices that need labels first and close gaps before they reach the model.',
    },
    {
      icon: 'trend' as const,
      title: 'Model Review',
      body: 'Check model outputs against reviewed ground truth. Track model quality across releases. Find weak spots down to single object classes.',
    },
  ],
}

export const why = {
  eyebrow: 'Why Vahue',
  title: 'Model Quality Is Mission Critical for Public Programs',
  body: 'Precision and accuracy come from carefully reviewed data, backed by strong tooling and trained domain experts.',
  items: [
    {
      title: 'Integrated Review Tooling',
      body: 'One workspace for the full model workflow. Clean and calibrate inputs, run benchmark suites and error reviews, surface edge cases, and audit every label.',
    },
    {
      title: 'Current Machine Learning Methods',
      body: 'Apply learning strategies that speed up and focus the labeling effort. Assemble varied multimodal sets, flag likely errors, and sample where the model is unsure.',
    },
    {
      title: 'Expert Reviewers in the Loop',
      body: 'Draw on cleared domain specialists with long field experience for quality checks, adversarial testing, and steady refinement of labeling approaches.',
    },
  ],
}

export const testimonial = {
  eyebrow: 'Take it from the people we work with',
  quote:
    'Vahue sped up the gains in our model accuracy by giving us a complete data foundation and bringing modern commercial tooling and methods into a demanding defense program. Our accuracy rose more in three months working together than it had in the fifteen months before.',
  name: 'Jordan Avery',
  role: 'Research Lead',
}

export const demos = {
  eyebrow: 'Demos',
  title: 'Public Sector Signal Platform Demos',
  items: [
    { title: 'Exploring Data with the Platform' },
    { title: 'Object Detection and Model Quality Review' },
    { title: 'Faster Labels with Pre-annotation' },
  ],
}

export const resources = {
  eyebrow: 'Resources',
  title: 'Read More About Our Work',
  items: [
    { tag: 'Blog', title: 'Vahue selected for a ground robotics evaluation program' },
    { tag: 'Blog', title: 'Agreement Across the Joint Program' },
    { tag: 'Blog', title: 'Autonomy Basics: The Data Layer' },
    { tag: 'Blog', title: 'Voluntary Commitments on Safe AI' },
  ],
}

export const prefooter = {
  title: 'The next chapter of your field starts here',
  cta: 'Book a demo',
}
