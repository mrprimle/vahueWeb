import type { DocsContent, DocsPageNode, DocsTab } from './content.types'

export type ResolvedPage = {
  href: string
  title: string
  heading: string
  anchor: string
  eyebrow?: string
  tabIndex: number
  isLanding: boolean
  isApi: boolean
  prev?: { title: string; href: string }
  next?: { title: string; href: string }
}

const pagesOfTab = (tab: DocsTab) => {
  const out: { node: DocsPageNode; parent?: string }[] = []
  for (const section of tab.sections) {
    for (const item of section.items) {
      if (item.kind === 'page') out.push({ node: item, parent: section.title })
      else for (const child of item.items) out.push({ node: child, parent: item.title })
    }
  }
  return out
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function allPages(content: DocsContent) {
  return content.tabs.flatMap((tab) =>
    pagesOfTab(tab).map(({ node, parent }) => ({ title: node.pageTitle ?? node.title, href: node.href, path: [tab.label, parent].filter(Boolean).join(' / ') })),
  )
}

export function resolvePage(content: DocsContent, pathname: string): ResolvedPage {
  for (let tabIndex = 0; tabIndex < content.tabs.length; tabIndex += 1) {
    const list = pagesOfTab(content.tabs[tabIndex])
    const index = list.findIndex((p) => p.node.href === pathname)
    if (index >= 0) {
      const { node, parent } = list[index]
      const title = node.pageTitle ?? node.title
      const isLanding = pathname === content.tabs[0].href
      const prev = list[index - 1]?.node
      const next = list[index + 1]?.node
      return {
        href: node.href,
        title: isLanding ? content.landing.title : title,
        heading: isLanding ? content.landing.heading : title,
        anchor: isLanding ? content.landing.headingId : slugify(title),
        eyebrow: isLanding ? undefined : parent,
        tabIndex,
        isLanding,
        isApi: tabIndex === 1 || !!node.placeholder,
        prev: isLanding || !prev ? undefined : { title: prev.pageTitle ?? prev.title, href: prev.href },
        next: next ? { title: next.pageTitle ?? next.title, href: next.href } : undefined,
      }
    }
  }
  return {
    href: pathname,
    title: content.landing.title,
    heading: content.landing.heading,
    anchor: content.landing.headingId,
    tabIndex: 0,
    isLanding: false,
    isApi: false,
  }
}

export function hasPage(content: DocsContent, pathname: string) {
  return content.tabs.some((tab) => pagesOfTab(tab).some((p) => p.node.href === pathname))
}

/** The parent group of a page, if any: Scale opens it. */
export function firstPageOf(items: DocsPageNode[]) {
  return items[0]?.href
}
