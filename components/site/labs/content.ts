// Copy for the labs chrome. Same shape as content.scale.ts. Inkeep's and HubSpot's live services are replaced by static behaviour.
// [AGENT EVALS] follows the site menu's name for /labs/leaderboard (components/site/content.ts).
import { countries } from './countries'
import type { LabsChromeContent } from './types'

export const labsChrome: LabsChromeContent = {
  logo: { alt: 'Vahue Labs' },
  nav: {
    papers: { href: '/labs/papers', label: '[PAPERS]' },
    blog: { href: '/labs/blog', label: '[BLOG]' },
    leaderboard: { href: '/labs/leaderboard', label: '[AGENT EVALS]' },
  },
  homeHref: '/labs',
  searchLabel: 'Search',
  shortcut: '⌘K',
  mobileMenuLabel: 'Toggle mobile menu',
  footer: {
    title: 'Vahue Labs Newsletter',
    blurb: 'Research, benchmarks, and insights — delivered to your inbox.',
    subscribe: 'Subscribe to newsletter',
    copyrightPrefix: 'Copyright 2026',
    copyrightEntity: { label: 'Vahue Inc.', href: '/' }, // PLACEHOLDER: legal entity name for Mike
    copyrightSuffix: 'All rights reserved.',
    links: [
      { label: 'Terms', href: '/legal/terms' },
      { label: 'Privacy', href: '/legal/privacy' },
    ],
  },
  newsletter: {
    title: 'Subscribe to Vahue Labs',
    emailPlaceholder: 'Work email*',
    countryPlaceholder: 'Country*',
    countries,
    legalBefore: 'By submitting this form, your information will be processed in accordance with our',
    legalLink: { label: 'Privacy Policy.', href: '/legal/privacy' },
    submit: 'Submit →',
    required: 'Please complete this required field.',
    invalidEmail: 'Email must be formatted correctly.',
    thanks: 'Thanks for submitting the form.',
    close: 'Close',
  },
  search: {
    placeholder: 'Search Vahue Labs',
    searchTab: 'Search',
    askTab: 'Ask AI',
    askTrigger: 'Ask AI',
    startConversation: 'Start conversation',
    allLabel: 'All',
    noResults: 'No results found.',
    poweredBy: 'Powered by',
    poweredByName: 'vahue',
    close: 'Close',
    chatGreeting: 'Hi!',
    chatIntro: "I'm an AI assistant trained on documentation, help articles, and other content.",
    chatAskPrefix: 'Ask me anything about',
    chatSubject: 'Vahue Labs',
    chatPlaceholder: 'How do I get started?',
    chatAnswerIntro: 'Here is what we have on that:',
    chatNoAnswer: 'Nothing on that yet in this snapshot.',
  },
}
