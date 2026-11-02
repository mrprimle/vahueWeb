# Site chrome and shared base

Live source: https://scale.com (checked on `/data-engine`, `/about`, `/enterprise`) at 1440x900 and 390x844, 2026-11-01. Stack and component list: [../stack.md](../stack.md). Scale's strings: `components/site/content.scale.ts`. Rendered strings: `components/site/content.ts`.

## For page agents
- The layout already mounts Lenis, route logic, announcement bar, header and footer. Render page sections only, into `<main>`.
- Dark sections: wrap the page in `<div className="CMSSliceRenderer rootPageRenderer">`, make sections its direct children, set `data-theme="dark"` on dark ones, and mount `<SectionThemeWatcher />` from `shared/SectionTheme`. A dark-first page mounts `<PageThemeSetter theme="dark" />`, and its route goes in `routeTheme` (`lib/themeStore.ts`) and `DARK_CHROME_ROUTES` (`SiteChrome.tsx`). Scale does this for `/public-sector/national-security` and `/genai-portfolio`.
- A section whose height changes after load dispatches `window.dispatchEvent(new Event('section-theme:remeasure'))`.
- Sticky elements under the header call `registerHeaderVars(el)` from `lib/headerVars` to receive `--header-height` and `--header-y`. They are not on `<html>`. `--announcement-offset` is on `<html>`.
- `/docs` and `/labs*` render without this chrome (`SEPARATE_CHROME_PREFIXES`), as those are separate sites on Scale. Their agents supply their own.
- New nav or footer link: edit `content.ts` and `content.scale.ts` together, same counts.

## Sections

### Announcement bar
Module 677474. Region in normal flow above the header, `z-30`, evergreen `#193a29`, on all pages. 39.25 tall at 1440, 101.75 at 390. A scroll listener and `ResizeObserver` write `--announcement-offset = max(0, bar.bottom)`, so the fixed header rides up with it. Dismiss: `max-h-40` to 0, 300ms ease-out, no persistence (Scale also comes back on reload).

Mount: Scale's CMS entry has `scheduled: true`, so `C` is false while `p` is null, the server HTML has no bar, and the first `useEffect` mounts it. There is no timer: it appears at hydration, after first paint, and pushes the page down 39.25 (layout shift 0.0273 on both). `--announcement-offset` goes empty, `0px`, then `39.25px`, same order on both. The `ResizeObserver` on `body` in `SmoothScroll` refreshes ScrollTrigger afterwards. Measured first paint to bar: Scale 280 to 490ms (production), ours 250 to 280ms (dev). Icons are Scale's filled 24px glyphs, not lucide. Bar height equals Scale at every even width from 320 to 900 except 426, 454 and 556, a 2px font band at each wrap point.

### Header
Module 511174. `fixed`, `top: var(--announcement-offset)`. 88 tall at 1440, 70 at 390. Row is `grid-layout-desktop` from `md`; triggers at x 140.7, 224.7, 310.1, 396.2 (Scale 140.7, 225.2, 311.2, 397.4: Aeonik vs Aeonik Pro widths). 4 categories with 12, 6, 5 and 11 links.

### Desktop menus
Backdrop height at 1440 equals Scale's: Products 488.5, Solutions 392, Research 417.5, Resources 492.19. Link 20/27.5, -0.5px, hover `#775893` over 200ms. Hover or focus on a link swaps the image.

### Mobile drawer
Below `md`. Same 4 rows at y 74, 140, 206, 272, 66 tall, 32/34 type. CTA bar at y 764, 160 and 158 wide. Drill-down track moves 500ms `cubic-bezier(.32,.72,0,1)`. Products links at y 118 to 681, equal.

### Footer
Module 260646. 898.6 tall at 1440, 1360.3 at 390, equal to Scale. Columns at x 140.7, 374, 607.3, 840.7, 1074. Title `header1 md:text-[7.25rem]`, 232 tall on 2 lines at 1440, 160 at 390. No motion. Note the mono label is 13.008px at 1440 and 10px at 390.

Height is driven by line wraps only: with Scale's strings injected the structure matches at every width. Two strings were therefore aligned to Scale's wrap: `Workflow Automation Guide` sits in Scale's `Computer Vision Applications` slot (the 2-line row at 768 to 1100), and the copyright line reads like Scale's `Scale AI, Inc.` line (wraps at 320 and 768). Equal to Scale at 390, 480x800, 768, 900, 1023, 1024, 1100, 1279, 1280, 1440. Left open: 320 is 40 short, because Aeonik Pro sets "most important" at 272.45 in a 272 column and Aeonik at 269.38, so Scale wraps one more line (font, leave). `workflows` is wider than `decisions`, so the title holds one more line than Scale in 400 to 407, 500 to 507, 1060 to 1091 and 1356 to 1379 (1366 laptops: 1014.6 against 898.6).

### Smooth scroll
See the Lenis section of stack.md.

