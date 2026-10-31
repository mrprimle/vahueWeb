import { scaleDemoFormRows } from './scaleFormFields'

/*
 * Content contract for the scale.com/demo ("Contact us") layout. DemoPage renders everything from this object, so
 * Vahue's /contact can reuse the same layout, form behaviour and motion by passing its own content (and overriding the
 * --demo-* colour tokens on a wrapper; see demo.module.css).
 * `scaleDemoContent` below is Scale's own copy (RSC payload of https://scale.com/demo + the HubSpot form definition),
 * so the clone lines up with scale.com in side-by-side QA.
 */

export type Option = { label: string; value: string }

/** HubSpot dependentFieldFilters (operator SET_ANY): show the field while `field`'s value is one of `values`. */
export type FieldCondition = { field: string; values: string[] }

type FieldBase = {
  /** Form key; also the HubSpot-style `hs_<name>` class on the field wrapper. */
  name: string
  required?: boolean
  showWhen?: FieldCondition
  autoComplete?: string
}

export type TextField = FieldBase & {
  kind: 'text' | 'email' | 'textarea'
  placeholder?: string
  /** Visible label above the input (Scale's demo form uses placeholders only). */
  label?: string
  /** Help text shown above the input (HubSpot `hs-field-desc`). */
  description?: string
}
export type SelectField = FieldBase & {
  kind: 'select'
  /** Disabled first option (HubSpot `unselectedLabel`, with "*" when required). */
  placeholder: string
  options: Option[]
}
export type ChoiceField = FieldBase & {
  kind: 'checkbox' | 'radio'
  label: string
  options: Option[]
  /** Scale hides the "*" on the budget radio group via CSS. */
  hideRequiredMark?: boolean
}
/** Single opt-in checkbox (HubSpot booleancheckbox) with an HTML label. */
export type ConsentField = FieldBase & { kind: 'consent'; labelHtml: string }

export type FormField = TextField | SelectField | ChoiceField | ConsentField

/** One HubSpot fieldset. `columns: 2` puts two text fields side by side from 1024px. */
export type FormRow = { columns: 1 | 2; fields: FormField[] }

export type FormMessages = {
  required: string
  requiredSelect: string
  requiredChoice: string
  email: string
  /** `{domain}` is replaced with the blocked domain. */
  blockedEmail: string
}

export type DemoFormContent = {
  rows: FormRow[]
  /** Rich text under the fields (HubSpot legal-consent-container). */
  legalHtml?: string
  submitLabel: string
  /** Inline thank-you message that replaces the form after a valid submit. */
  successHtml: string
  messages: FormMessages
  /** Email domains rejected on blur (Scale's form uses HubSpot's default free-mail block list + "hmail.com,outlook.com"). */
  blockedEmailDomains?: string[]
}

export type DemoLogo = {
  alt: string
  /** Scale's displayWidth / displayHeight (px) inside a 96x40 slot. */
  width: number
  height: number
  /** SVG used as a CSS mask filled with --demo-logo; a neutral tile is drawn when omitted. */
  src?: string
}

export type DemoContent = {
  heading: string
  intro: string
  form: DemoFormContent
  sidebar: {
    quote: string
    name: string
    position: string
    trustedLabel: string
    /** Rendered as two rows: the first 4 (2 columns on mobile), then the rest in 3 columns. */
    logos: DemoLogo[]
  }
}

/** HubSpot's default free-mail block list (subset) plus the form's own "hmail.com,outlook.com". */
export const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'ymail.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'outlook.com',
  'hmail.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'gmx.com',
  'gmx.de',
  'mail.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'yandex.com',
  'yandex.ru',
  'mail.ru',
  'qq.com',
  '163.com',
]

export const HUBSPOT_MESSAGES: FormMessages = {
  required: 'Please complete this required field.',
  // scale.com shows the generic message for selects too (observed on blur of an empty select)
  requiredSelect: 'Please complete this required field.',
  requiredChoice: 'Please complete this required field.',
  email: 'Email must be formatted correctly.',
  blockedEmail: 'Please enter a different email address. This form does not accept addresses from {domain}.',
}

export const scaleDemoContent: DemoContent = {
  heading: "Let's Scale Together",
  intro: 'Join leading enterprises partnering with Scale. Book a 1:1 intro call with us to get started.',
  form: {
    rows: scaleDemoFormRows,
    legalHtml:
      '<p>By submitting this form, your information will be processed in accordance with our <strong><a href="https://scale.com/legal/privacy" rel="noopener">Privacy Policy.</a></strong></p>',
    submitLabel: 'Submit',
    successHtml: "<p>Thanks for reaching out! We'll be in touch shortly.</p>",
    messages: HUBSPOT_MESSAGES,
    blockedEmailDomains: FREE_EMAIL_DOMAINS,
  },
  sidebar: {
    quote:
      "We're going to need a lot more investment in high-quality evals and benchmarks to help us understand the actual comparative utility of the various models. This new set of private evals and leaderboards from Scale are great to see",
    name: 'Nat Friedman',
    position: 'Entrepreneur and Investor',
    trustedLabel: "Trusted by the world's most ambitious AI teams",
    // Customer marks are not shipped: neutral tiles in Scale's display boxes (Cohere, Adept, Meta, Cisco, Time, Mayo Clinic, DLA Piper).
    logos: [
      { alt: 'Cohere', width: 92, height: 16 },
      { alt: 'Adept', width: 74, height: 25 },
      { alt: 'Meta', width: 88, height: 18 },
      { alt: 'Cisco', width: 64, height: 34 },
      { alt: 'Time', width: 74, height: 23 },
      { alt: 'Mayo Clinic', width: 40, height: 40 },
      { alt: 'DLA Piper', width: 62, height: 35 },
    ],
  },
}
