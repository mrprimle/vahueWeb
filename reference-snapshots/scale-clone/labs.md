# labs.scale.com (home) clone spec

| | |
|---|---|
| Source | https://labs.scale.com/ (separate site, Next 16 + Tailwind v4) |
| Clone | `/scale-clone/labs/` |
| Page | `app/scale-clone/labs/page.tsx` |
| Components | `components/scale-clone/labs/` (`LabsHome.tsx`, `content.ts`) |
| Shared chrome | `components/scale-clone/labs-shared/` |
| Assets | `public/scale-clone/labs/`: logo SVG, Inkeep avatar PNG, 6 paper previews at 640 px, 1.1 MB in total. Fonts are in `labs-shared/fonts/` (Inter 344 KB, Geist Mono 70 KB) |
| Static snapshot | captured 2026-11-01: leaderboards, papers, blog posts and jobs live in `content.ts`, so there are no runtime API calls |

Stack, tokens and the library and param table are in [labs-stack.md](./labs-stack.md).

## Libraries (REA `analyze_web_bundle` `ev_4dd6a911bd9264d6…`)
- Next.js 16.3.6 (Turbopack), React, Tailwind v4, shadcn/Radix Dialog
- Lenis 1.3.21 (home only, lerp 0.1)
- framer-motion `ScrollReveal`
- @vgpu WebGPU hero grid, with a 2D-canvas fallback
- Inkeep search/chat (lazy), HubSpot newsletter form
- No GSAP, three, Keen, Embla or Rive
- The scale.com chunk sha256 check (1h0nvyhf5gbrf.js, 37xz28pjbnlx4.js) doesn't apply: labs serves none of those chunks

## Page structure (RSC)
`div.min-h-screen.bg-white.text-ink` contains:
- `UnifiedHeader`
- `main`, holding:
  - Hero `section` (WgslGridBg canvas, logo, h1, p)
  - four `ScrollReveal` (`$L16`) wrappers: `section` (leaderboards), `ResearchSection` (`$L1f`, papers), `BlogSection` (`$L20`) and `section` (jobs)
- `UnifiedFooter`

None of the `ScrollReveal` wrappers set a delay.

## Listener map (REA `inspect_web_event_listeners`)
| Target | Events | Source |
|---|---|---|
| hero `section` (canvas parent) | `pointermove` (passive), `pointerleave` | `10l5gu25zzpir.js:13:27952 / :28038` (WgslGridBg) — `ev_a09eea92f118…` |
| `[data-blog-carousel]` | `scroll` (passive) → prev/next disabled state | `10l5gu25zzpir.js:0:382` (BlogSection) — `ev_55bb590619a9…` |
| `window` | `resize` (blog state, grid fallback), Lenis `wheel` / `scroll` | `10l5gu25zzpir.js`, `2bejownx-dgf7.js`, `2ri_cj1i8zivb.js` |
| `document` | `keydown` ⌘/Ctrl+K → open search | `2bejownx-dgf7.js` module 595877 |
| paper rows | React `onMouseEnter` → active preview index | module 408028 |

## Sections (top → bottom; 1440 / 390 measured identical on both)
| # | Section | Geometry (top, height) 1440 · 390 | Notes |
|---|---|---|---|
| 0 | Header | 0, 57 · 0, 57 | sticky, h-14 + 1px hairline, `bg-white/70` blur 24px. Logo 140×19. Nav `[PAPERS] [BLOG] [LEADERBOARDS]` 12px tracking .025em `#525252`, plus a search button with mono `⌘K`. Below md: search + menu toggle and an in-flow menu panel |
| 1 | Hero | 57, 603 · 57, 417 | WebGPU living grid. Logo 834×115 (`max-w-[834px]`). h1 36/45 600 (lg), 30/45 (md), 24/36 (base). Body 14/25.2 `#525252`, max-w 640. Padding pt 16/24/32 · pb 16/24 · logo mb 20/28/36 |
| 2 | [LEADERBOARDS] | 660, 438 · 474, 438 | 5 rows `py-2.5`, first border `#d4d4d4`, rest `#e5e5e5`, `-mx-2 px-2`. Arrow 12px `#a3a3a3`. "View more" outline button `mt-5` |
| 3 | [PAPERS] | 1099, 611 · 912, 757 | md+ grid `100px / 1fr / 100px / 1fr / 28px` (Date mono, Title 14/21 500, Category, Authors, arrow). Mobile grid `70px / 1fr / 28px`. xl: a 280px square preview with the hovered paper's image (inset 24px) and its title below |
| 4 | [BLOG] | 1710, 323 · 1669, 343 | header with icon buttons 40×40 (`border-neutral-300`). Cards 280/320/340px, gap 24, snap-start. Optional category chip, mono date in ink-faint. Title 14/1.375 2-line clamp, intro 12/1.625 2-line clamp. A "View all / All posts" tail card 180px with `border-l` |
| 5 | [Jobs] | 2032, 531 · 2013, 777 | grid `100px / 1fr / 1fr / 24px` (md), `1fr / 24px` (mobile, location + date under the title). 6 rows open Greenhouse in a new tab. Arrow-down 14px. "View more" `mt-8` |
| 6 | Footer | 2563, 175 · 2790, 283 | newsletter row (title button + "Subscribe to newsletter" outline, both open the dialog), then copyright + Terms/Privacy (12px `#525252`) |

