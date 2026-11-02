// Rendered strings. Same shape as content.scale.ts. Keep rule: Scale's line stays unless it is false for Vahue.
// Section names follow the site's menu (components/site/content.ts), minus its leading "For", which wraps the 20px
// sidebar title onto a second line: GenAI Platform is /genai-portfolio, GenAI Data Engine is /generative-ai-data-engine,
// Automotive Data Engine is /automotive, Nucleus maps to Agent Evals.
// Vahue has no public API. Every API Reference entry is marked `placeholder` and shows the pill in the sidebar.
import type { DocsContent, DocsPageNode } from './content.types'

const page = (title: string, href: string): DocsPageNode => ({ kind: 'page', title, href })
const api = (title: string, href: string): DocsPageNode => ({ kind: 'page', title, href, placeholder: true }) // PLACEHOLDER: no such endpoint exists

export const content: DocsContent = {
  siteName: 'Vahue Documentation',
  logo: { kind: 'wordmark' },
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
    assistantUnavailable: 'Placeholder: the assistant is not connected yet, so this question was not answered or sent anywhere.', // PLACEHOLDER: no assistant backend
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
        { items: [page('Getting Started with Vahue', '/docs')] },
        {
          title: 'Getting Started with Vahue',
          items: [
            page('Overview', '/docs/overview'),
            page('Key Concepts', '/docs/key-concepts-and-definitions'),
            page('Team', '/docs/team-getting-started'),
            page('Technical Limits & Recommendations', '/docs/technical-limits-and-recommendations'),
            { ...api('API Compatibility Policy', '/docs/api-compatibility-policy'), quietTag: true }, // No pill: the row must stay one line, the page itself says so
            page('Customer Support', '/docs/customer-support'),
          ],
        },
        { title: 'Knowledge Agents', items: [page('Getting Started', '/docs/genai-platform')] },
        { title: 'Back-office Sync', items: [page('Getting Started', '/docs/genai-data-engine')] },
        {
          title: 'Scoring and Decisions',
          items: [
            {
              kind: 'group',
              title: 'Customer Dashboard', // PLACEHOLDER: no customer dashboard confirmed
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
              title: 'Data Hosting', // PLACEHOLDER: storage connectors not confirmed
              items: [
                page('AWS S3', '/docs/aws-s3'),
                page('Google Cloud Storage', '/docs/google-cloud-storage'),
                page('Azure Blob Storage', '/docs/azure-blob-storage'),
                page('IP Allowlisting', '/docs/ip-allowlisting'),
              ],
            },
            page('Agent Evals', '/docs/nucleus'),
          ],
        },
      ],
    },
    {
      label: 'API Reference',
      href: '/docs/api-reference/introduction-to-vahue-api',
      sections: [
        {
          title: 'Vahue API',
          items: [
            api('Introduction to Vahue API', '/docs/api-reference/introduction-to-vahue-api'),
            api('Authentication', '/docs/api-reference/authentication'),
            api('Callbacks', '/docs/api-reference/callbacks'),
            api('Secure Result URLs', '/docs/api-reference/secure-result-urls'),
            api('Errors', '/docs/api-reference/errors'),
          ],
        },
        {
          title: 'Back-office Sync',
          items: [
            api('Back-office Sync API', '/docs/api-reference/genai-data-engine'),
            api('Knowledge Agents', '/docs/api-reference/genai-platform'),
          ],
        },
        {
          title: 'Scoring and Decisions',
          items: [
            api('Projects', '/docs/api-reference/projects'),
            api('Decision Rules', '/docs/api-reference/taxonomy-service'),
            api('Batches', '/docs/api-reference/batches'),
            api('Tasks', '/docs/api-reference/tasks'),
            api('Quality Audits', '/docs/api-reference/fixless-audits'),
          ],
        },
        {
          title: 'Scoring and Decisions Task Types',
          items: [
            api('Multi-Stage Task Reference', '/docs/api-reference/multi-stage-reference'),
            api('Create Multi-Stage Tasks', '/docs/api-reference/create-multi-stage-task'),
            api('Document Intake Task Reference', '/docs/api-reference/sensor-fusion-reference'),
            api('Create Document Intake Tasks', '/docs/api-reference/sensor-fusion-tasks'),
            api('Support and Voice Task Reference', '/docs/api-reference/image-and-video-reference'),
            api('Create Support and Voice Tasks', '/docs/api-reference/image-and-video-tasks'),
            api('Legacy Task Reference', '/docs/api-reference/sensor-fusion-lidar-reference'),
            api('Create Legacy Tasks', '/docs/api-reference/sensor-fusion-lidar-tasks'),
          ],
        },
      ],
    },
  ],
  landing: {
    title: 'Getting Started with Vahue',
    lead: 'Vahue’s mission is to accelerate the deployment of AI applications. To enable teams to make faster progress, we began with context - the foundation of all AI applications. Vahue turns raw data into high-quality context by combining machine learning powered pre-processing and active tooling with varying levels and types of human review.',
    heading: 'Getting Started with Vahue',
    headingId: 'getting-started-with-vahue',
    body: 'Vahue’s mission is to accelerate the deployment of AI applications. To enable teams to make faster progress, we began with context - the foundation of all AI applications. Vahue turns raw data into high-quality context by combining machine learning powered pre-processing and active tooling with varying levels and types of human review.',
    cards: [
      { title: 'Documentation', body: 'Guides, workflows, and product documentation.', href: '/docs/genai-data-engine' },
      { title: 'API Reference', body: 'Placeholder API concepts and endpoint reference.', href: '/docs/api-reference/introduction-to-vahue-api' }, // PLACEHOLDER: Vahue has no public API
    ],
    next: { title: 'Overview', href: '/docs/overview' },
  },
  stub: {
    docsNote: 'This page has not been written yet. It holds the layout of the documentation until the content is ready.', // PLACEHOLDER: sub-page content
    apiNote: 'Vahue does not publish this API. This page only holds the layout of the reference, and no endpoint here is live.', // PLACEHOLDER: no public API
  },
}