## Interaction inventory

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| `header` | none direct | REA `ev_7983bf50ef104d65…`: 0 listeners, all handlers are React delegated | 511174 | | Same |
| Trigger wrapper | mouseenter | React `onMouseEnter` | 511174 | Opens at once, no delay; others fade to `opacity-30`, 200ms | Same |
| Trigger button | click | React `onClick` | 511174 | Toggles; closes only when motion is at rest | `aria-expanded` false after click, both |
| Trigger button | keyboard Enter | Native button click | 511174 | Same as click | `aria-expanded` true, both |
| Open menu | Escape | None | | Scale does nothing | Stays open, both |
| Bar | mouseleave | React `onMouseLeave` | 511174 | Closes | Panel unmounts, both |
| Document | mousedown outside | `document.addEventListener` | 511174 | Closes | Closes, both |
| Backdrop | open, switch | gsap | 511174 | `scaleY` 0 to 1, 1s `expo.out`, delay .1; close .5s `expo.out` | t 155: .365 vs .369 at matched phase |
| Clip | open, close | gsap | 511174 | `inset` 100% to 0, .36s `power2.out`; close .24s `power2.out` | close t 51: 49.6% vs 50.4%; t 153: 94.5 vs 94.7 |
| Items | open | gsap | 511174 | `autoAlpha` 0, `y` 10, .36s `power2.out`, stagger .0308, at `-=0.28`; switch .34s; close .18s `power2.in` | Item 3: .31 vs .32, .59 vs .60 |
| Image | open, switch | gsap | 511174 | scale 1.4 to 1, .8s `power3.out` | 1.114 vs 1.114 |
| Bar | scroll | Lenis `scroll` | 511174 | `y` follows delta, clamps at `-max(height, 90)`; 0 at top | wheel 40 x 10: -15, -37, -64, -88, -90 vs -15, -35, -60, -87, -90 |
| Header | pointerenter | React | 511174 | `y` to 0, default .5s, `snap: 'y'` | Ported, not sampled |
| Header | same-page link click | `onClickCapture` | 511174 | Resets state, scrolls to 0 | Ported, not sampled |
| FlatCta fill, border | pointerenter, leave | React, `transitionend`, 680ms timer | 892855 | 300ms ease-out; label scale .9; in from below, out through top, then reset | Enter 67.1, 38.4, 20.5, 6.6 vs 67.0, 38.4, 20.5, 6.6; leave -32.9, -61.7, -79.5 vs -32.9, -61.6, -79.6 |
| FlatCta arrow | pointerenter, leave | Same | 892855 | 600ms, slides on x | -30.6, -19.2, -10.2 vs -30.6, -19.2, -10.2 |
| Burger | click | React | 511174 | Fill `scaleY` .001 to 1, .36s; list .32s, stagger .048; CTA bar `yPercent` .36s, delay .25 | .693, .846, .937 vs .689, .844, .936 |
| Mobile fill | | | 511174 | Class typo `MobileNavFillfixed` on Scale: static, 0 tall. Kept on purpose | Position static, height 0, both |
| Section theme | scroll | Lenis `scroll` | 995634 | Dark when `scroll + 35` is inside a dark section, debounce 50ms twice | Flips at dark top - 30, not at - 40, both; fade frames equal |
| Route change | pathname | `usePathname` effect | 474053 | Theme reset, `scrollTo(0, immediate)`, hash scroll after ready | Ported, not sampled |
| Anchor click | click, capture | `document` | 474053 | Lenis scroll with `scrollMarginTop` | Ported, not sampled |
| Wheel | wheel | Lenis | 2d7ykwtxp | lerp .14, wheelMultiplier .8 | 172, 270, 325, 351 vs 172, 270, 325, 351 |
| Footer links | none | HubSpot `mousedown` and click only on Scale | 260646 | No hover state | Same |

## Deviations from Scale
- **Fonts:** see stack.md. Aeonik, not Aeonik Pro; DM Mono for Aeonik Mono.
- **Logo:** `Logo` is a text wordmark, narrower than the 80px box it sits in. `LogoMark` stands in for Scale's triangle in the announcement bar and footer.
- **Consent:** Scale's OneTrust banner and analytics are not built. "Cookie preferences" is an inert button.
- **Social icons:** drawn inline. Scale serves 16px CMS SVGs.
- **Header mount:** `<Header>` mounts in the layout, where Scale mounts it inside each page. Behaviour is the same.
- **Route transition:** `CMSLink` on Scale checks `window.__scaleTransitionNavigate`, but nothing in any fetched chunk sets it. Not ported.
- **Favicon:** none yet, so browsers log one 404.

## Copy mapping
Keep rule (Mike, 2026-11-01): each string starts from Scale's text, stays verbatim if true for Vahue with the brand swapped, otherwise changes only the words the swap dictionary and phrase bank require, same template and word count. Counts come from a path-by-path compare with `content.scale.ts`, alt text, code samples and URLs excluded. Verbatim means equal after Scale to Vahue. Light means up to 3 words or about a third changed.

Scale's column heads are back: Build AI, Apply AI, Evaluate AI, By Industry. Scale Data Engine became Vahue Context Engine, with For Back-office Sync, For Document Intake, For Government, For Scoring and Decisions, Agent Environments, Experts under it. Knowledge Agents and Support and Voice Agents stay, matching those pages. Evaluate AI reads For Operations Teams, For Public Sector, For Enterprise. National Security became Regulated Industries. Frontier Leaderboards became Agent Evals. Footer title uses "workflows", which holds Scale's 2 lines at 390 where "work" drops one. Data Processing Terms stays in place of Modern Slavery Statement, as that is the stub route that exists. 88 strings: 66 verbatim, 20 light, 2 rewritten.

## Placeholders
`// PLACEHOLDER` in `content.ts`, 6 lines: the announcement, the eBook card, the second featured post, legal entity name in the copyright line, LinkedIn URL, X URL. Terms, Privacy and Data Processing are stub pages. One menu image and one card image are neutral (`public/site/nav/neutral.svg`): the back-office image was a collage of Scale's research papers, the eBook card a military photo.

## Gaps
- Not sampled on the live site, ported from source only: header hover reveal, same-page link reset, route change effects, anchor scroll, `oml:` landscape, portrait tablet footer.
- Most menu images are still Scale's photos, including military ones under Public Sector and National Security. Mike to decide.