Page height: 2738 (1440) and 3073 (390) on both.

## Motion
| What | Trigger | Params | Clone |
|---|---|---|---|
| Section reveal | IO amount .06, once | opacity 0→1, y 14→0, 0.5s `cubic-bezier(.16,1,.3,1)` | `ScrollReveal.tsx` (IO + WAAPI). Sampled at 50, 150, 250, 400 and 700 ms: Scale .47/.87/.97/1/1, clone .36/.88/.96/1/1 |
| Hero grid | rAF, pointer | WGSL `grid-bg.wgsl`, radius 210, strength lerp .12, time s | `WgslGridBg.tsx`: same shader, same output frames (see `*-hero-mouse-*.jpg`) |
| Hero fallback | no WebGPU | 2D grid, 3.5% lit cells, 12 s reseed | `AnimatedGridBg.tsx` (`clone-hero-fallback-2d.jpg`) |
| Smooth scroll | wheel | Lenis lerp .1 | `LabsLenis.tsx`. Wheel 400 px gives identical scrollY samples |
| Hover colours | hover | 200ms ease-in-out (from the `html.loaded *` override) | `LabsLoaded.tsx`. Button bg at 100 ms is `rgba(17,17,17,.5)` on both |
| Preview swap / arrow nudges | hover | instant (the override kills the opacity/transform transitions) | same, verified as an instant switch on both |
| Dialog | click | instant, no animation | same |

## Interaction inventory
Method: REA (bundle `ev_4dd6a911…`, listeners above) and the chunk source for document/window and React handlers. Then Playwright with identical inputs on labs.scale.com and the clone (`--enable-unsafe-webgpu`, 1440×900 and 390×844). Scripts are in `scratchpad/labs-qa/`:
- `qa.js`: sweep + geometry
- `inter.js`: hover, reveal sampling, carousel, ⌘K, dialog, wheel
- `hov.js`: crossfade + hover timing
- `s2.js`: search results, validation, WebGPU fallback

QA images:
- `qa/labs/{scale,clone}-{1440,390}-sNN.jpg`, one every 50% viewport
- `qa/labs/interactions/{scale,clone}-*.jpg`

### 0 · Header
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| nav links | hover | CSS | module 595877 | bg `#f5f5f5`, colour `#525252`→`#111`, 200ms | yes (measured equal) | — |
| search button / ⌘K | click, `document` keydown Meta/Ctrl+K | `document.keydown` | 595877 | opens Inkeep modal | yes, static modal | `*-search-open.jpg` |
| search modal | type | Inkeep (debounce 300) | lazy 25n1aq7vxfxt3 | results list `[SECTION] / title / snippet`, "All (n)" pill, Ask AI row | partial: chrome matches; results come from a static index of the page's own items, and Ask AI chat isn't wired | `*-search-typed.jpg` |
| mobile toggle | click | React | 595877 | Menu ↔ X, in-flow panel `px-6 py-4 gap-3` | yes | `*-390-menu.jpg` |

### 1 · Hero
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| canvas | pointermove / pointerleave on section | `ev_a09eea92…` | 539120 WgslGridBg | spotlight Gaussian r 210, strength lerp .12, grid line +0.10 under the pointer | yes | `*-hero-mouse-300x300 / 700x450 / 1100x600 / left.jpg` |
| canvas | time | rAF | 539120 | simplex field drift `t*.06 / -.045`, breathe `sin(t*.6)` | yes (same frames) | same |

### 2 · [LEADERBOARDS]
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| rows | hover | CSS | page | bg `#fafafa` | yes | — |
| View more | hover | CSS | Button outline | bg ink, text white, 200ms | yes | — |
| section | scroll into view | IO | 953971 | reveal | yes | `*-1440-s01.jpg` |

