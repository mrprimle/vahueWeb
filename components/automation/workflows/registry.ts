import type { ComponentType } from 'react'
import type { Workflow } from '@/lib/automation-content'

// Workflow slug -> page component built from that workflow's template.
// Filled in as each template's clone passes visual QA.
export const WORKFLOW_PAGES: Record<string, () => Promise<{ default: ComponentType<{ workflow: Workflow }> }>> = {
  'back-office-sync': () => import('./generative-ai-data-engine/WorkflowPage'),
  'document-intake': () => import('./physical-ai/WorkflowPage'),
  'engineering-enablement': () => import('./rlenvironments/WorkflowPage'),
  'knowledge-agents': () => import('./genai-portfolio/WorkflowPage'),
  'scoring-decisions': () => import('./automotive/WorkflowPage'),
  'support-agents': () => import('./donovan/WorkflowPage'),
}
