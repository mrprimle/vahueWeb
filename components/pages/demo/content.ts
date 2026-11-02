// Rendered strings for /demo: same shape as content.scale.ts. Options follow the site's buyers and services; the form sends nothing (see DemoForm).
import { countries } from './countries'
import type { DemoContent } from './types'

const countryOptions = countries.map((c) => ({ value: c, label: c }))

export const content: DemoContent = {
  meta: {
    title: 'Meet with our team | Vahue',
    description: 'We run your busiest workflow with agents, measured against your baseline from day one. Book a 1:1 intro call and see it work on your own cases before it goes live.',
  },
  heading: "Let's Start With Your Busiest Workflow",
  intro: 'Book a 1:1 intro call. Tell us which workflow is busiest, and we’ll show you how to see it work on your own cases before it goes live.',
  form: {
    groups: [
      {
        columns: 2,
        fields: [
          {
            name: "firstname",
            fieldType: "text",
            placeholder: "First name",
            required: true,
            autoComplete: "given-name",
          },
          {
            name: "lastname",
            fieldType: "text",
            placeholder: "Last name",
            required: true,
            autoComplete: "family-name",
          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            name: "company",
            fieldType: "text",
            placeholder: "Company name",
            required: true,
            autoComplete: "organization",
          },
          {
            name: "jobtitle",
            fieldType: "text",
            placeholder: "Job title",
            required: true,
            autoComplete: "organization-title",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          { name: "email", fieldType: "email", placeholder: "Work email", required: true, autoComplete: "email" },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            name: "region",
            fieldType: "select",
            unselectedLabel: "Country",
            required: true,
            options: countryOptions,
            dependents: [
              {
                when: [
                  "Austria",
                  "Belgium",
                  "Bulgaria",
                  "Croatia",
                  "Cyprus",
                  "Czech Republic",
                  "Denmark",
                  "Estonia",
                  "Finland",
                  "France",
                  "Germany",
                  "Hungary",
                  "Iceland",
                  "Ireland",
                  "Italy",
                  "Latvia",
                  "Liechtenstein",
                  "Lithuania",
                  "Luxembourg",
                  "Malta",
                  "Netherlands",
                  "Norway",
                  "Poland",
                  "Portugal",
                  "Romania",
                  "Slovakia",
                  "Slovenia",
                  "Spain",
                  "Sweden",
                  "United Kingdom",
                  "Switzerland",
                ],
                field: { name: "consent_opt_in", fieldType: "booleancheckbox" },
              },
            ],
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            name: "what_best_describes_your_company",
            fieldType: "select",
            unselectedLabel: "What best describes your company?",
            required: true,
            options: [
              { value: "enterprise", label: "Enterprise" },
              { value: "scale-up", label: "Scale-up" },
              { value: "professional-services", label: "Professional Services Firm" },
              { value: "insurance", label: "Insurance" },
              { value: "healthcare", label: "Healthcare" },
              { value: "regulated", label: "Regulated Industry" },
              { value: "Partners", label: "Partners" },
              { value: "Other", label: "Other" },
            ],
            dependents: [
              {
                when: ["enterprise", "scale-up", "Other"],
                field: {
                  name: "industry",
                  fieldType: "select",
                  unselectedLabel: "What’s your industry?",
                  required: true,
                  options: [
                    { value: "Financial Services", label: "Financial Services" },
                    { value: "Retail & E-commerce", label: "Retail & E-commerce" },
                    { value: "Manufacturing & Logistics", label: "Manufacturing & Logistics" },
                    { value: "Real Estate & Field Services", label: "Real Estate & Field Services" },
                    { value: "Software & Technology", label: "Software & Technology" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["professional-services"],
                field: {
                  name: "services_firm_type",
                  fieldType: "select",
                  unselectedLabel: "What best describes your firm?",
                  required: true,
                  options: [
                    { value: "Legal and Compliance", label: "Legal and Compliance" },
                    { value: "Consulting and Audit", label: "Consulting and Audit" },
                    { value: "Accounting and Finance", label: "Accounting and Finance" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["enterprise", "scale-up", "professional-services", "insurance", "healthcare", "regulated", "Other"],
                field: {
                  name: "desired_service",
                  fieldType: "select",
                  unselectedLabel: "Which service are you looking for?",
                  required: true,
                  options: [
                    { value: "Context and Integrations", label: "Context and Integrations" },
                    { value: "Back-office Sync Agents", label: "Back-office Sync Agents" },
                    { value: "Document Intake Agents", label: "Document Intake Agents" },
                    { value: "Sales and Booking Agents", label: "Sales and Booking Agents" },
                    { value: "Scoring and Decision Agents", label: "Scoring and Decision Agents" },
                    { value: "Knowledge Agents", label: "Knowledge Agents" },
                    { value: "Support and Voice Agents", label: "Support and Voice Agents" },
                    { value: "AI Product Engineering", label: "AI Product Engineering" },
                    { value: "Embedded AI Specialists", label: "Embedded AI Specialists" },
                    { value: "AI Strategy and Audit", label: "AI Strategy and Audit" },
                    { value: "Evals and Guardrails", label: "Evals and Guardrails" },
                    { value: "Production Rescue", label: "Production Rescue" },
                    { value: "Not sure yet", label: "Not sure yet" },
                  ],
                },
              },
              {
                when: ["enterprise", "scale-up", "professional-services", "insurance", "healthcare", "regulated", "Other"],
                field: {
                  name: "current_situation",
                  fieldType: "select",
                  unselectedLabel: "What brings you here now?",
                  required: true,
                  options: [
                    { value: "Volume has outgrown the team", label: "Volume has outgrown the team" },
                    { value: "An AI pilot or automation has stalled", label: "An AI pilot or automation has stalled" },
                    { value: "We want to avoid the next hire", label: "We want to avoid the next hire" },
                    { value: "Leadership asked for an AI plan", label: "Leadership asked for an AI plan" },
                    { value: "A live AI system needs fixing", label: "A live AI system needs fixing" },
                    { value: "We need AI in our product", label: "We need AI in our product" },
                    { value: "Exploring options", label: "Exploring options" },
                  ],
                },
              },
              {
                when: ["insurance", "healthcare", "regulated"],
                field: {
                  name: "compliance_needs",
                  fieldType: "checkbox",
                  label: "Which standards apply to this work?",
                  options: [
                    { value: "SOC 2", label: "SOC 2" },
                    { value: "ISO 27001", label: "ISO 27001" },
                    { value: "ISO 42001", label: "ISO 42001" },
                    { value: "HIPAA", label: "HIPAA" },
                    { value: "GDPR", label: "GDPR" },
                    { value: "EU AI Act", label: "EU AI Act" },
                    { value: "CSA STAR", label: "CSA STAR" },
                    { value: "CCPA", label: "CCPA" },
                  ],
                },
              },
              {
                when: ["enterprise", "scale-up", "professional-services", "insurance", "healthcare", "regulated", "Other"],
                field: {
                  name: "annual_budget",
                  fieldType: "radio",
                  label: "Project Budget",
                  required: true,
                  options: [
                    { value: "<$100k", label: "<$100k" }, // PLACEHOLDER
                    { value: "$100k-500k", label: "$100k-500k" }, // PLACEHOLDER
                    { value: "$500k-1M", label: "$500k-1M" }, // PLACEHOLDER
                    { value: "$1M+", label: "$1M+" }, // PLACEHOLDER
                  ],
                },
              },
              {
                when: ["enterprise", "scale-up", "professional-services", "insurance", "healthcare", "regulated", "Other"],
                field: {
                  name: "message",
                  fieldType: "textarea",
                  placeholder: "Describe the workflow: what arrives, which systems it touches, monthly volume, and what slows it down",
                },
              },
              {
                when: ["Partners"],
                field: {
                  name: "partnership_type",
                  fieldType: "select",
                  unselectedLabel: "What partnership type are you seeking?",
                  required: true,
                  options: [
                    { value: "Expert network (forward-deployed engineers)", label: "Expert network (forward-deployed engineers)" },
                    { value: "Technology / integration partnership (includes cloud & infrastructure)", label: "Technology / integration partnership (includes cloud & infrastructure)" },
                    { value: "Reseller / channel / referral partnership", label: "Reseller / channel / referral partnership" },
                    { value: "Systems integrator / consulting partnership", label: "Systems integrator / consulting partnership" },
                    { value: "Agent evaluation / benchmarking partnership", label: "Agent evaluation / benchmarking partnership" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["Partners"],
                field: { name: "linkedin_company_page", fieldType: "text", placeholder: "Company LinkedIn URL" },
              },
              {
                when: ["Partners"],
                field: {
                  name: "partnership_message",
                  fieldType: "textarea",
                  description: "What are you hoping to achieve through this partnership?",
                },
              },
            ],
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            name: "how_did_you_hear_about_us",
            fieldType: "select",
            unselectedLabel: "How did you hear about Vahue?",
            required: true,
            options: [
              { value: "Review Site", label: "Review Site" },
              { value: "Email Outreach", label: "Email Outreach" },
              { value: "Event, Conference, or Webinar", label: "Event, Conference, or Webinar" },
              { value: "Existing Relationship with Vahue", label: "Existing Relationship with Vahue" },
              { value: "Google Search", label: "Google Search" },
              { value: "LinkedIn", label: "LinkedIn" },
              { value: "News, Media, Podcast, or Analyst Report", label: "News, Media, Podcast, or Analyst Report" },
              { value: "Other", label: "Other" },
              { value: "Referral / Word of Mouth", label: "Referral / Word of Mouth" },
              { value: "X (Twitter)", label: "X (Twitter)" },
            ],
            dependents: [
              {
                when: ["Other"],
                field: { name: "other_how_did_you_hear_about_us", fieldType: "text", placeholder: "Please specify" },
              },
            ],
          },
        ],
      },
      {
        columns: 1,
        fields: [
          { name: "utm_source", fieldType: "text", label: "utm_source", hidden: true },
        ],
      },
      {
        columns: 1,
        fields: [
          { name: "utm_campaign", fieldType: "text", label: "utm_campaign", hidden: true },
        ],
      },
      {
        columns: 1,
        fields: [
          { name: "utm_medium", fieldType: "text", label: "utm_medium", hidden: true },
        ],
      },
    ],
    submitText: 'Submit',
    submittedMessage: "Thanks for reaching out! We'll be in touch shortly.",
    legal: ['By submitting this form, your information will be processed in accordance with our ', { text: 'Privacy Policy.', href: '/legal/privacy' }],
    consent: [
      "By proceeding, you agree to Vahue's ",
      { text: 'Privacy Policy', href: '/legal/privacy' },
      ' and ',
      { text: 'Terms and Conditions', href: '/legal/terms' },
      ' and consent to receive marketing communications. You can opt out at any time.',
    ],
    blockedEmailDomains: ['hmail.com', 'outlook.com', 'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 'hotmail.com', 'live.com', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com', 'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'yandex.com', 'zoho.com'],
    errors: {
      required: 'Please complete this required field.',
      emailFormat: 'Email must be formatted correctly.',
      blockedEmail: 'Please enter a different email address. This form does not accept addresses from {{ domain }}.',
      rollupRequired: 'Please complete all required fields.',
      rollupBlocked: 'Please change your email address to continue.',
    },
  },
  sidebar: {
    quote: "We'd been burned by a pilot that only worked in the demo. Seeing the agents on our own past cases, next to what our team actually did, is what got this approved. Now the exceptions queue is small and we can explain it.", // PLACEHOLDER
    name: 'Full Name', // PLACEHOLDER
    position: 'Role, Company', // PLACEHOLDER
    trustedBy: "Trusted by the world's most ambitious operations teams", // PLACEHOLDER
    logos: [
      { alt: 'Logo', displayWidth: 92, displayHeight: 16 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 74, displayHeight: 25 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 88, displayHeight: 18 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 64, displayHeight: 34 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 74, displayHeight: 23 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 40, displayHeight: 40 }, // PLACEHOLDER
      { alt: 'Logo', displayWidth: 62, displayHeight: 35 }, // PLACEHOLDER
    ],
  },
}