### 3 · [PAPERS]
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| row (md+) | mouseenter | React | 408028 | sets preview index (no reset on leave). Preview swaps instantly | yes | `*-papers-hover-row4.jpg` |
| row | hover | CSS | 408028 | bg `#fafafa` | yes | — |

### 4 · [BLOG]
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| prev/next | click | React | 274580 | `scrollBy(±(firstCard.offsetWidth \|\| 300) + 24, smooth)`. Disabled when within 4 px of either end. 1440: 0→316 (max), prev disabled at 0 | yes (258 at 150 ms, 316 at 850 ms on both) | `*-blog-next.jpg` |
| strip | scroll / swipe / shift-wheel | `scroll` passive `ev_55bb…` | 274580 | native snap-x mandatory | yes | — |
| card title | hover | CSS | 274580 | underline offset 2, ink-faint decoration | yes | — |
| All posts arrow | hover | CSS | 274580 | `group-hover:translate-x-1` (instant, because of the override) | yes | — |

### 5 · [Jobs]
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| row | hover | CSS | page | bg `#fafafa`, arrow `translate-y-0.5` (labs uses the CSS `translate` property; the clone uses Tailwind 3 `transform`, so it looks the same) | yes | — |
| row | click | anchor | — | Greenhouse, new tab | yes | — |

### 6 · Footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| newsletter title / button | click | React | 627256 | opens Radix dialog (title "Subscribe to Scale Labs", `sm:max-w-lg`) | yes. Rect `464,276,512,348` vs Scale `464,276,512,349` | `*-newsletter-open.jpg` |
| dialog | Esc / overlay / X | Radix | 385368 | instant close, focus restored | yes | — |
| HubSpot form | submit | HubSpot | 385368 | email + country (252 options) + consent text, black "Submit →" | partial: validates (`reportValidity`), never posts | — |

## QA
- Section geometry and type metrics match exactly at 1440 and 390: 17 probes each, including page height 2738/3073. See `qa.js` output.
- Side-by-side screenshots match except for the Next dev indicator.
- Interactions sampled with identical inputs (`inter.js`, `hov.js`):

  | Check | Result |
  |---|---|
  | Reveal curve | matches |
  | Hero spotlight frames | match |
  | Paper preview swap | matches (instant) |
  | Blog scroll positions and disabled states | match |
  | Lenis wheel response | matches |
  | Hover colour timing | matches |
  | Dialog geometry | within 1 px |

- 0 console errors on the clone.
- The scale.com ScaleHeader, ScaleFooter and Lenis don't render on `/scale-clone/labs/` (CloneChrome `OWN_CHROME`).

Fixes made during QA:
1. The Vahue global `* { scroll-behavior: smooth }` turned `window.scrollTo` into a native smooth scroll, which delayed reveals by about 450 ms. Fixed with `html:has(.root) { scroll-behavior: auto }`.
2. Removed the dialog enter/exit animation, which labs doesn't actually have.
3. Added the `html.loaded *` 200 ms transition override (LabsLoaded): labs' hover easing and instant opacity/transform switches come from it.
4. HubSpot inputs set to 45 px, 14 px and a `#d9d9d9` border; consent text set to `#737373`.

## Remaining gaps
- Search is a static stand-in for Inkeep:
  - same modal chrome, but results come from the page's own 17 items, not Inkeep's index
  - "Ask AI" opens the chat-mode toggle but doesn't run a chat
- The newsletter form doesn't submit to HubSpot (by design).
- Hero WebGPU uses the raw WebGPU API, not Scale's private `@vgpu` runtime. The shader is verbatim and the vertex stage is our own fullscreen triangle; output frames are visually identical.
- Lenis version: the repo has 1.3.26, labs 1.3.21. Measured wheel response is identical.
- Paper preview images are Sanity PNGs served at 640 px; labs uses `next/image` up to 3840.
- Detail links (papers, posts, leaderboards) go to the live labs.scale.com. `/papers`, `/blog`, `/leaderboard` and `/jobs` link to the upcoming `/scale-clone/labs-*` clones.

## REA evidence
| Evidence | What |
|---|---|
| `ev_4dd6a911bd9264d624a2ebe7ddf405798fcd475fe6efcec1a3e626989d42465d` | `analyze_web_bundle` (30 scripts) |
| `ev_a09eea92f1180b7e18d0cf5633ac2476cacb5e40fc14648bdb60034e72c3b5e6` | hero `section` listeners |
| `ev_55bb590619a9f9e1148fb7bc1524898d7c79b8467ffe16e06e83b7788d18d163` | `[data-blog-carousel]` listeners |
