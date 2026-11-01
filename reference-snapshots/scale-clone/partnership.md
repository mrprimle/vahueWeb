# scale.com/partnership clone spec

Route: `/scale-clone/partnership/` · Page: `app/scale-clone/partnership/page.tsx` · Components: `components/scale-clone/partnership/` · Assets: none · QA: `reference-snapshots/scale-clone/qa/partnership/`

Captured 2026-11-01 at 1440×900 and 390×844: server HTML, production chunks + CSS fetched locally, REA on an isolated tab in the shared CDP 9230 Chrome (closed afterwards), then Playwright on both sites with identical inputs.

Clone only: no Vahue page is built from it. The layout still takes content as a prop: `PartnershipPage({ content, theme })` renders from a `PartnershipContent` object, and Scale's copy is in `scalePartnershipContent` (`content.ts`). Colours read `--pts-*` variables: `--pts-bg`, `--pts-fg`, `--pts-muted` (gray-30 `#575757`), `--pts-tile`, `--pts-card-fg`. The card colours are `content.cardColors`.

## Libraries (REA `analyze_web_bundle`, evidence `ev_4c0584b40847…`)
- 47 scripts parsed, 0 failures. Next.js (high, Turbopack), React (medium).
- The page loads the site-wide stack (GSAP 3.15 `2d7ykwtxp_8ed.js`, Lenis 1.3.21 `2fbrdg5m4_g_8.js`, three r181 `3kd41k7ews14b.js`). **The page's own content uses none of it.** It has no ScrollTrigger, no AnimatedText, no canvas and no Rive. Lenis smooth scroll is the only motion, and the clone layout's `SmoothScroll` provides it.
- **Shared-chunk check (sha256).**
  - Same as the earlier audits: `1h0nvyhf5gbrf.js` `10b2627a…` and `37xz28pjbnlx4.js` `b234eef5…`.
  - Same as the about audit: `0sni47mcvnqwg.js` `0e137e33…` (slice renderer), `2fbrdg5m4_g_8.js` `c8dcfe22…` (Lenis), `2k1qlgdxlbmz1.js` `bb51ad26…` and `3x8z3_0hhtdcb.js` `89a4cc62…`.
  - So no FlatCta, focus-outline or intro-trigger code applies: the page renders no FlatCta, CMSLink or AnimatedText.
- **Source modules read.**
  - `PartnershipList` (in the slice map of `0sni47mcvnqwg.js`, props `title, description, items, hrefBase="/partnership", hrefSuffix=""`).
  - Card `em` (same chunk): `eu = ["#839CB2","#A8927C"]`, `ed` = lg basis by row size, and next/link `522016`.
  - TextLink `890803` (`058pnujclak3f.js`): theme `inherit`, dir `right`, size `small`. It has no href, so it renders a `span aria-disabled`.

## Page structure (server HTML, `.CMSSliceRenderer.rootPageRenderer`)
`html[data-theme=light]` → shared header (light, announcement bar) → one `PartnershipList` slice, which renders two sections → footer.
1. `section.PartnershipList py-20 md:py-[120px]` > container `mx-auto max-w-[1472px] ps-6 pe-6` > `flex flex-col gap-8 md:flex-row md:gap-10`.
   - It holds `h1.header2 text-balance text-black md:flex-1` "Scale Partners" and `p.body1 text-pretty text-scale-gray-30 md:w-[480px]`.
2. `section.pb-20` > container > `flex flex-col gap-2 md:flex-row md:flex-wrap`, with one next/link card per item. The empty state "No partnerships found." is ported.
   - Row sizing (ported as `rowSizes`): rows = ceil(n/3), the n items are spread evenly, and each card gets `lg:basis-full` / `[(100%-.5rem)/2]` / `[(100%-1rem)/3]` for its row size. For 2 items that is 2 per row.
   - Card: `a.flex h-[486px] flex-col gap-[82px] rounded-2xl p-10 md:grow md:basis-[calc((100%-0.5rem)/2)]`, inline `background-color` cycled from `eu`.
     - Logo tile: 86px, `rounded-lg bg-black`, with a 55×36 logo box (`[filter:brightness(0)_invert(1)]` when `logo.mono`).
     - Text block: `flex-1 flex-col gap-8` with `h3.header4-regular text-black`, then `flex-col gap-8` holding `p.body2-regular text-black/60 line-clamp-2` and the TextLink.

## Sections (top / height, 1440 · 390)
| # | Block | 1440 | 390 | Type |
|---|---|---|---|---|
| 1 | PartnershipList header | 39.3 / 360 (pad 120) | 101.8 / 318.3 (pad 80) | h1 header2 64/67.2 −0.64px at x24, w872 (32/33.6, w342). Lede body1 20/30 −0.2px `#575757` at x936, w480 (16/23.2, w342, 4 lines at 390) |
| 2 | Card list | 399.3 / 566 | 420.1 / 1060 | Two cards, 692×486 at x24 / x724 (342×486 stacked, gap 8). Card 1 `#839CB2`, card 2 `#A8927C`, radius 16. Tile 86 at +40/+40, radius 8. h3 32/48 −0.96px at +208 (24/25.2 −0.72px). Body 16/24 black/60 at +288 (14/18.9, 2 lines at 390). TextLink 14/21 at +344 (+335), full content width (612 / 262) |
| — | Footer | 965.3 | 1480.1 | shared `ScaleFooter` |

Document height: 1864 on both at 1440; 2840 (Scale) vs 2800 (clone) at 390, from the shared footer (1360 vs 1320, a known gap).

## Motion
None on the page's own content: no ScrollTrigger, reveal or scrub. The only transitions are CSS on the TextLink:

