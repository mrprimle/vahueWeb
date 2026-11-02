// Copy for /enterprise/healthcare ("Healthcare" in the menu), written from the AJTBD research into Scale's slots; Scale's line stays where it's already right. Healthcare here means
// administrative workflows (referrals, documents, scheduling, authorizations), so clinical decision wording swaps. The mock UIs keep Scale's layout
// and timing with administrative records. People and records in the mocks are made up. PLACEHOLDER lines are for Mike.
import type { EnterpriseHealthcareContent } from './types'

const A = '/enterprise-healthcare'
const CHEN = 'Dr. Sarah Chen, MD'
const NEW_PATIENT = 'Dermatology — New Patient Visits & Follow-Ups'
const LOGO = { alt: 'Logo' } // PLACEHOLDER: neutral tile, customer logo goes here

export const content: EnterpriseHealthcareContent = {
  meta: {
    title: 'Agentic Solutions for Healthcare | Vahue',
    description: 'Vahue runs referrals, scheduling, and authorizations with AI agents, inside your workflows and measured against your baseline from day one.',
  },
  hero: {
    headline: 'Reliable AI for Healthcare’s Most Critical Workflows',
    body: 'Vahue runs referrals, scheduling, and authorizations with agents care teams can trust, embedded inside your workflows and measured against your baseline from day one.',
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/hero-admin.webp`, alt: 'Referral packet checked by an agent next to an intake queue and a schedule', width: 1920, height: 1080 },
    imageColor: '#2c3a4a',
    logosLabel: 'Trusted By',
    logos: [LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO, LOGO], // PLACEHOLDER: 8 customer logos
  },
  workflows: {
    heading: 'AI Systems for Every Admin Workflow',
    tabs: [
      {
        key: 'referralIntake',
        label: 'Referral Intake',
        title: 'Synthesize referral records to reduce delays',
        body: "Our Document Intake Agents consolidate a patient's full paperwork to route the right referrals, records, and approvals, so coordinators spend less time piecing together files.",
        cta: { text: 'See Document Intake Agents', url: '/physical-ai' },
        color: '#273252',
        image: { path: `${A}/hero-admin.webp`, width: 1920, height: 1080, alt: 'Referral Intake panel reviewing a referral with AI-powered assistance' },
      },
      {
        key: 'schedulingIntelligence',
        label: 'Scheduling Intelligence',
        title: 'Get patients to the right appointment, faster',
        body: 'Our Sales and Booking Agents automate appointment scheduling across patient records, booking rules, and operational constraints - reducing manual coordinator work.',
        cta: { text: 'See Sales and Booking Agents', url: '/public-sector-data-engine' },
        color: '#839CB2',
        image: { path: `${A}/hero-admin.webp`, width: 1920, height: 1080, alt: 'Scheduling Engine dashboard recommending an open appointment slot' },
      },
      {
        key: 'customAgents',
        label: 'Custom Agents & Applications',
        title: 'Build to the unique needs of your healthcare organization',
        body: 'From prior authorization follow-ups to claims status checks, our Back-office Sync Agents take on the workflows unique to your health system.',
        cta: { text: 'See Back-office Sync Agents', url: '/generative-ai-data-engine' },
        color: '#A8927C',
        image: { path: `${A}/hero-admin.webp`, width: 1920, height: 1080, alt: 'Prior Authorization Agent and Referral Follow-Up Agent dashboards' },
      },
    ],
    orderGuidance: {
      brand: 'ACME Health',
      suite: 'Ops Suite',
      title: 'Referral Intake',
      subtitle: 'Review incoming referral with AI-powered assistance',
      person: 'James Okonkwo',
      personMeta: 'ID REF-2024-0089 · DOB 1961-11-04 · 62 Male · Commercial PPO',
      system: 'EHR',
      sources: [
        { key: 'record', label: 'Patient Record', icon: 'chart' },
        { key: 'form', label: 'Referral Form', icon: 'referral' },
        { key: 'card', label: 'Insurance Scan', icon: 'imaging' },
        { key: 'visits', label: 'Visit History', icon: 'visits' },
        { key: 'auth', label: 'Auth Checklist', icon: 'problems' },
      ],
      recordLabel: 'Referral Packet',
      recordId: 'packet_3',
      fields: {
        first: ['SERVICE REQUESTED', 'New Patient Visit (Priority) — Complete with Insurance Verification and Records Transfer'],
        second: ['REFERRING PROVIDER', 'Dr. Rachel Torres, MD — Primary Care'],
        window: ['REQUESTED WINDOW', 'Within 5 days — PRIORITY (referral expires soon + prior authorization pending + incomplete records on file)'],
        indication: [
          'REFERRAL SUMMARY',
          'Priority new patient visit with insurance verification and records transfer for: (1) 6-week-old referral from primary care, faxed twice with two different cover sheets, now 14 pages (checked: Demographics, Insurance card, Referral form, Consent, Visit notes); (2) 12 business days waiting since first contact; (3) new authorization request opened in the payer portal (2 weeks); (4) new duplicate record found under a similar name; (5) scanned insurance card showing a plan change at the start of the quarter — coordinator recommends an eligibility re-check; (6) copay estimate on file at $285; (7) Two earlier appointment attempts — cancelled by the patient, rescheduled by the front desk. Prior incomplete intake (community clinic, 2022) — missing signature, transfer not possible. Specialty scheduling team required for booking with an authorization number given the plan and referral rules.',
        ],
        codes: [
          'DOCUMENTS (CHECKLIST)',
          'REF-01 — Referral form, signed and dated; INS-02 — Insurance card, front and back; AUTH-03 — Prior authorization request (pending payer reply); CON-04 — Consent to treat and privacy notice; REC-05 — Records release from prior clinic; VIS-06 — Last visit summary (received by fax); PAY-07 — Copay and deductible estimate (updated today); ID-08 — Photo ID, verified (matched to record); REQ-09 — Transport request form (not required for this visit); NOTE-10 — Coordinator note on callback preferences.',
        ],
      },
    },
    scheduling: {
      brand: 'ACME',
      suite: 'Ops Suite',
      title: 'Scheduling Engine',
      subtitle: 'Intelligent slot recommendation and one-click booking',
      person: 'Robert Tanaka · New Patient Visit — Referral',
      recommendationLabel: 'Agent Recommendation',
      agentBadge: 'VAHUE AGENT',
      dayNames: { MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday' },
      yearPrefix: '2026-',
      bookLabel: 'Book This Slot',
      recommenderLabel: 'Slot Recommender',
      stepsCount: '(4 steps)',
      tracingBadge: 'AGENT TRACING',
      stepPrefix: 'Step 1: ',
      calendarTitle: 'SCHEDULING CALENDAR — 12 OPEN SLOTS ACROSS 9 DAYS',
      calendarHint: 'Click any open slot to select it',
      recommendations: [
        { day: 'TUE', date: '7/28', time: '09:00', duration: '45m', clinician: CHEN, specialty: NEW_PATIENT, room: 'Clinic Room A', description: "This slot is on Tuesday, July 28 at 9:00 AM with Dr. Sarah Chen, who takes new patient referrals and follow-ups, in a suitable room, and fits the patient's morning preference.", step: 'The requested scheduling window is within 4 weeks, so we prioritized the earliest dermatology opening.' },
        { day: 'WED', date: '7/29', time: '09:00', duration: '45m', clinician: 'Dr. Priya Nair, MD', specialty: 'Dermatology — General Consult', room: 'Clinic Room C', description: 'This slot is on Wednesday, July 29 at 9:00 AM with Dr. Priya Nair, whose schedule has an open clinic window that meets the requested five-day turnaround.', step: "Dr. Chen's calendar had no earlier match, so we surfaced the next specialist with an open clinic room." },
        { day: 'THU', date: '7/30', time: '08:30', duration: '45m', clinician: CHEN, specialty: NEW_PATIENT, room: 'Clinic Room A', description: 'This slot is on Thursday, July 30 at 8:30 AM with Dr. Sarah Chen, keeping continuity with the same provider and room as the prior visit.', step: 'Continuity outweighed earliness, so we matched the patient back to their original provider and room.' },
      ],
      days: [
        { key: 'MON', label: '7/27', slots: [
          { time: '07:00', duration: '60m', clinician: 'Dr. Webb', room: 'Clinic Room D', occupied: true },
          { time: '07:30', duration: '45m', clinician: 'Dr. Chen', room: 'Clinic Room C', occupied: true },
          { time: '08:00', duration: '45m', clinician: 'Dr. Marcus Webb', room: 'Clinic Room A' },
          { time: '11:00', duration: '30m', clinician: 'Dr. Nair', room: 'Clinic Room C', occupied: true },
        ] },
        { key: 'TUE', label: '7/28', slots: [
          { time: '09:00', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Clinic Room A' },
          { time: '10:00', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Clinic Room A' },
          { time: '15:00', duration: '45m', clinician: 'Dr. Chen', room: 'Clinic Room B', occupied: true },
          { time: '15:30', duration: '30m', clinician: 'Dr. Nair', room: 'Clinic Room C', occupied: true },
        ] },
        { key: 'WED', label: '7/29', slots: [
          { time: '09:00', duration: '45m', clinician: 'Dr. Priya Nair', room: 'Clinic Room C' },
          { time: '13:00', duration: '45m', clinician: 'Dr. Marcus Webb', room: 'Clinic Room A' },
          { time: '14:00', duration: '30m', clinician: 'Dr. Nair', room: 'Clinic Room C', occupied: true },
          { time: '14:30', duration: '60m', clinician: 'Dr. Webb', room: 'Clinic Room D', occupied: true },
        ] },
        { key: 'THU', label: '7/30', slots: [
          { time: '07:00', duration: '60m', clinician: 'Dr. Webb', room: 'Clinic Room D', occupied: true },
          { time: '07:30', duration: '45m', clinician: 'Dr. Chen', room: 'Clinic Room C', occupied: true },
          { time: '08:30', duration: '45m', clinician: 'Dr. Sarah Chen', room: 'Clinic Room A' },
          { time: '11:00', duration: '30m', clinician: 'Dr. Nair', room: 'Clinic Room C', occupied: true },
        ] },
      ],
    },
    customAgents: {
      alert: {
        brand: 'ACME Health',
        suite: 'Prior Authorization',
        initials: 'JT',
        title: 'Prior Authorization Agent Dashboard',
        subtitle: 'Review escalating requests, the case for each, and the action bundle.',
        person: 'Marcus Ferreira · ID-330914 · 68M · Regional PPO',
        status: 'ESCALATION RECOMMENDED — fired 10:31 · unacknowledged for 14 minutes',
        note: 'Appointment booked in 2 days · no approval on file · payer reply overdue',
        matrixTitle: 'Request Backlog — 5 signals, all within 6 hours',
        bars: [ // PLACEHOLDER: illustrative figures
          { time: '22:40', value: 1.4 },
          { time: '04:10', value: 1.8 },
          { time: '08:20', value: 2.9 },
          { time: '10:15', value: 4.1 },
        ],
        barNote: 'Days waiting on payer 4.1 and still climbing (service target 2.0).',
        bundleTitle: '3-hour escalation bundle — clock started 10:31',
        bundle: ['Payer portal re-checked and status logged', 'Supporting documents resent within 1 hour'],
      },
      followUp: {
        brand: 'ACME Health',
        suite: 'Referral Safety Net',
        initials: 'RS',
        title: 'Referral Follow-Up Agent',
        stats: [ // PLACEHOLDER: illustrative figures
          { label: 'OVERDUE AND HIGH-PRIORITY', value: '66', note: 'expiring in 7 days, payer deadline near' },
          { label: 'OVERDUE', value: '172', note: 'past the interval the referral specified' },
          { label: 'LOOPS CLOSED', value: '1,046', note: 'visits completed or administratively closed' },
          { label: 'REFERRALS FOUND', value: '1,284', note: 'extracted from 9,610 faxes, last 90 days' },
        ],
        columns: ['PATIENT', 'REFERRAL REQUEST', 'NEXT ADMIN STEP', 'DUE', 'LOOP STATE', 'RISK'],
        rows: [
          { name: 'Angela Rivera', id: 'ID-118204 · 58F', finding: 'New patient visit, orthopedics — fax received, 14 pages', study: 'Referral fax · 2026-03-12', followUp: 'Book visit within 3 months', interval: 'interval: 3 months', due: '2026-06-12', lateness: '74 days late', latenessTone: 'red', segments: ['done', 'stalled', 'todo', 'todo'], statusNote: 'stalled: never booked', risk: 'high' },
          { name: 'Marcus Bell', id: 'ID-155902 · 64M', finding: 'Specialist consult, cardiology — authorization required', study: 'Payer portal · 2026-05-02', followUp: 'Request prior authorization', interval: 'interval: 3 months', due: '2026-08-05', lateness: '20 days late', latenessTone: 'red', segments: ['done', 'stalled', 'todo', 'todo'], statusNote: 'stalled: auth expired', risk: 'high' },
          { name: 'Daniel Whitfield', id: 'ID-097331 · 71M', finding: 'Second opinion visit, records transfer needed', study: 'Email intake · 2026-01-28', followUp: 'Transfer records, then book', interval: 'interval: 6 months', due: '2026-07-30', lateness: '26 days late', latenessTone: 'amber', segments: ['done', 'done', 'stalled', 'todo'], statusNote: 'stalled: no-show, not rebooked', risk: 'medium' },
          { name: 'Priya Raman', id: 'ID-204118 · 69F', finding: 'Annual follow-up visit, plan changed in January', study: 'Front desk · 2025-08-14', followUp: 'Re-verify coverage at 12 months', interval: 'interval: 12 months', due: '2026-08-18', lateness: '7 days late', latenessTone: 'amber', segments: ['done', 'done', 'todo', 'todo'], statusNote: 'awaiting scheduling', risk: 'medium' },
          { name: 'Susan Okafor', id: 'ID-133870 · 55F', finding: 'New patient visit, dermatology — forms incomplete', study: 'Web form · 2026-06-02', followUp: 'Collect signed intake forms', interval: 'interval: 3 months', due: '2026-09-02', lateness: '8 days out', latenessTone: 'gray', segments: ['done', 'done', 'done', 'todo'], statusNote: 'booked 2026-08-29', risk: 'ontrack' },
          { name: 'Tomas Lindqvist', id: 'ID-166245 · 62M', finding: 'Annual plan review visit, referral renewal needed', study: 'Referral fax · 2025-11-14', followUp: 'Renew referral at 12 months', interval: 'interval: 12 months', due: '2026-11-14', lateness: '81 days out', latenessTone: 'gray', segments: ['done', 'done', 'todo', 'todo'], statusNote: 'on schedule', risk: 'ontrack' },
        ],
        riskLabels: { high: 'HIGH', medium: 'MEDIUM', ontrack: 'ON TRACK' },
        verbatimLabel: 'VERBATIM — REFERRAL FORM, ITEM 3',
        verbatim: 'New patient visit requested with orthopedics, not previously seen at this practice. Given plan rules and the referral date this needs authorization; book the visit within 3 months, with records transfer or payer review if the request changes or expires.',
        normalisedLabel: 'NORMALISED',
        normalised: 'New patient visit · orthopedics · commercial PPO · auth required',
        normalisedCodes: 'REF 427359005 · PLAN 24627-2',
        obligationLabel: 'OBLIGATION',
        obligation: 'Book new patient visit, 3-month window — due 2026-06-12',
        obligationNote: 'extracted at 0.94 confidence · human-reviewed 2026-03-13',
        loopLabel: 'LOOP CHECK',
        loop: [
          { label: 'Received', segment: 'done', note: '2026-03-12 · logged by front desk, released to queue' },
          { label: 'Authorized', segment: 'stalled', note: 'no request was ever generated' },
          { label: 'Scheduled', segment: 'todo', note: '—' },
          { label: 'Completed', segment: 'todo', note: '—' },
        ],
        loopNote: 'The referral was logged and filed correctly. Nothing downstream of it happened — no request, no task, no owner. The loop has been open for 74 days.',
        actions: ['Send the auth request now', 'Message Dr. L. Menon', 'Assign to care coordinator', 'Mark administratively closed'],
        traceTitle: 'How the loop was reconstructed',
        traceMeta: 'run 2026-08-25 06:00 · 9,610 faxes · 41s', // PLACEHOLDER: illustrative figures
        traceBadge: 'AGENT TRACING',
        trace: [
          { n: 1, title: 'Read', body: 'Parsed all 9,610 incoming faxes and their attachments, isolating sentences that create a follow-up obligation rather than merely describing a request.' },
          { n: 2, title: 'Normalise', body: 'Resolved each request into a service, an interval and an absolute due date — turning phrasing like "in 3 months" into 2026-06-12.' },
          { n: 3, title: 'Join', body: 'Matched every obligation against the authorization, scheduling and billing feeds to find where the loop actually broke, instead of assuming it closed.' },
          { n: 4, title: 'Rank', body: 'Ordered the open loops by the payer deadline of the request class, then by how far past the specified interval they now are.' },
        ],
      },
    },
  },
  testimonial: {
    clientName: 'Full Name', // PLACEHOLDER
    title: 'Role, Company', // PLACEHOLDER
    quote: 'Ultimately, this work is about helping patients by using innovation to deliver more timely, coordinated and compassionate care. Since launch, our team is spending an average of eleven fewer minutes with each referral while reliably maintaining an expert standard of care for patients.', // PLACEHOLDER
    metricValue: '11+', // PLACEHOLDER
    metricLabel: 'fewer minutes with every referral', // PLACEHOLDER
    logo: LOGO, // PLACEHOLDER
  },
  reliability: {
    heading: 'Built on Vahue’s reliability layer for healthcare',
    cards: [
      { key: 'forwardDeployed', title: 'Forward-deployed service and engineering teams', description: 'Applied AI engineers and workflow specialists embedded inside your health system, accountable for outcomes, not just delivery. They stay to run it.' },
      { key: 'evaluationsCompound', title: 'Evaluations compound workflow value', description: "Evals on your own past cases and healthcare ops experts encode institutional knowledge to continually improve every agent's accuracy and safety." },
      { key: 'deployAnywhere', title: 'Deploy anywhere, on your terms', description: 'Vahue connects to your existing EHR, scheduling, and billing systems. No migration required, and it works with any model.' },
    ],
    layers: [
      { key: 'diagram', src: `${A}/layer-diagram.webp` },
      { key: 'dashboard', src: `${A}/layer-dashboard-admin.webp` },
      { key: 'avatars', src: `${A}/layer-avatars-neutral.webp` },
    ],
  },
  strategy: {
    heading: [{ text: 'Fuel Your AI Strategy' }],
    category: 'Healthcare',
    posts: [
      { _key: 'referralAgent', title: 'Document Intake Agents for Referrals', image: `${A}/referral-agent.webp`, alt: 'Document Intake Agents for Referrals', imageGradientOverlay: true, textColor: 'light', variantOverride: 'overlay', videoUrl: `${A}/referral-agent.mp4` }, // PLACEHOLDER: neutral motion, real demo video goes here
      { _key: 'enterpriseReadyAgents', title: 'Scalable Infrastructure for Enterprise-Ready AI Agents', image: `${A}/agent-infrastructure.webp`, alt: 'Scalable Infrastructure for Enterprise-Ready AI Agents', imageGradientOverlay: true, videoUrl: `${A}/agent-infrastructure.mp4` }, // PLACEHOLDER: neutral motion, real demo video goes here
      { _key: 'partnership', title: 'Care Group + Vahue: Reliable AI for Better Healthcare', image: `${A}/partnership.webp`, imageGradientOverlay: true, url: '/blog' }, // PLACEHOLDER: case study, client name and link
    ],
  },
  trust: {
    headline: 'Built for healthcare trust and privacy',
    subtitle: 'Meets the security, safety, and privacy standards required for healthcare.',
    badges: [
      { key: 'soc2', alt: 'AICPA SOC 2 certified', path: `${A}/certs/soc2.webp`, width: 390 },
      { key: 'iso27001', alt: 'ISO 27001 information security certified', path: `${A}/certs/iso27001.webp`, width: 412 },
      { key: 'iso42001', alt: 'ISO 42001 artificial intelligence certified', path: `${A}/certs/iso42001.webp`, width: 412 },
      { key: 'hipaa', alt: 'HIPAA compliant', path: `${A}/certs/hipaa.webp`, width: 364 },
      { key: 'gdpr', alt: 'GDPR compliant', path: `${A}/certs/gdpr.webp`, width: 368 },
      { key: 'euAiAct', alt: 'EU AI Act compliant', path: `${A}/certs/eu-ai-act.webp`, width: 364 },
      { key: 'starLevelOne', alt: 'CSA STAR', path: `${A}/certs/star.webp`, width: 375 },
      { key: 'ccpa', alt: 'CCPA compliant', path: `${A}/certs/ccpa.webp`, width: 366 },
    ],
  },
  prefooter: {
    headline: 'The future of healthcare starts here',
    cta: { text: 'Speak with an expert', url: '/demo' },
    backdrop: { tailwindClass: 'white', contrastColor: '#010101' },
    image: { path: `${A}/prefooter-admin.webp`, alt: 'A week of appointment slots filled in by a scheduling agent', width: 1920, height: 983 },
    imageColor: '#26343f',
  },
}
