// Scale's strings, read from https://scale.com/docs (Mintlify) on 2026-11-02.
// The two stub notes and assistantUnavailable are ours: those states have no Scale string to copy, see docs/specs/docs.md.
import type { DocsContent } from './content.types'

const page = (title: string, href: string) => ({ kind: 'page' as const, title, href })

export const content: DocsContent = {
  siteName: 'Scale Documentation',
  // mintcdn.com/scale-full-docs/AJGSK20C0uN_df4o/assets/scale-wordmark.svg and scale-wordmark-dark.svg.
  logo: { kind: 'image', light: '/docs/scale-wordmark.svg', dark: '/docs/scale-wordmark-dark.svg' },
  ui: {
    homeSuffix: 'home page',
    skipToContent: 'Skip to main content',
    navigation: 'Navigation',
    searchTrigger: 'Search...',
    searchPlaceholder: 'Search or ask a question...',
    searchHints: 'Use the up and down arrow keys to select a result, Enter to open it, and Escape to close search.',
    searchNoResults: 'No results',
    askAssistant: 'Ask Assistant',
    assistantTitle: 'Assistant',
    assistantDisclaimer: 'Responses are generated using AI and may contain mistakes.',
    assistantPlaceholder: 'Ask a question...',
    assistantUnavailable: 'This clone has no assistant backend.',
    onThisPage: 'On this page',
    backToTop: 'Back to top',
    themeSystem: 'System',
    themeLight: 'Light',
    themeDark: 'Dark',
    placeholderTag: 'Placeholder',
  },
  tabs: [
    {
      label: 'Documentation',
      href: '/docs',
      sections: [
        { items: [page('Getting Started with Scale', '/docs')] },
        {
          title: 'Getting Started with Scale',
          items: [
            page('Overview', '/docs/overview'),
            page('Key Concepts', '/docs/key-concepts-and-definitions'),
            page('Team', '/docs/team-getting-started'),
            page('Technical Limits & Recommendations', '/docs/technical-limits-and-recommendations'),
            page('API Compatibility Policy', '/docs/api-compatibility-policy'),
            page('Customer Support', '/docs/customer-support'),
          ],
        },
        { title: 'GenAI Platform', items: [page('Getting Started', '/docs/genai-platform')] },
        { title: 'GenAI Data Engine', items: [page('Getting Started', '/docs/genai-data-engine')] },
        {
          title: 'Automotive Data Engine',
          items: [
            {
              kind: 'group',
              title: 'Customer Dashboard',
              items: [
                page('Manage Your Account', '/docs/pro-or-manage-account'),
                page('Tasks Tab', '/docs/pro-or-tasks-tab'),
                page('Manage Your Projects', '/docs/pro-or-manage-projects'),
                page('Quality Tab', '/docs/pro-or-quality'),
                page('Downloading Data', '/docs/downloading-data'),
                page('Overview', '/docs/pro-or-overview-tab'),
              ],
            },
            {
              kind: 'group',
              title: 'Data Hosting',
              items: [
                page('AWS S3', '/docs/aws-s3'),
                page('Google Cloud Storage', '/docs/google-cloud-storage'),
                page('Azure Blob Storage', '/docs/azure-blob-storage'),
                page('IP Allowlisting', '/docs/ip-allowlisting'),
              ],
            },
            page('Nucleus', '/docs/nucleus'),
          ],
        },
      ],
    },
    {
      label: 'API Reference',
      href: '/docs/api-reference/introduction-to-scale-api',
      sections: [
        {
          title: 'Scale API',
          items: [
            page('Introduction to Scale API', '/docs/api-reference/introduction-to-scale-api'),
            page('Authentication', '/docs/api-reference/authentication'),
            page('Callbacks', '/docs/api-reference/callbacks'),
            page('Secure Result URLs', '/docs/api-reference/secure-result-urls'),
            page('Errors', '/docs/api-reference/errors'),
          ],
        },
        {
          title: 'GenAI Data Engine',
          items: [
            page('GenAI Data Engine API', '/docs/api-reference/genai-data-engine'),
            page('GenAI Platform', '/docs/api-reference/genai-platform'),
          ],
        },
        {
          title: 'Automotive Data Engine',
          items: [
            page('Projects', '/docs/api-reference/projects'),
            page('Taxonomy Service', '/docs/api-reference/taxonomy-service'),
            page('Batches', '/docs/api-reference/batches'),
            page('Tasks', '/docs/api-reference/tasks'),
            page('Fixless Audits', '/docs/api-reference/fixless-audits'),
          ],
        },
        {
          title: 'Automotive Data Engine Task Types',
          items: [
            page('Multi-Stage Task Reference', '/docs/api-reference/multi-stage-reference'),
            page('Create Multi-Stage Tasks', '/docs/api-reference/create-multi-stage-task'),
            page('Sensor Fusion Task Reference', '/docs/api-reference/sensor-fusion-reference'),
            page('Create Sensor Fusion Tasks', '/docs/api-reference/sensor-fusion-tasks'),
            page('Image & Video Task Reference', '/docs/api-reference/image-and-video-reference'),
            page('Create Image & Video Tasks', '/docs/api-reference/image-and-video-tasks'),
            page('Legacy Task Reference', '/docs/api-reference/sensor-fusion-lidar-reference'),
            page('Create Legacy Tasks', '/docs/api-reference/sensor-fusion-lidar-tasks'),
          ],
        },
      ],
    },
  ],
  landing: {
    title: 'Getting Started with Scale',
    lead: 'Scale AI’s mission is to accelerate the development of AI applications. To enable teams to make faster progress, we began with data - the foundation of all AI applications. Scale AI turns raw data into high-quality training data by combining machine learning powered pre-labeling and active tooling with varying levels and types of human review.',
    heading: 'Getting Started with Scale',
    headingId: 'getting-started-with-scale',
    body: 'Scale AI’s mission is to accelerate the development of AI applications. To enable teams to make faster progress, we began with data - the foundation of all AI applications. Scale AI turns raw data into high-quality training data by combining machine learning powered pre-labeling and active tooling with varying levels and types of human review.',
    cards: [
      { title: 'Documentation', body: 'Guides, workflows, and product documentation.', href: '/docs/genai-data-engine' },
      { title: 'API Reference', body: 'API concepts and endpoint reference documentation.', href: '/docs/api-reference/introduction-to-scale-api' },
    ],
    next: { title: 'Overview', href: '/docs/overview' },
  },
  stub: {
    docsNote: 'This page was left out of the clone.',
    apiNote: 'This page was left out of the clone.',
  },
}