| Element | Trigger | From → To | Ease / dur |
|---|---|---|---|
| TextLink span | `:hover` on the span (it is its own `group`) | opacity 1 → .7, instant (opacity isn't in Tailwind's `transition-colors` list) | — |
| Arrow `→` | `group-hover` (the span) | `translate` 0 → 4px (`translate-x-1`) | `transition-transform` 300ms cubic-bezier(0,0,.2,1) |

Reduced motion: the clone drops these transitions (on Scale the TextLink has no `motion-reduce` variant, so it still animates, but the change is 4px).

## Interaction inventory
Method: REA listeners (evidence below), then Playwright `scratchpad/partnership/qa.js` with the same inputs on both sites: a sweep every 50% viewport, the mouse on 3 card points (centre, top-left, bottom-right), entering the TextLink and sampling every 50ms for 400ms, leaving it and sampling the same way, a far-right point on the link row, and Tab to the first card. Raw numbers are in `qa-{scale,clone}-{1440,390}.json`.

### 1 · PartnershipList header
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `section.PartnershipList`, h1, p | any | none (`ev_1d0cad7767aa…`) | SSR | static, no reveal | yes | `1440-00.jpg`, `390-00.jpg` |

### 2 · Partner cards
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| card `a` | hover (centre / corners) | HubSpot `mousedown` (capture) + Next Link `click` (`42ixmvih7808g.js`), `ev_6d964625c207…` | `em` + next/link 522016 | no hover style: bg, opacity and transform unchanged; cursor pointer, on both | yes | `interactions/*-hover-card.jpg` |
| card `a` | keyboard focus | UA | next/link (no focus classes) | `rgb(0,95,204) auto 1px`, offset 1px, on both | yes (**fixed**: the clone first had offset 2px from the app's globals; now set to 1px) | `interactions/*-focus.jpg` |
| card `a` | click | Next Link | — | Scale `/partnership/<slug>`; the clone goes to `https://scale.com/partnership/<slug>` (no detail clones) | partial (destination) | — |
| TextLink span | pointer enter | none on the node (`ev_ff24111048d8…`), CSS only | 890803 | opacity .7 at once. Arrow `translate` at 0/50/100/150/200/250/300ms: Scale 0 / 1.766 / 2.741 / 3.357–3.506 / 3.821 / 3.973 / 4px vs clone 0 / 1.765 / 2.741 / 3.356 / 3.821 / 3.973 / 4px (1440 and 390) | yes | `interactions/*-hover-link.jpg` |
| TextLink span | pointer leave | — | 890803 | opacity back to 1 at once. Arrow 4 / 2.234 / 1.260 / .643 / .179 / .027 / 0 on both | yes | — |
| TextLink span | pointer far right on the row | — | 890803 | the span stretches to the full content width (flex-col child, no `w-fit`), so the hover fires 60px from the card's right edge on both | yes (**fixed**: the first build had `width: fit-content`, which shrank the target to 87px) | — |
| logo tile, h3, body | hover | none | — | static | yes | — |

### Window / document
Lenis `wheel`/`touch*` on window (site-wide, `2fbrdg5m4_g_8.js`). The clone uses the shared `SmoothScroll`. The header theme stays light for the whole page (`data-theme="light"`, no dark sections).

## QA
- Side by side (Scale left), every 50% viewport: `qa/partnership/1440-00..04.jpg` and `390-00..06.jpg`.
- Interactions: `qa/partnership/interactions/{1440,390}-{hover-card,hover-link,focus}.jpg`.
- **1440.** Every measured box matches to 0.1px: section 39.3/360, h1 24,159.3 872×120, lede 936,159.3 480×120, list 399.3/566, cards 24/724 × 692×486, tile, logo box, h3 607.3 612×48, body 687.3 612×24, link 743.3 612×21, footer 965.3.
- **390.** Every measured box matches through the cards: h1 181.8 342×33.6, lede 247.3 342×92.8, cards 420.1 / 914.1, h3 628.1, body 685.3 (2 lines), link 755.1. Only the footer differs (shared gap).
- The clone returns 200 on the dev server with no console errors. Scale logs 401/404 and OptinMonster noise.

## Remaining gaps
- **Partner logos.** The Google Cloud PNG and NVIDIA SVG (third-party marks) aren't shipped. A neutral `bg-white/20` block fills the exact 55×36 box in the black 86px tile. Pass `logo.src` to show a real mark (the `mono` filter is wired).
- **Card destinations.** Cards link to Scale's detail pages, since the `/partnership/<slug>` pages aren't cloned.
- **Fonts.** Vahue faces stand in for Aeonik. Text box sizes match because the metrics are close, but glyph shapes differ. The `→` uses system-ui (12.5px wide vs Aeonik's 9.2px), so "Learn more" plus the arrow is 3px wider.
- **Shared footer.** At 390 it is 40px shorter than Scale's (known, shared chrome).
- **Announcement bar.** It carries the shared placeholder copy.

## REA evidence
- `analyze_web_bundle` `ev_4c0584b40847029acb08d54b1a2f311c1f2477930456c8acbce9979096e61515` (47 scripts, 0 failures).
- `inspect_web_event_listeners`:
  - `section.PartnershipList` `ev_1d0cad7767aad0e4…`: none.
  - `main a[href^="/partnership/"]` `ev_6d964625c207ac49…`: `mousedown` capture (HubSpot `js.hs-analytics.net`) and `click` (`42ixmvih7808g.js` col 20015, the Next Link router).
  - `main a[href^="/partnership/"] span.group` `ev_ff24111048d83e6f…`: none.
- Scale CSS checked: `.header2`, `.body1`, `.header4-regular`, `.body2-regular` (+ max-width 767px variants), `.text-scale-gray-30`, `.line-clamp-2`, `.font-unicode`, and the `aeonik Fallback` @font-face.
