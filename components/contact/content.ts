import { FREE_EMAIL_DOMAINS, type DemoContent, type FormRow } from '@/components/scale-clone/demo/content'
import { INTEGRATIONS, WORKFLOWS } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'

/*
 * /contact copy on the scale.com/demo layout (components/scale-clone/demo, spec reference-snapshots/scale-clone/demo.md).
 * Strict parity: same six fieldsets in the same order with the same field kinds as Scale's form
 *   1 two text | 2 two text | 3 email | 4 select + consent | 5 select + dependent textarea | 6 select + dependent text
 * and the same sidebar slots (quote block, person block, label, 4 + 3 wordmarks).
 */

const opts = (labels: string[]) => labels.map((l) => ({ label: l, value: l }))

export const WORKFLOW_OPTIONS = [...WORKFLOWS.map((w) => w.label), 'Not sure yet']

const COMPANY_SIZES = ['Under 100 people', '100 to 499 people', '500 to 2,000 people', 'More than 2,000 people']

const HEARD_FROM = [
  'Google search',
  'AI assistant',
  'LinkedIn',
  'Referral or word of mouth',
  'Event or webinar',
  'Existing relationship with Vahue',
  'Other',
]

const rows: FormRow[] = [
  {
    columns: 2,
    fields: [
      { name: 'firstname', required: true, kind: 'text', placeholder: 'First name*', autoComplete: 'given-name' },
      { name: 'lastname', required: true, kind: 'text', placeholder: 'Last name*', autoComplete: 'family-name' },
    ],
  },
  {
    columns: 2,
    fields: [
      { name: 'company', required: true, kind: 'text', placeholder: 'Company name*', autoComplete: 'organization' },
      { name: 'jobtitle', required: true, kind: 'text', placeholder: 'Job title*', autoComplete: 'organization-title' },
    ],
  },
  {
    columns: 1,
    fields: [{ name: 'email', required: true, kind: 'email', placeholder: 'Work email*', autoComplete: 'email' }],
  },
  {
    columns: 1,
    fields: [
      { name: 'company_size', required: true, kind: 'select', placeholder: 'Company size*', options: opts(COMPANY_SIZES) },
      {
        name: 'consent',
        required: true,
        kind: 'consent',
        labelHtml:
          'I agree that Vahue may store these details and contact me about this enquiry, as set out in the <strong><a href="/privacy-policy/">Privacy Policy</a></strong>. You can ask us to delete them at any time.',
      },
    ],
  },
  {
    columns: 1,
    fields: [
      {
        name: 'workflow',
        required: true,
        kind: 'select',
        placeholder: 'Which workflow should agents take on?*',
        options: opts(WORKFLOW_OPTIONS),
      },
      {
        name: 'message',
        showWhen: { field: 'workflow', values: WORKFLOW_OPTIONS },
        kind: 'textarea',
        placeholder: 'Describe the workflow in a few lines (systems involved, monthly volume, who handles it today, timeline)',
      },
    ],
  },
  {
    columns: 1,
    fields: [
      { name: 'heard_from', kind: 'select', placeholder: 'How did you hear about Vahue?', options: opts(HEARD_FROM) },
      { name: 'heard_from_other', showWhen: { field: 'heard_from', values: ['Other'] }, kind: 'text', placeholder: 'Please specify' },
    ],
  },
]

// Sidebar proof: a named, verified case from lib/case-studies.ts, shown as the case's own summary (no quote marks,
// so it does not read as a person's words). Wordmarks are integrations from lib/automation-content.ts, not clients.
const PROOF = getCaseStudy('exaware-governed-noc-agents')!
const TOOLS = ['Slack', 'HubSpot', 'Salesforce', 'NetSuite', 'SAP', 'Zendesk', 'Snowflake'].filter((t) =>
  INTEGRATIONS.includes(t),
)

export const vahueContactContent: DemoContent = {
  heading: "Let's map your workflow",
  intro: 'Tell us which workflow has outgrown your team. Book an intro call to scope a two-week audit.',
  form: {
    rows,
    legalHtml:
      '<p>By submitting this form, your information will be processed in accordance with our <strong><a href="/privacy-policy/">Privacy Policy.</a></strong></p>',
    submitLabel: 'Submit',
    successHtml: "<p>Thanks for reaching out. We'll reply by email to set up the intro call.</p>",
    submitErrorHtml:
      '<p>Your message was not sent. Please try again, or email <a href="mailto:human@vahue.ai">human@vahue.ai</a>.</p>',
    messages: {
      required: 'Please complete this required field.',
      requiredSelect: 'Please complete this required field.',
      requiredChoice: 'Please complete this required field.',
      email: 'Email must be formatted correctly.',
      blockedEmail: 'Please use your work email. This form does not accept addresses from {domain}.',
    },
    blockedEmailDomains: FREE_EMAIL_DOMAINS,
  },
  sidebar: {
    quote: PROOF.summary,
    quoteMarks: false,
    name: PROOF.client,
    position: PROOF.title,
    trustedLabel: 'Agents work inside the tools your team already uses',
    logos: TOOLS.map((t) => ({ alt: t, width: 0, height: 0, text: true })),
  },
}
