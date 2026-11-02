// Scale's original strings for /demo: page source and HubSpot form 0babf6e5-e7d0-412a-b673-6e18e76e0c1f, read on 2026-11-02.
import { countries } from './countries'
import type { DemoContent } from './types'

const countryOptions = countries.map((c) => ({ value: c, label: c }))

export const content: DemoContent = {
  meta: {
    title: 'Meet with our team | Scale AI',
    description: 'Trusted by world class companies, Scale delivers high quality training data for AI applications such as self-driving cars, mapping, AR/VR, robotics, and more.',
  },
  heading: "Let's Scale Together",
  intro: 'Join leading enterprises partnering with Scale. Book a 1:1 intro call with us to get started.',
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
        fields: [{ name: "email", fieldType: "email", placeholder: "Work email", required: true, autoComplete: "email" }],
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
              { value: "true", label: "Enterprise" },
              { value: "false", label: "Model Builder/Research Lab" },
              { value: "Physical AI/Robotics", label: "Physical AI/Robotics" },
              { value: "U.S. Government Agency", label: "U.S. Government Agency" },
              { value: "Global Public Sector Entity", label: "Global Public Sector Entity" },
              { value: "Partners", label: "Partners" },
              { value: "Other", label: "Other" },
            ],
            dependents: [
              {
                when: ["true", "Other"],
                field: {
                  name: "ent_industry",
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
                when: ["true", "Other"],
                field: {
                  name: "ent_desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "AI applications or agentic systems", label: "AI applications or agentic systems" },
                    { value: "Model training, tuning, and evaluation", label: "Model training, tuning, and evaluation" },
                    { value: "Red-teaming, safety, or guardrails", label: "Red-teaming, safety, or guardrails" },
                    { value: "Deployment, hosting, or integration", label: "Deployment, hosting, or integration" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["false"],
                field: {
                  name: "gen_ai_desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "Expert-Generated Data", label: "Expert-Generated Data" },
                    { value: "RL Environments / Universes", label: "RL Environments / Universes" },
                    { value: "Model Benchmarks & Leaderboards", label: "Model Benchmarks & Leaderboards" },
                    { value: "Model training, tuning, and evaluation", label: "Model training, tuning, and evaluation" },
                    { value: "Independent research", label: "Independent research" },
                  ],
                },
              },
              {
                when: ["false"],
                field: {
                  name: "gen_ai_model_stage",
                  fieldType: "select",
                  unselectedLabel: "What stage is your model at?",
                  required: true,
                  options: [
                    { value: "Pre-training / early research", label: "Pre-training / early research" },
                    { value: "Fine-tuning an existing foundation model", label: "Fine-tuning an existing foundation model" },
                    { value: "Post-training / RLHF / alignment", label: "Post-training / RLHF / alignment" },
                    { value: "Evaluating or benchmarking a completed model", label: "Evaluating or benchmarking a completed model" },
                  ],
                },
              },
              {
                when: ["false"],
                field: {
                  name: "gen_ai_modalitydata_domain",
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
                when: ["false"],
                field: {
                  name: "gen_ai_current_resolution",
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
                when: ["false"],
                field: {
                  name: "gen_ai_current_initiative_size",
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
                when: ["Physical AI/Robotics"],
                field: {
                  name: "brand_what_best_describes_your_company",
                  fieldType: "select",
                  unselectedLabel: "What best describes your org type?",
                  required: true,
                  options: [
                    { value: "Data collection operator", label: "Data collection operator" },
                    { value: "Manufacturer", label: "Manufacturer" },
                    { value: "Model research lab", label: "Model research lab" },
                    { value: "Academic Institution", label: "Academic Institution" },
                    { value: "Other", label: "Other" },
                  ],
                },
              },
              {
                when: ["U.S. Government Agency"],
                field: {
                  name: "ps_desired_solution",
                  fieldType: "checkbox",
                  label: "What best describes your needs or interests?",
                  required: true,
                  options: [
                    { value: "Agentic War, Joint or Mission Planning", label: "Agentic War, Joint or Mission Planning" },
                    { value: "Agentic Alerting, Indications & Warnings", label: "Agentic Alerting, Indications & Warnings" },
                    { value: "Agentic PMO, Compliance and Portfolio Orchestration", label: "Agentic PMO, Compliance and Portfolio Orchestration" },
                    { value: "Agentic Staff Support (Scale Donovan)", label: "Agentic Staff Support (Scale Donovan)" },
                    { value: "AI Test & Evaluation", label: "AI Test & Evaluation" },
                    { value: "AI Model Training", label: "AI Model Training" },
                    { value: "Data or Image Labeling, Curation", label: "Data or Image Labeling, Curation" },
                  ],
                },
              },
              {
                when: ["Global Public Sector Entity"],
                field: {
                  name: "gps_desired_solution",
                  fieldType: "select",
                  unselectedLabel: "What best describes the solution you’re seeking?",
                  required: true,
                  options: [
                    { value: "Civilian", label: "Civilian" },
                    { value: "Global Defense", label: "Global Defense" },
                    { value: "Data labeling, datasets, or prompt development for government systems", label: "Data labeling, datasets, or prompt development for government systems" },
                    { value: "Model training, tuning, and evaluation", label: "Model training, tuning, and evaluation" },
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
                    { value: "Data partnership (data licensing / contributing, sourcing data contributors)", label: "Data partnership (data licensing / contributing, sourcing data contributors)" },
                    { value: "Technology / integration partnership (includes cloud & infrastructure)", label: "Technology / integration partnership (includes cloud & infrastructure)" },
                    { value: "Reseller / channel / referral partnership", label: "Reseller / channel / referral partnership" },
                    { value: "Systems integrator / consulting partnership", label: "Systems integrator / consulting partnership" },
                    { value: "Research or academic collaboration", label: "Research or academic collaboration" },
                    { value: "Model evaluation / benchmarking partnership", label: "Model evaluation / benchmarking partnership" },
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
                when: ["true", "false", "Physical AI/Robotics", "Other"],
                field: {
                  name: "annual_budget",
                  fieldType: "radio",
                  label: "Project Budget",
                  required: true,
                  options: [
                    { value: "<$100k", label: "<$100k" },
                    { value: "$100k-500k", label: "$100k-500k" },
                    { value: "$500k-1M", label: "$500k-1M" },
                    { value: "$1M+", label: "$1M+" },
                  ],
                },
              },
              {
                when: ["true", "false", "Physical AI/Robotics"],
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
            name: "how_did_you_hear_about_scale",
            fieldType: "select",
            unselectedLabel: "How did you hear about Scale?",
            required: true,
            options: [
              { value: "Billlboard", label: "Billboard" },
              { value: "Email Outreach", label: "Email Outreach" },
              { value: "Event, Conference, or Webinar", label: "Event, Conference, or Webinar" },
              { value: "Existing Relationship with Scale", label: "Existing Relationship with Scale" },
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
      { columns: 1, fields: [{ name: "utm_source", fieldType: "text", label: "utm_source", hidden: true }] },
      { columns: 1, fields: [{ name: "utm_campaign", fieldType: "text", label: "utm_campaign", hidden: true }] },
      { columns: 1, fields: [{ name: "utm_medium", fieldType: "text", label: "utm_medium", hidden: true }] },
    ],
    submitText: 'Submit',
    sendingText: 'Sending...',
    submittedMessage: "Thanks for reaching out! We'll be in touch shortly.",
    legal: ['By submitting this form, your information will be processed in accordance with our ', { text: 'Privacy Policy.', href: '/legal/privacy' }],
    consent: [
      "By proceeding, you agree to Scale AI's ",
      { text: 'Privacy Policy', href: '/legal/privacy' },
      ' and ',
      { text: 'Terms and Conditions', href: '/legal/terms' },
      ' and consent to receive marketing communications. You can opt out at any time.',
    ],
    // Form setting `hmail.com,outlook.com` plus HubSpot's default free-mail list, which its server holds: the common ones are written out here.
    blockedEmailDomains: ['hmail.com', 'outlook.com', 'gmail.com', 'googlemail.com', 'yahoo.com', 'ymail.com', 'hotmail.com', 'live.com', 'msn.com', 'aol.com', 'icloud.com', 'me.com', 'mac.com', 'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'yandex.com', 'zoho.com'],
    errors: {
      required: 'Please complete this required field.',
      emailFormat: 'Email must be formatted correctly.',
      blockedEmail: 'Please enter a different email address. This form does not accept addresses from {{ domain }}.',
      rollupRequired: 'Please complete all required fields.',
      rollupBlocked: 'Please change your email address to continue.',
      sendFailed: ['Your message was not sent. Please try again, or email ', { text: 'human@vahue.ai', href: 'mailto:human@vahue.ai' }, '.'],
    },
  },
  sidebar: {
    quote: "We're going to need a lot more investment in high-quality evals and benchmarks to help us understand the actual comparative utility of the various models. This new set of private evals and leaderboards from Scale are great to see",
    name: 'Nat Friedman',
    position: 'Entrepreneur and Investor',
    trustedBy: "Trusted by the world's most ambitious AI teams",
    logos: [
      { src: '/demo/logos/cohere.svg', alt: 'Cohere', displayWidth: 92, displayHeight: 16 },
      { src: '/demo/logos/adept.svg', alt: 'Adept', displayWidth: 74, displayHeight: 25 },
      { src: '/demo/logos/meta.svg', alt: 'Meta', displayWidth: 88, displayHeight: 18 },
      { src: '/demo/logos/cisco.svg', alt: 'Cisco', displayWidth: 64, displayHeight: 34 },
      { src: '/demo/logos/time.svg', alt: 'Time', displayWidth: 74, displayHeight: 23 },
      { src: '/demo/logos/mayo-clinic.svg', alt: 'Mayo Clinic', displayWidth: 40, displayHeight: 40 },
      { src: '/demo/logos/dlapiper.svg', alt: 'DLA Piper', displayWidth: 62, displayHeight: 35 },
    ],
  },
}
