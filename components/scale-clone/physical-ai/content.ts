// TODO: Vahue copy. Every string here is placeholder copy sized to match the scale.com/physical-ai block it stands in for.

export const ASSET = '/scale-clone/physical-ai'

export type IconName =
  | 'globe'
  | 'storage'
  | 'layers'
  | 'trending'
  | 'headset'
  | 'robot'
  | 'handshake'
  | 'shield-check'
  | 'shield'

export const hero = {
  image: `${ASSET}/hero-robotics-lab.webp`,
  headline: 'Embodied Data Platform',
  body: 'Driving the Next Generation of Robots',
  primary: { text: 'Book a Call', href: '#' },
  logosLabel: 'Placeholder line for the partner logo strip',
  logoCount: 5,
}

export const overview = {
  eyebrow: 'Product Overview',
  title: 'A Data Platform for Embodied AI',
  items: [
    { icon: 'globe', title: 'Worldwide Capture Network', body: 'Placeholder copy describing a broad network of capture sites, field operators and partner teams that feed the platform.' },
    { icon: 'storage', title: 'Throughput at Any Size', body: 'Placeholder copy about growing to many operators and moving very large volumes of sensor data without slowing down.' },
    { icon: 'layers', title: 'Variety You Can Count On', body: 'Placeholder copy on training with data gathered across many bodies, settings and task types.' },
    { icon: 'trending', title: 'Measured Model Lift', body: 'Placeholder copy on datasets enriched with context and labels that are shown to lift model results.' },
  ] as { icon: IconName; title: string; body: string }[],
}

export const testimonials = {
  heading: 'See what partners have to say',
  items: [
    {
      name: 'Alex Morgan',
      title: 'Co-Founder & CTO',
      quote: 'Placeholder quote from a partner about how the team has been a steady source of rich, well-labelled data. We are glad to keep building the next stage together.',
    },
    {
      name: 'Jordan Lee',
      title: 'Founder & CEO',
      quote: 'Placeholder quote from a second partner. It runs longer so the panel can show how a multi-line testimonial settles into place. The team moved quickly when our needs shifted, and they already helped us shape a dataset we rely on every week. We look forward to pushing further with them on embodied learning, on the tooling around it and on the data that comes next.',
    },
  ],
}

export const useCase = {
  eyebrow: 'Use Case',
  title: 'Clear the Biggest Hurdle in Robot Learning',
  heading: 'Wide-Ranging Settings',
  body: [
    'Placeholder copy: hundreds of hours of varied demo data are gathered and uploaded to the platform every day.',
    'Placeholder copy: use the platform to speed up your program and lift model quality.',
  ],
  image: { src: `${ASSET}/use-case.png`, width: 1214, height: 636 },
}

export const embodiments = {
  eyebrow: 'Key Features',
  title: 'An Expanding Hardware Lineup',
  subtitle: 'Placeholder subtitle on data from capable hardware rigs that are tuned for steady capture.',
  cards: [
    { image: `${ASSET}/img-embodiment-1.webp`, title: 'Dual-Arm Rigs', body: 'Placeholder copy about remote-operated demos from leading arms' },
    { image: `${ASSET}/img-embodiment-2.webp`, title: 'Wearable Capture Kit', body: 'Placeholder copy about a hands-free kit made for spread-out capture' },
    { image: `${ASSET}/img-embodiment-3.webp`, title: 'Custom Capture Setups', body: 'Placeholder copy: your rigs, run by our crew' },
  ],
}

export const environments = {
  title: 'Settings Around the World',
  subtitle: 'Placeholder subtitle on data gathered in many places worldwide.',
  cards: [
    { image: `${ASSET}/img-environment-1.webp`, title: 'Capture Studios', body: 'Placeholder copy on central, high-volume sites' },
    { image: `${ASSET}/img-environment-2.webp`, title: 'In the Home', body: 'Placeholder copy on home capture with operators worldwide' },
    { image: `${ASSET}/img-environment-3.webp`, title: 'Work Sites and Industry', body: 'Placeholder copy about rigs deployed on site' },
  ],
}

export const annotations = {
  first: {
    title: 'Grounded Labels Across Every Sensor',
    body: ['Placeholder copy about getting much more from your robot data with strong labels and expert human review on every demo.'],
    image: { src: `${ASSET}/img-multimodal.webp`, width: 627, height: 458 },
  },
  second: {
    title: 'Proven Model Gains',
    body: [
      'Placeholder copy: every dataset passes through internal tuning and testing before it is listed.',
      'Placeholder copy: train with confidence knowing that each dataset has already shown real, measured gains.',
    ],
  },
  chart: {
    yAxis: 'Model Quality',
    xAxis: 'Data Amount',
    series: [['Unlabelled Data'], ['Reviewed Data'], ['Reviewed Data', 'with Context Labels']],
  },
}

export const difference = {
  title: 'Why Teams Choose Us',
  items: [
    { icon: 'headset', title: 'Hands-On Support Team', body: 'Placeholder copy: every engagement has a dedicated engineering and operations crew that keeps up with your schedule.' },
    { icon: 'robot', title: 'Robotics Experts In-House', body: 'Placeholder copy: our own robotics specialists work with you to write data specs shaped around your program.' },
    { icon: 'handshake', title: 'Close Research Partnerships', body: 'Placeholder copy: the platform backs leading robotics labs and industry teams working at the frontier.' },
    { icon: 'shield-check', title: 'Quality Built In', body: 'Placeholder copy: careful sensor calibration and validation steps mean only the best data reaches the platform.' },
    { icon: 'globe', title: 'Built Locally, Run Globally', body: 'Placeholder copy: capture cells are designed, tested and signed off in our own research lab before rolling out to the wider network of partner capture sites worldwide.' },
    { icon: 'shield', title: 'Security and Compliance', body: 'Placeholder copy: our setup supports regional privacy rules and customer audit needs, with optional in-region data processing. We hold independent security certifications.' },
  ] as { icon: IconName; title: string; body: string }[],
}

export const prefooter = {
  image: `${ASSET}/prefooter.webp`,
  headline: 'Your next chapter begins right here',
  primary: { text: 'Book a Call', href: '#' },
  secondary: { text: 'Start Now', href: '#' },
}
