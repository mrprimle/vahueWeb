# scale.com shared chrome: header, announcement bar, footer

Captured 2026-10-31 from https://scale.com/, https://scale.com/data-engine (light) and the homepage scrolled past the hero (dark chrome), at 1440×900 and 390×844. The nav logic was read directly from Scale's nav chunk (`/_next/static/immutable/chunks/0sle6wl7ucd3b.js`, 31 KB, GSAP 3.15). Tokens and utility classes came from their CSS (`[data-theme=light|dark] body { --nav-* }`, `.navigation-*`, `.grid-layout-*`, `.detail-mono`, `.header1`). Motion was sampled with Playwright every 50 ms on Scale and on the clone; the curves match frame for frame (see "Motion verification").

Clone files:
- `components/scale-clone/shared/ScaleHeader.tsx`: state, motion orchestration and the bar
- `components/scale-clone/shared/header/`: `navData.ts` (menu model built from `pages.ts`), `navTheme.ts` (theme API), `DesktopMenuPanel.tsx`, `MobileDrawer.tsx`, `MenuBlocks.tsx`, `FlatCta.tsx`, `AnnouncementBar.tsx`, `VahueLogo.tsx`, `header.module.css`
- `components/scale-clone/shared/ScaleFooter.tsx` and `footer/footer.module.css`
- `public/scale-clone/shared/`: `menu-placeholder-1…8.svg` (neutral 16:9 placeholders), `linkedin.svg`, `x.svg` (Scale's 16×16 social icons; the footer inlines them)

## Theme API for page agents

On Scale, components flip a page theme (`setPageTheme('dark')`), which sets `html[data-theme]` and swaps every `--nav-*` variable. Vahue's `<html>` already has `data-theme="dark"`, so the clone never reads it. Pages have two ways to switch the chrome instead:
1. **Declarative:** add `data-nav-theme="dark"` (or `"light"`) to a section. On every scroll frame the header looks at the element under its bottom edge (viewport centre) and takes the closest `data-nav-theme` ancestor. The default is light.
2. **Imperative:** `import { setScaleNavTheme } from '@/components/scale-clone/shared/header/navTheme'`, then call `setScaleNavTheme('dark')` and later `setScaleNavTheme(null)`. Use this to copy Scale's scroll-position flips. For example, the homepage hero sets dark when scrolling down past 350px and back to light when scrolling up below 350px.

Dark-hero pages that start dark on Scale (`/public-sector/national-security`, `/global-public-sector` "SgpHero", the homepage once scrolled) should put `data-nav-theme="dark"` on their hero.

The header also publishes `--header-height` (bar height), `--header-y` (current hide offset) and `--announcement-offset` on `<html>`, as Scale does.

## Announcement bar
- In normal flow above everything. `bg #193a29`, white, `z-30`, `overflow-hidden`. Dismiss: `max-h-40 → 0` and `opacity 1 → 0`, 300ms ease-out.
- Inner: `max-w-[1472px] px-6 py-2.5`, centred flex `gap-x-3 gap-y-1` wrap, 14px / 1.375. Height 39.25px at 1440 and about 101.8px at 390 (icon, text and "Learn more" wrap onto 3 rows).
- Icon: 16px mark (Vahue circle in the clone, Scale's mark on Scale). "Learn more" is font-medium with a 16px NE arrow and underlines on hover.
- Close: `absolute right-3`, 28px round button, 16px ×, opacity .7, 1 on hover.
- `--announcement-offset = max(0, bar.bottom)`. The fixed header sits at `top: var(--announcement-offset)`, so it slides up with the bar as you scroll.

## Header bar

| | Desktop (≥768) | Mobile (<768) |
|---|---|---|
| Position | `fixed left-0 right-0 z-50`, `top: var(--announcement-offset)` | same |
| Height | 88 (py-6 + 40px row) | 70 (py-[15px] + 40) |
| Row layout | grid 12 × minmax(0,150px), gap 8, padding 0 24, centred | flex, justify-between, gap 8, px 24 |
| Logo box | col 1; 80×18, 80×20 from xl (Scale: `h-[18px] xl:h-5 max-w-[80px]`) | 80×18 |
| Triggers | `md:col-start-3 md:col-span-7 lg:col-start-2 lg:col-span-8`; gap 20 (md), 28 (lg); 14px/1, weight 400, h-40, no chevrons | hidden |
| CTAs | col-start-10 col-span-3, justify-end, gap 12. "Log In": h-40, r-8, 1px border `--nav-login-cta-border`, text `--nav-login-cta-text`. "Get Started": h-40, r-8, bg `--nav-demo-desktop-cta-bg`. Inner px-16 py-8, label 14px/500 | "Get Started": h-40, px-24 + inner px-16, r-6, bg `#eaeaea`; burger 40×40, r-8, bg `#f5f5f5`, 2 bars 10×2 at y 10/14 |

- Bar background `--nav-background` (white / black), colour transition 200ms with a 20ms delay.
- Measured at 1440 (Scale → clone): Products x 141 → 141; Log In 1228,63,72×40 → 1228,62,71×40; Get Started 1311,63,105×40 → identical.

**FlatCta hover:** a `bg-current opacity-35` layer slides in from the edge the cursor entered (translate-y ±100% → 0) and leaves through the exit edge, 300ms ease-out. The label scales to .9 (300ms ease-out, hover:hover only).

### Theme tokens (`header.module.css`)
| Token | light | dark |
|---|---|---|
| --nav-background / --nav-text | white / black | black / white |
| --nav-dropdown-background | #ffffffeb (92%) | #212121e0 |
| --nav-shadow | #00000029 | #00000052 |
| --nav-card-background | #f5f5f5 | #0006 |
| --nav-panel-background (mobile drawer) | #f5f5f5 | #212121 |
| --nav-ctas-background (burger) / --nav-mobile-close-background | #f5f5f5 / #eaeaea | #212121 / #575757 |
| login border / text | #c7c7c7 / #929292 | #575757 / #c7c7c7 |
| demo bg / text | black / white | white / black |
| mobile demo bg / text | #eaeaea / black | #191919 / white |
| mobile CTA wrapper | white | #575757 |

### Hide on scroll (Scale `em` logic)
The bar's `y` follows the scroll delta: down moves it up, clamped at `-max(barHeight, 90)`, and up brings it back, clamped at 0. At `scrollY ≤ 0` it resets to 0. The offset is applied with `gsap.set` on every scroll event. `pointerenter` on the header tweens `y → 0` (`gsap.to`, default 0.5s power1.out, `snap: 'y'`), and scroll-follow pauses during that tween. While any menu is open the bar is pinned at y 0. Scale listens to Lenis's scroll event; the clone listens to window `scroll`, which Lenis drives.

## Desktop dropdown

**Open and close:** hovering a trigger's wrapper opens that category right away, with no delay. Clicking toggles, but only closes once the open motion has settled. `mouseleave` on the bar (which contains the panel) closes it, and so does `mousedown` outside the header. While a menu is open the other triggers fade to `opacity .3` (200ms ease-out). Same-page link clicks and route changes reset everything.

**Structure:** `absolute top-full left-0 right-0 z-60`, desktop only.
- Backdrop: `absolute inset-0`, `--nav-dropdown-background`, `backdrop-blur-lg` (16px), `shadow 0 18px 60px -20px var(--nav-shadow)`. Its height is `calc(100% + barHeight)` and it's shifted `y: -barHeight`, so it also covers the bar.
- Content wrapper: `overflow-hidden`, clip-path animated, with padding-top 44 and padding-bottom 68.
- Grid inside: same 12-column desktop grid. Left column `md:col 1–3, xl:col 2–3`, right column `md:col 4–6, xl:col 4–5`, image `md:col 7–12 (pl 56/80/96 at md/lg/xl, pr 8), xl:col 6–12`, `min-h 192`, `rounded-xl`, `object-cover`, stretched to the row height.
- Resources replaces the image with 2 cards: flex-row gap 12, `md:py-6 pl 40/56/64 pr 8`. Each card: `p-3`, `gap-2`, `rounded-xl`, bg and border `--nav-card-background`, 16:9 image `rounded-lg`, title 14px/500 `line-clamp-2` underlined on hover.

**Type:**
- Sub-header: 14 / 20, +0.05em, `#737373`, pb 8.
- Link: 20 / 27.5 (1.375), −0.025em, padding-block 2. Links are spaced 35.5px apart (`gap-y-1`). Hover colour `#775893` (200ms).
- Groups: pb 12 (md).

**Image swap:** each link has its own image, and hovering or focusing a link swaps the panel image to it. The image resets to the first link's image when you switch category. The clone uses neutral SVG placeholders, and every link gets a different tone so the swap stays visible.

**Panel heights at 1440** (backdrop, including the 88px bar; Scale → clone): Products 488.5 → 489; Resources 492.2 → 492; Solutions → 392; Research → 418.

**Category order** (from `pages.ts`): Products (Data | Applications + Evaluation | image), Solutions (3 links | By Industry + 3 | image), Research (Research + 5 | — | image), Resources (Company + 4 | 5 links | 2 cards). Scale's sub-header labels are "Build AI / Apply AI / Evaluate AI / By Industry / Research / In Scale"; the clone uses the registry section names.

### Motion (verbatim from Scale's chunk)
| Event | Target | From → to | Duration / ease | Notes |
|---|---|---|---|---|
| open or switch category | backdrop | `scaleY 0 → 1` (origin top), `y: -barH` | 1s `expo.out`, delay .1 | Re-runs on every category switch, so the backdrop collapses and re-grows; this is the height change between menus |
| close | backdrop | `scaleY → 0` | .5s `expo.out` | |
| open | content wrapper | `clip-path inset(0 0 100% 0) → inset(0)` | .36s `power2.out` | |
| open | inner fill | `scaleY .001 → 1` | .36s `power2.out` | |
| open | `[data-menu-text-reveal]` items (sub-headers, links, image or cards, in `data-stagger-index` order) | `autoAlpha 0, y 10 → 1, 0` | .36s `power2.out`, stagger `.044×.7 = .0308` from start, starts at .08s (`-=0.28`) | |
| open / switch | `img` | `scale 1.4 → 1` | .8s `power3.out` | |
| switch | items | `autoAlpha 0, y 10 → 1, 0` | .34s `power2.out`, same stagger | Content swaps instantly |
| close | wrapper clip | `→ inset(0 0 100% 0)` | .24s `power2.out` | |
| close | items / content | `autoAlpha → 0` | .18s / .14s `power2.in` | |
| close | inner fill | `scaleY → .001` | .52s `power2.in` | Panel unmounts on complete |

## Mobile menu (<768)

This is a drill-down drawer, not an accordion.
- Burger → `aria-expanded`. Its background changes to `--nav-mobile-close-background` and the icon becomes an 18px ×.
- The header becomes `top-0 bottom-0 h-100dvh flex-col overflow-hidden`, and the bar background turns transparent.
- **Fill sheet:** `fixed inset-0 z-40 bg --nav-background`, `scaleY .001 → 1` .36s `power2.out` from the top. On close it goes back to `.001` over .52s `power2.in`, then the drawer unmounts.
- **Panel background:** `--nav-panel-background` (#f5f5f5), extended behind the bar (`calc(100% + 70px)`, `y -70`), `scaleY 0 → 1` 1s `expo.out` delay .1. On close it goes to 0 over .5s `expo.out`.
- **Category list:** `ul > li > button`, 32/34 type, py 16 (66px rows), chevron-right 20px in a 40px slot at opacity .6. Opening and returning to the list run `opacity 0, y 6 → 1, 0` .32s `power2.out` with a .048 stagger. Choosing a category fades the list to 0 over .18s `power2.in`; closing fades it over .22s.
- **Header "Get Started":** fades to opacity 0 over .26s `power3.out` (then `pointer-events-none`), and back over .26s `power3.in`.
- **CTA bar:** absolute at the bottom, px 24, pb `max(24px, safe-area)`. Inner `p-2 rounded-12` on `--nav-mobile-cta-wrapper-bg`. Two flex-1 buttons, h-48 r-6, 14px/600 type: "Log In" bordered (#c7c7c7 / #525252), "Get Started" black. It slides in `yPercent 100, opacity 0 → 0, 1` over .36s `power2.out` with a .25s delay, and slides back out over .36s on close.
- **Drill-down:** a 200%-wide track translates −50% (500ms `cubic-bezier(.32,.72,0,1)`). The logo row slides the same way over 300ms to a back chevron (18px, `p-2 -ml-1`). The category name is centred in the bar (16/22, weight 500, −0.01em).
- **Category view:** px 24, pt 8 + 8. Sub-headers pb 12. Links are 24/33 with chevrons, py 4. Groups have pb 24 and columns gap 24. Resources adds its 2 cards stacked with gap 16.
- Scroll areas carry `data-lenis-prevent` and `overscroll-contain`, with bottom padding `72px + max(24px, safe-area)`.

## Footer
- `<footer>`: black, white text. Flex column with gap 48 (128 from md). Padding-top 32 (160 from md), padding-bottom 24. 898.6px tall at 1440.
- Top grid: 8 columns on mobile and 12 from md, gap 8, px 24. Row gap 40 on mobile, 0 from lg; mb 32 on mobile.
  - Logo: 24×24, `absolute`, right 32 on mobile and in column 1 from md (Vahue circle in the clone).
  - Five columns, gap 16: full width on mobile; 3 columns wide at starts 2/5/8/2/5 on portrait tablet; 2 columns wide from lg, the first starting at column 2. That puts them at x 141 / 374 / 607 / 841 / 1074 at 1440 on both sites.
  - Heading: `detail-mono`, 13px / 1.2 uppercase, −0.01em, `#575757` (10px under 768). Rendered in Vahue `font-mono`.
  - Links: 14px, weight 600, line-height 1.5 (1.45 on mobile), `capitalize`, block w-fit. No hover state was observed.
- Statement: full width, 116px / 1 at md+ (40px / 1 on mobile), −0.01em. Two lines at 1440, four at 390.
- Bottom row: flex column on mobile, row with `justify-between items-center` from md, gap 48, px 24.
  - Socials: two 48×48 tiles (`p-4`, r-6, `#212121`) holding white 16px LinkedIn and X SVGs.
  - Right side, `text-right gap-2`, all in `detail-mono #575757`: "Manage your cookie preferences" (an underlined uppercase button), then a `flex-col-reverse md:flex-row gap-2` row with the copyright and underlined Terms / Privacy links.
- **Link mapping:** links that exist in the registry go to `clonePath(slug)`. Footer links not in the registry (Terms, Privacy, legal statement, Data Partnerships, Brand Guidelines, all Guides entries, socials) are `#`. Guide titles, the statement and copyright are placeholders marked `TODO: Vahue copy`.

## Motion verification (Playwright, 50 ms samples)
| t | Scale: bg scaleY / clip bottom / item #3 opacity / img scale | Clone |
|---|---|---|
| open +0.1s | .105 / 31.1% / 0 / 1.214 | .099 / 31.5% / 0 / 1.215 |
| open +0.25s | .552 / 6.3% / .33 / 1.113 | .549 / 6.4% / .32 / 1.114 |
| open +0.4s | .860 / 0 / .93 / 1.030 | .842 / 0 / .90 / 1.035 |
| switch +0.15s | .369 / – / .52 / 1.157 | .361 / – / .51 / 1.159 |
| close +0.05s | .503 / 50.4% / .98 | .503 / 50.4% / .98 |
| close +0.15s | .123 / 94.7% / .42 | .123 / 94.7% / .42 |

Mobile open on Scale: the fill's scaleY reads .456 / .689 / .844 / .936 / .982 at 50 ms steps, and the first `li` reaches opacity .50 → 1 by about 260ms. The clone uses the same tweens.

## QA
Screenshots are in `reference-snapshots/scale-clone/qa/shared/` as `{1440|390}-{scale|clone}-NN-*.jpg`:
- 1440: closed, each of the four menus, mid-open frame, scrolled (hidden), scrolled up (revealed), dark chrome, dark Products, footer.
- 390: closed, opening frame, open list, mid drill-down, Products, Resources, footer.

The clone was captured on `/scale-clone/` (the index page), because page bodies are still in progress. Scale was captured on `/data-engine`, with the homepage used for dark mode. No console errors were found on the clone.

## Remaining gaps
- Fonts: Vahue's display face is used for the chrome. Footer links at weight 600 render heavier than Aeonik's 600 on Scale. Mono labels use Vahue `font-mono`, not Aeonik Mono.
- The announcement bar now matches at 39.25px. The repo's Tailwind `leading-snug` is 1.25, not 1.375, so the clone uses `leading-[1.375]` explicitly. Page agents copying Scale's `leading-snug` should do the same.
- Theme switching is opt-in for each page (`data-nav-theme` or `setScaleNavTheme`). The header can't know Scale's per-page scroll flips by itself.
- Menu imagery is neutral placeholders. Scale has per-link photos and 2 live blog posts in Resources.
- Sub-header labels follow the registry: "Data / Applications / Evaluation" instead of Scale's "Build AI / Apply AI / Evaluate AI", and "Company" instead of "In Scale".
- The orientation-specific `oml:` (mobile landscape) variants are not replicated. They only cover tablet column starts in the footer and smaller mobile link type in landscape.
- The cookie-preferences button and Log In link are dead (`#`).
