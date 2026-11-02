// Rendered strings for /demo: same shape as content.scale.ts. Company types follow the research's segments; the form sends nothing (see DemoForm).
import { countries } from './countries'
import type { DemoContent } from './types'

const countryOptions = countries.map((c) => ({ value: c, label: c }))

export const content: DemoContent = {
  meta: {
    title: 'Meet with our team | Vahue',
    description: 'Vahue runs your busiest workflow with AI agents, measured against your baseline from day one, across document intake, back-office sync, support, voice, and more.',
  },
  heading: "Let's Scale Together",
  intro: 'Join leading scale-ups partnering with Vahue. Book a 1:1 intro call with us to get started.',
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
              { value: "operations", label: "Operations-Heavy Scale-up" },
              { value: "product", label: "Software/Product Company" },
              { value: "revenue", label: "Sales/Service-Led Company" },
              { value: "regulated", label: "Regulated Company" },
              { value: "professional-services", label: "Professional Services Firm" },
              { value: "Partners", label: "Partners" },
              { value: "Other", label: "Other" },
            ],
            dependents: [
              {
                when: ["operations", "Other"],
                field: {
                  name: "industry",
                  fieldType: "select",
                  unselectedLabel: "What’s your industry?",
                  required: true,
                  options: [
                    { value: "Healthcare & Life Sciences", label: "Healthcare & Life Sciences" },
                    { value: "Financial Services / Professional Services", label: "Financial Services / Professional Services" },
                    { value: "Consumer (Telecom, Media, Oil & Gas, Retail, Manufacturing)", label: "Consumer (Telecom, Media, Oil & Gas, Retail, Manufacturing)" },
                  ],
                },
              },
              {
                when: ["operations", "Other"],
                field: {
                  name: "desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "AI applications or agentic systems", label: "AI applications or agentic systems" },
                    { value: "Agent tuning and evaluation", label: "Agent tuning and evaluation" },
                    { value: "Red-teaming, safety, or guardrails", label: "Red-teaming, safety, or guardrails" },
                    { value: "Deployment, hosting, or integration", label: "Deployment, hosting, or integration" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["product"],
                field: {
                  name: "product_desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "Expert-Prepared Context", label: "Expert-Prepared Context" },
                    { value: "Agent Environments", label: "Agent Environments" },
                    { value: "Agent Benchmarks & Evals", label: "Agent Benchmarks & Evals" },
                    { value: "Agent tuning and evaluation", label: "Agent tuning and evaluation" },
                    { value: "Independent research", label: "Independent research" },
                  ],
                },
              },
              {
                when: ["product"],
                field: {
                  name: "product_agent_stage",
                  fieldType: "select",
                  unselectedLabel: "What stage is your agent at?",
                  required: true,
                  options: [
                    { value: "Pre-build / early research", label: "Pre-build / early research" },
                    { value: "Fine-tuning an existing foundation model", label: "Fine-tuning an existing foundation model" },
                    { value: "Post-launch / evals / alignment", label: "Post-launch / evals / alignment" },
                    { value: "Evaluating or benchmarking a completed agent", label: "Evaluating or benchmarking a completed agent" },
                  ],
                },
              },
              {
                when: ["product"],
                field: {
                  name: "product_data_domain",
                  fieldType: "checkbox",
                  label: "What modality or data domain are you focused on?",
                  required: true,
                  options: [
                    { value: "Text / language", label: "Text / language" },
                    { value: "Code", label: "Code" },
                    { value: "Tool use / agentic", label: "Tool use / agentic" },
                    { value: "Multimodal (image, audio, video)", label: "Multimodal (image, audio, video)" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["product"],
                field: {
                  name: "product_current_resolution",
                  fieldType: "select",
                  unselectedLabel: "How are you currently handling this?",
                  required: true,
                  options: [
                    { value: "In-house team", label: "In-house team" },
                    { value: "Another vendor", label: "Another vendor" },
                    { value: "Not yet started / exploring options", label: "Not yet started / exploring options" },
                  ],
                },
              },
              {
                when: ["product"],
                field: {
                  name: "product_initiative_size",
                  fieldType: "select",
                  unselectedLabel: "How would you describe the size of this initiative?",
                  required: true,
                  options: [
                    { value: "Exploratory / early-stage", label: "Exploratory / early-stage" },
                    { value: "Mid-size, defined project", label: "Mid-size, defined project" },
                    { value: "Large-scale or enterprise-wide", label: "Large-scale or enterprise-wide" },
                  ],
                },
              },
              {
                when: ["revenue"],
                field: {
                  name: "revenue_org_type",
                  fieldType: "select",
                  unselectedLabel: "What best describes your org type?",
                  required: true,
                  options: [
                    { value: "Inbound sales desk", label: "Inbound sales desk" },
                    { value: "Manufacturer", label: "Manufacturer" },
                    { value: "Property or booking team", label: "Property or booking team" },
                    { value: "Customer support team", label: "Customer support team" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["regulated"],
                field: {
                  name: "regulated_needs",
                  fieldType: "checkbox",
                  label: "What best describes your needs or interests?",
                  required: true,
                  options: [
                    { value: "Agentic Claims, Contract or Case Review", label: "Agentic Claims, Contract or Case Review" },
                    { value: "Agentic Alerting, Risk & Exception Flags", label: "Agentic Alerting, Risk & Exception Flags" },
                    { value: "Agentic PMO, Compliance and Portfolio Orchestration", label: "Agentic PMO, Compliance and Portfolio Orchestration" },
                    { value: "Agentic Staff Support (Knowledge Agents)", label: "Agentic Staff Support (Knowledge Agents)" },
                    { value: "AI Test & Evaluation", label: "AI Test & Evaluation" },
                    { value: "AI Agent Tuning", label: "AI Agent Tuning" },
                    { value: "Document Intake, Data Curation", label: "Document Intake, Data Curation" },
                  ],
                },
              },
              {
                when: ["professional-services"],
                field: {
                  name: "services_desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "Legal and Compliance", label: "Legal and Compliance" },
                    { value: "Consulting and Audit", label: "Consulting and Audit" },
                    { value: "Document intake, datasets, or prompt development for expert teams", label: "Document intake, datasets, or prompt development for expert teams" },
                    { value: "Agent tuning and evaluation", label: "Agent tuning and evaluation" },
                    { value: "Red-teaming, safety, or guardrails", label: "Red-teaming, safety, or guardrails" },
                    { value: "AI applications or agentic systems", label: "AI applications or agentic systems" },
                    { value: "Deployment, hosting, or integration", label: "Deployment, hosting, or integration" },
                  ],
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
                    { value: "Data partnership (data licensing / contributing, sourcing expert engineers)", label: "Data partnership (data licensing / contributing, sourcing expert engineers)" },
                    { value: "Technology / integration partnership (includes cloud & infrastructure)", label: "Technology / integration partnership (includes cloud & infrastructure)" },
                    { value: "Reseller / channel / referral partnership", label: "Reseller / channel / referral partnership" },
                    { value: "Systems integrator / consulting partnership", label: "Systems integrator / consulting partnership" },
                    { value: "Research or academic collaboration", label: "Research or academic collaboration" },
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
              {
                when: ["operations", "product", "revenue", "Other"],
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
                when: ["operations", "product", "revenue"],
                field: {
                  name: "message",
                  fieldType: "textarea",
                  placeholder: "Please describe your project in detail (data type, volume, timeline, budget, etc.)",
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
    quote: "We're going to need a lot more investment in high-quality evals and benchmarks to help us understand the actual comparative utility of the various agents. This new set of private evals and baselines from Vahue is great to see", // PLACEHOLDER
    name: 'Full Name', // PLACEHOLDER
    position: 'Role, Company', // PLACEHOLDER
    trustedBy: "Trusted by the world's most ambitious AI teams", // PLACEHOLDER
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
