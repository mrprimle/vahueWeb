# scale.com/enterprise/healthcare → /scale-clone/enterprise-healthcare

Route: `/scale-clone/enterprise-healthcare/` · Page: `app/scale-clone/enterprise-healthcare/page.tsx` · Components: `components/scale-clone/enterprise-healthcare/` · Assets: `public/scale-clone/enterprise-healthcare/` · QA: `reference-snapshots/scale-clone/qa/enterprise-healthcare/`

Captured 2026-10-31 at 1440×900 and 390×844: Playwright + system Chrome (50%-viewport sweep at 1440, 100% at 390, then computed-style probes and scroll-position motion samples), and REA against an isolated Chrome tab (CDP 9230). Copy is Scale's own text (from the page's RSC payload and the mockup modules), so the line breaks line up in QA.

## Reusable page component
`HealthcarePage({ content, as? })` (`HealthcarePage.tsx`; `as="div"` when the site layout already has a `<main>`) renders the whole slice stack from a `HealthcareContent` object (`content.tsx`):

- `hero`: headline, body, image/imageBg/media, optional CTA, "Trusted by" logo slots (`logos.names` writes text in the slots), `as: 'h1'` for a page heading
- `tabs`: heading plus items `{ label, color, title, body, cta, mockup: ReactNode }`. The mockup is remounted on each tab switch, so its intro replays.
- `testimonial`: color/contrast theme, quote, metric value/label, name, title, optional logo node
- `stack`: heading, `media` node, cards
- `blog`: heading, category label, three tiles `{ title, image | fill, video, href }`
- `trust`: headline, body, badges `{ alt, src?, label? }` (`label` renders a text tile in the cell)
- `prefooter`: headline, image/imageBg/media, CTA

`scaleHealthcareContent` is Scale's copy. A Vahue industry page can pass its own content, with its own mockup nodes and a dot-texture or three.js `media` node in place of the photos, and keep every layout and motion parameter. First user: `/industries/healthcare-life-sciences` (`components/industry/enterprise-healthcare/`, Scale's colours, strict parity, QA in `qa/vahue-healthcare/`). Every section component also takes plain props, so a Vahue copy can restyle them one at a time.

## REA evidence
- `analyze_web_bundle` (include_script_sources, evidence `ev_cf7d369b5e60fa7968b981c6441975bf9cc3b962ab852c8ce54484656084f6d4`): 47 scripts parsed, 0 failures, 692,476 AST nodes.
  - Fingerprints: Next.js (high; `next-runtime`; Turbopack chunk `turbopack-1byz1flvc-bu1.js`) and React (medium).
  - Routes it found: `/static/img/reskin/prefooter-default.jpg` (the FullBleedMediaSection fallback) and `/static/images/components/side-by-side/media-placeholder.svg`.
  - three.js r181 (`3kd41k7ews14b.js`) loads site-wide, but no canvas mounts on this page. The pageHero's MeshGlobe branch only runs when `media[0]._type === "meshGlobe"`; here it is an image.
- Chunks fetched and grepped:
  - `0sni47mcvnqwg.js`:
    - slice registry
    - TabbedPanel 591798
    - OrderGuidanceMockup 453596, SchedulingEngineMockup 218184, CustomAgentsMockup 69472
    - SgpStack 290276
    - HealthcareLeadingSystemsIllustration 892353
    - mockup → static image map (`/static/images/pages/enterprise/healthcare/*-dashboard.webp`)
  - `37xz28pjbnlx4.js`:
    - pageHero 478135 (renders FullBleedMediaSection with `startPercentage: 0` inside `pb-10! pt-24!`)
    - FullBleedMediaSection 540431
    - LogoMarquee 880750
    - AnimatedFlatCta 961870
  - `3x8z3_0hhtdcb.js`: ClientTestimonials 685963 (metrics variant) and BlogPreview 808358.
  - `1h0nvyhf5gbrf.js`: AnimatedText 668761 (SplitText, line masks with 0.12em descender compensation) and FlatCta.
  - `2qomgocduultg.js`: react-icons module 473665. Mockup icons were mapped export by export to the Material Design paths in `icons.tsx`.
  - `2d7ykwtxp_8ed.js`: GSAP `3.15.0`.
- Slice data: read from the RSC payload (`self.__next_f`).
  - Order: `pageHero` → `tabbedPanel` → `clientTestimonialsWithMetrics` (colorTheme Cloud Slate #839CB2 / contrast #010101, `pinOnExit: false`) → `sgpStack` (theme light, headingPosition above, mediaPosition left, cardAccent false) → `blogPreview` (pageThemeOverride light, category override "Healthcare") → TextImageSplit → spacer `h-8` → `fullBleedMediaSection` (headlineWidth narrow, default startPercentage 10, overlayVariant default "flat") → spacer `h-8`.
  - Hero `overlayVariant: "gradient"`.
  - Unlike the shared FullBleedMediaSection, `.media-overlay{background:linear-gradient(#0000 0%,#000 100%)}` is an unlayered shorthand. It beats the layered `bg-black/45`, so flat and gradient render the same (measured `rgba(0,0,0,0)` background-color on both overlays).

### Listener map (`inspect_web_event_listeners`)
| Element | Listeners | Source |
|---|---|---|
| `.TabbedPanel button` (tab) | `mousedown`, `click` | HubSpot analytics `…4823527.js`; React (`42ixmvih7808g.js`) → `setActive(i)` |
| `.TabbedPanel a[href="/demo"]` ("Book a Demo") | `mousedown` only | HubSpot. A plain `<a>`; the hover is CSS `hover:opacity-70 transition-opacity` |
| `.ClientTestimonials button[role=tab]` | `mousedown`, `click` | HubSpot + React (one testimonial, so the click is a no-op) |
| `.FullBleedMediaSection a.FlatCta` | `mousedown`, `click` | HubSpot + Next Link router |
| `.BlogPreview button` (video tile) | `mousedown`, `click` | HubSpot + React → opens the video dialog |
| `.SgpStack` | none | ScrollTrigger-driven (window scroll via Lenis) |

There are no pointermove or drag handlers on this page. FlatCta hover runs through React's delegated pointer events → CSS transitions.

## Sections (top → bottom, 1440 / 390)
| # | Section | Layout | Type / details |
|---|---|---|---|
| 1 | pageHero → FullBleedMediaSection | Wrapper `pt-24 pb-10`. Card 1408×720 (358×480), radius 24, `p-16` (`p-8`), content bottom-left, max-w 72rem, gap 24. Section top at 135 (198 at 390). | h2 `clamp(2rem,.5rem+5vw,4rem)`/1.05, −0.01em, white, balance. body1 20/1.5 (16/1.45). Empty CTA row still renders (24px gap). "Trusted By" row `mt-4 max-w-md`: 6px triangle + 10px uppercase `tracking-wider` #929292; LogoMarquee `opacity-40`, gap 32, row duplicated, 70×28 logo bounds. Image bg #537B95, `hero.webp` 1920×1080. |
| 2 | TabbedPanel | `pt-20 pb-10`, `grid-layout` px 24; column gap 64 | HeadlineWithCta h3 header3-regular 40/1.25 (24/1.05) centred. Tab bar: `border #f2f2f2 rounded-lg gap-1 overflow-x-auto no-scrollbar`; buttons `min-h-10 px-5 body2-regular font-medium` with a 9px swatch (#273252 / #839CB2 / #A8927C); active `bg #f2f2f2`, inactive label opacity .5. Panel `bg #eaeaea rounded-2xl lg:flex-row`: text column `lg:w-1/2 p-16 (p-8) gap-10` (title header3-regular #212121; body 16/24; "Book a Demo" body1 + 20px arrow, hover opacity .7); media column `lg:w-1/2 p-8 lg:pr-0`, frame `aspect-[4/3] lg:aspect-square rounded-lg lg:rounded-r-none`. Height 1076 (937). |
| 3 | ClientTestimonials (metrics) | `pt-20 pb-16 md:pb-20`; backdrop #839CB2 rounded-2xl; `lg:grid-inner-12` with rows `auto 1fr auto` | Logo tab 109² (`max-w-[152px] p-4`, 1px #010101 border, black fill layer); 1px divider col 6 at 30% opacity. Quote `header4-regular tracking-tighter` 32/40 (24/28), −0.05em, cols 6–10. Metric `header1` 120/1 (64) −0.05em; label header5 24/36 (22/1.05) `max-w-80`. Name 18/1.25 medium. Title tag: mono 10px uppercase, `bg-black` pill, colour #839CB2, 6px triangle. Mobile: the logo tab drops to the bottom row (`max-w-[80px] p-3`). Height 738 (994). |
| 4 | SgpStack (light, heading above, media left) | `pt-0 pb-7`, `lg:px-0`; header `mb-10 md:mb-6` max-w 960 | h3 header3-regular #212121. Inner `py-5 pb-7 md:p-10 lg:pb-10`. Media absolute `lg:left-[4%] lg:w-1/2`, illustration `max-w-[685px]` (736×691 stage scaled to width; three float layers). Cards `lg:col-start-18 col-span-7` (24-col double grid), gap 8: white, `rounded-xl p-8 min-h-[211px] justify-between`, title header2b 21/1, body body3 14/1.5 #575757. Backdrop #f2f2f2 rounded-2xl. Height 839 (1150). |
| 5 | BlogPreview (light, 3 tiles) | `py-12 md:py-16`; `md:col-start-2 col-span-10`; heading `mb-8 md:mb-20` | Heading 64/1.05 (32) centred, balance. Desktop grid 4 cols, gap 8, `grid-auto-rows minmax(70px,auto)`. Areas: titleOnly `1/1/5/3`, overlay `1/3/6/5`, caption `5/1/7/3`. Under 1024 a single column with row-gap 16, and every tile uses the caption layout (`#f2f2f2 p-4`, image `aspect-[16/10] rounded-xl`, title 16/22 medium). Category chip: 26px swatch (#C4B8D4 / #1D4133 / #5A6B85) + 11px mono "HEALTHCARE". Video tiles: 56px play button `bg-black/55 backdrop-blur-sm`. Height 970 (1049). |
| 6 | TextImageSplit | `py-20 bg-gray-50 (#f9fafb)`, max-w 1472 `ps-6 pe-6`, `md:flex-row gap-16 (gap-10)` | HeadlineWithCta (left): h3 header2 `clamp(2rem,.5rem+5vw,4rem)`; subtitle `clamp(.875rem,.5rem+1.2vw,1rem)`. Badge grid 4×2, gap 16 (12), width `clamp(320px,38vw,580px)`, cells `aspect-square p-[12%]`, images `grayscale opacity-35`. Height 426 (552). |
| 7 | Spacer `h-8` + pre-footer FullBleedMediaSection + spacer `h-8` | Same card as the hero; headline `max-w-[620px]` (narrow); white "arrow" FlatCta (radius 8, 40px tall, 32px black icon box, label capitalised by Scale's `.cta` class) | Image bg #6A7C96, `prefooter.webp` (2400w, from the 4096×2097 original). Section top 4976 (5432). |
| — | Footer | shared `ScaleFooter` | |

### Tab mockups (plain React state + CSS transitions; no GSAP on scale.com)
- **Order Guidance**
  - Starts when 30% visible (IntersectionObserver 0.3): step = 0, then +1 every 450ms up to 10.
  - Steps 1–5 tick the five source chips: the chip turns `border-[#193A29]/30 bg-[#193A29]/5`, the check icon replaces the source icon, colours 400ms.
  - Steps 6–10 fade in the referral fields: `translate-y-1 opacity-0` → 0/1, 500ms ease-out.
  - Holds 3200ms, then loops. Stops when out of view.
- **Scheduling Engine**
  - Every 4s while 30% visible: the recommendation and the trace step fade out (300ms, `-translate-y-1`).
  - 220ms later the next of three recommendations fades in.
  - The calendar column highlights the matching day (`bg #f2f2f2`, 500ms) and slot (`#193A29` fill + thumb icon).
- **Custom Agents**
  - Two stacked windows. On first 30% visibility they run 700ms ease-out from `translate-y-2` and `translate-y-4` (the second has `delay-150`) and opacity 0.
  - The Oncology window carries the full Scale content: KPI tiles, a six-row table, the verbatim/normalised/obligation/loop-check panel and the "How the loop was reconstructed" trace. Most of it is clipped by the frame, as on Scale.

## Motion
| Element | Trigger | start → end | From → to | Ease / duration | Notes |
|---|---|---|---|---|---|
| Hero clip | wrapper | — | `inset(0%)` (startPercentage 0) | — | no clip animation |
| Hero / pre-footer media | section | top bottom → center center | scale 1.25 → 1 | linear map, `gsap.set` per update | measured at scrollY 0: hero 1.0139 (1440) / 1.006 (390) on both |
| Pre-footer clip | wrapper (ClipScrollSection) | top bottom → center center | `inset(5% round 1.5rem)` → `inset(0%)` (startPercentage 10, ×0.5) | linear | samples below |
| FullBleedMedia h2 / body | section | top center, once, retroactive | AnimatedText intro: lines yPercent 400 / words x 30%, opacity 0, colour #72CE7B → #79648C → final | lines 1s power3.out, +0.08s each; words stagger 0.03 | body delay 0.2 |
| Pre-footer CTA "filledWhiteArrow" | section | same | scaleX 0 → 1, radius 0 → 8, autoAlpha; counter scaleX +0.1s; arrow x −6 → 0 | 0.85s power3.out, delay 0.5 | |
| Logo marquee | CSS | — | translateX 0 → −50% | 40s linear infinite | `motion-reduce:animate-none` |
| TabbedPanel heading | IntersectionObserver rootMargin −15% bottom | once | AnimatedText intro | delay 0.5 | HeadlineWithCta |
| Tab switch | click | — | panel re-renders, mockup remounts | none | no auto-advance |
| Testimonial backdrop | inner wrapper | top bottom → bottom 75% | width 90% → 100% | 1.15s power3.out, scrubbed | 1253 → 1392px (1440); 329 → 366 (390) |
| Testimonial activate | section | top 80% | logo fill y 100% → 0 (mobile x); quote flip delay 0.35; name 0.5; metric value/label at 350/450ms | flip: lines rotationX −90 → 0, yPercent 108 → 0, perspective 900, origin 50% 100%, 0.48s power2.out, stagger 0.05 | title tag `animateToText`: width → 20px (0.5s power3.out, delay 0.05), set text, opacity 1, width → text + 26px. Line masks keep the 0.12em descender padding (44px line pitch at 40px leading) |
| SgpStack backdrop | section | top bottom → bottom 75% | scale 0.98 → 1, origin center top | 1.15s power3.out, scrubbed | samples: 0.9913 / 0.9993 / 1 on both |
| SgpStack cards | each card | top 85% | title AnimatedText + body "fade" variant | delay 0.25 × cardIndex (index never passed → 0) | onLeaveBack: animateOut; section "top center" onLeaveBack: every card out, delay 0.1i |
| Illustration layers | stage | top 80% → bottom 20% | y 0 → −6, yoyo, repeat −1 | sine.inOut, 3.25 / 4.25 / 3.5s, delays 4 / 2.5 / 0 | play on enter/enterBack, pause on leave |
| BlogPreview heading | heading | top 80%, once | AnimatedText intro | delay 0.05 | |
| Blog tile entrance | IntersectionObserver 0.12, rootMargin −6% bottom | once | opacity 0 / y 16 → 1 / 0 | 0.6s cubic-bezier(.23,1,.32,1), delay 0.05 × min(i,3) | title AnimatedText delay 0.05 |
| Blog tile image | tile | top bottom → center center | scale 1.08 → 1 | scrubbed | 1.0571 vs 1.057 at scroll 3048 (1440); 1.0414 vs 1.0416 (390) |
| Play button | hover | — | scale 1.1, bg black/55 → /70 | 300ms | click opens the dialog (Esc / overlay closes) |
| TextImageSplit headline / subtitle | IntersectionObserver −15% | once | AnimatedText | delays 0.5 / 1 | |
| FlatCta hover | pointer | — | fill slides in, chevron track −50% → 0 | 600ms cubic-bezier(0,0,.2,1) | Scale's state machine (see Interaction inventory): strip snaps back on leave, 680ms reset, re-entry snap |

**Pre-footer samples (1440)**, identical on Scale and the clone:

| scrollY | Media scale | Clip |
|---|---|---|
| 4036 | 1.25 | `inset(5%)` |
| 4226 | 1.2037 | `inset(4.07407%)` |
| 4426 | 1.142 | `inset(2.83951%)` |
| 4886 | 1 | `inset(0%)` |

At 390 they also match exactly: 1.1934 / `inset(3.86707%)` at 4738, and 1.1178 / `inset(2.3565%)` at 4938.

`useRefreshOnPageGrow` (`lib/useRefreshOnPageGrow.ts`) is called from FullBleedMedia. Any growth in document height (lazy images, tab mockups, fonts) re-measures every ScrollTrigger after a 150ms debounce, so the pre-footer trigger isn't late.

**Reduced motion:** text starts visible, there is no clip or scale scrub, the testimonial backdrop is full width, the mockups show their final state, and the marquee and CSS transitions are off. Checked: 200, no hidden text, pre-footer `inset(0%)`, no console errors.


## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab (closed afterwards). `analyze_web_bundle` `ev_3d27a97f1474…` parsed 47/47 scripts with 0 failures. Every page chunk is byte-identical to the build capture and to the genai-portfolio / enterprise-insurance audits (sha256): slices `0sni47mcvnqwg.js` `0e137e33…`, ClientTestimonials/BlogPreview `3x8z3_0hhtdcb.js` `89a4cc62…`, FlatCta/AnimatedText `1h0nvyhf5gbrf.js` `10b2627a…`, FullBleed/ClipScroll/useScrollTrigger/LogoMarquee `37xz28pjbnlx4.js` `b234eef5…`, HeadlineWithCta `2k1qlgdxlbmz1.js` `bb51ad26…`. So the shared FlatCta, FullBleed intro and testimonial findings carry over, and their fixes were ported.

`inspect_web_event_listeners` ran on every section root and on its interactive children. The ids are listed per row below. Then Playwright ran identical inputs on scale.com, the clone and `/industries/healthcare-life-sciences`, using the script `scratchpad/hc-audit/qa.js` at 1440×900 (the tab bar and the testimonial click also at 390×844). The inputs were:
- tabs: 9s idle, then hover, click and keyboard (Tab / Enter / ←); each mockup's state was sampled every 250ms for 10s
- the Book a Demo hover
- the testimonial: activation sampled every 100ms, a tab click (scrollY every 100ms), and focus
- the stack: illustration float sampled every 250ms for 7s, cards on leave-back and re-enter, and a mouse grid
- the blog: tile hover, play hover, and the dialog (focus, Tab, Esc, overlay click, wheel)
- marquee speed over 2s and a hero mouse grid
- the pre-footer CTA: enter, leave, re-enter and focus

QA images: `qa/enterprise-healthcare/interactions/<name>-{scale,clone,vahue}.jpg`.

Page-wide listeners:
- `html` (`ev_4a36b68a6eb33…`): the ScrollTrigger `scroll` (passive) plus OneTrust `keydown`/`click`.
- React handles every click at the root (`42ixmvih7808g.js`), and HubSpot adds a `mousedown` to each button and link (`4823527.js`).
- The section roots `.TabbedPanel` (`ev_83221166c0ce…`) and `.SgpStack` (`ev_cb799ac2997…`) have **no listeners**.
- The mouse grids (hero, stack) changed no transform on any of the three pages.

### 1 · pageHero (FullBleedMediaSection + LogoMarquee)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| media / clip | scroll | ScrollTrigger via `html` | 540431 | scale 1.25 → 1 `top bottom` → `center center` (build QA) | yes | — |
| headline / body | mount / `top center` | useScrollTrigger | 540431 + 210104 | **Fixed**: end `bottom 20%` + retroactiveOnEnter on every refresh (was `once` + `progress > 0`), as in the insurance audit | yes | — |
| LogoMarquee | mount | — | 880750 `startMarquee()` on mount (no hideUntilAnimate) | `animate-logo-marquee` 40s linear, 0 → −50%: 17.6 px/s on Scale and on the clone (Vahue 21.2 px/s: its text row is wider, with the same 40s) | yes | — |

### 2 · TabbedPanel
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tab buttons | click | React `click` + HubSpot `mousedown` (`ev_6efae27900374…`) | 591798 `onClick: n && f(r)` | `useState` swap and no auto-advance (same title after 9s idle on all three). Background `transition-colors` 150ms cubic-bezier(.4,0,.2,1): Scale .82/.17/.03 → 0, clone .55/.17/.01 → 0 (same 150ms, different first sample) | yes | `tabs-tab1-*`, `tabs-tab2-*` |
| tab buttons | hover | — | no hover classes | no change on hover; cursor pointer | yes | — |
| tab buttons | keyboard | native `<button>` | — | Tab moves focus, Enter switches, ← does nothing (no roving tabindex) on all three. The focus ring is the UA `auto 1px`. On Scale, Tailwind 4's `transition-colors` also animates `outline-color`, so the ring fades in from currentColor over 150ms; the clone (Tailwind 3) shows it at once | yes (ring fade: no) | — |
| "Book a Demo" link | hover | HubSpot `mousedown` only (`ev_f02e3d8b237ee…`) | 591798 | `hover:opacity-70 transition-opacity` 150ms: .99, .79, .71, .70 on Scale vs .99, .79, .71, .70 on the clone | yes | — |
| Order Guidance mockup | IntersectionObserver .3 | — | 453596 | step +1 every 450ms to 10, hold 3200ms, loop. The low-opacity field count steps 5 → 0 after the 5 chip ticks; the cycle restarts after 29 samples on Scale and 28 on the clone (inside sampling jitter) | yes | — |
| Scheduling Engine mockup | IO .3 | — | 218184 | every 4s: fade out 300ms, swap after 220ms. Text changes at sample 14/15 on Scale vs 15 on the clone, then 30 vs 31 | yes | `tabs-tab1-*` |
| Custom Agents mockup | IO .3, once | — | 69472 | windows 700ms ease-out, second `delay-150` | yes | `tabs-tab2-*` |
| tab bar (390) | overflow scroll | — | `overflow-x-auto no-scrollbar` | scrollWidth 617 vs 613 at clientWidth 340 | yes | — |

### 3 · ClientTestimonials (metrics, one testimonial)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| logo tab | activation `top 80%` | — | 685963 (active −1 → 0) | **Fixed**: before activation the tab is `aria-selected=false`, `tabIndex −1` and coloured with the contrast colour #010101. It becomes true / 0 / #839CB2 through `transition-all` (150ms; `transition-duration-800` is not a class). The clone had them static. Fill y: Scale .997, .375, .08, 0; clone .997, .443, .078, 0 | yes | — |
| role chip | activation | — | `animateToText` | 26 → 20 (0.5s power3.out, +.05) → text + 26: 26, 23, 21, 20 … on both | yes | — |
| logo tab | click | React `click` + HubSpot (`ev_660b12807bf4…`) | 685963 `el` → `er()` | **Fixed** (the clone had no handler): `lenis.scrollTo(section, {offset: −24})`; the section's `scroll-mt-28` adds 112px. From 500px above the section: Scale 1530, 1694, 1775, 1813 … 1835; clone 1517, 1699, 1775, 1810 … 1835 (= top 1971 − 136). At 390 the section is already at its target, so the scroll stays put on both | yes | `testimonial-after-click-*` |
| logo tab | focus-visible | — | `focus-visible:outline-2 outline-offset-2 outline-white/80` | **Fixed**: after 400ms the ring is `solid 2px rgba(255,255,255,.8)`, offset 2, on both, and it animates in from `solid 3px currentColor` through `transition-all` | yes | — |
| arrows | — | — | rendered only when there is more than one testimonial | none on this page | n/a | — |

### 4 · SgpStack
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| root | scroll | none (`ev_cb799ac2997…`) | 290276 | backdrop scale .98 → 1 scrub (build QA); cards out on leave-back, in on re-enter: min opacity 1 / 0 / 1 on all three | yes | — |
| illustration layers | ScrollTrigger play/pause | — | 892353 | y 0 → −6 yoyo, sine.inOut, 3.25 / 4.25 / 3.5s: three moving nodes on each page with the same curves (e.g. layer 3: Scale −2.64 … −5.99 … −0.01, clone −3.71 … −5.99 … −0.02, phase offset only) | yes | `stack-float-*` |

### 5 · BlogPreview
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| play tiles | hover | React `click` + HubSpot (`ev_c0f4fe64762a…`) | 808358 | `group-hover/video:scale-110 bg-black/70` 300ms. Background α .55, .65, .70 on Scale vs .55, .64, .69 on the clone. Scale (Tailwind 4) animates the `scale` property, the clone animates `transform` | yes | — |
| tile images | hover | — | `group-hover/caption:scale-105` 1000ms | The group is the image wrapper, which sits under the tile's gradient and chip overlays (not `pointer-events-none`), so the zoom never fires on Scale (scale 1 throughout a 1.2s hover). The clone has no hover zoom either | yes (inert) | — |
| play tile | click → dialog | React | Radix Dialog | **Fixed**: the dialog now renders in a portal on `<body>`. Before, it sat inside the tile's GSAP transform, which pinned the `fixed` overlay and panel to the tile. Also fixed: focus moves to "Close video" and Tab stays inside the dialog (on Scale Tab goes to the player; the clone has no player, so it cycles on Close); Esc and overlay click close; focus returns to the tile; body gets `overflow: hidden` and `pointer-events: none` while open; the trigger carries `aria-haspopup=dialog`, `aria-expanded` and `aria-controls`; Close has a 2px white focus-visible ring. No enter/exit animation on either. A 400px wheel still scrolls the page 320px under Lenis on both | yes | `blog-dialog-*` |
| entrance / title / image scrub | scroll | IO + ScrollTrigger | 808358 + 598042 | the build already matched the genai-portfolio fixes (y16, threshold .12, titles, 1.08 → 1) | yes | — |

### 6 · TextImageSplit
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| headline / subtitle | IO −15% | — | HeadlineWithCta 925107 | AnimatedText delays .5 / 1 (build QA); no pointer handlers | yes | — |

### 7 · Pre-footer FullBleedMediaSection
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| CTA `a.FlatCta` (filledWhiteArrow) | pointerenter / leave | React `click` + HubSpot (`ev_459c375e198ce…`) | 892855 | **Fixed** (the security port of Scale's state machine, as in genai-portfolio): wash −1 → 0, strip −.5 → 0 (600ms); on leave the wash exits to +1 and resets to −1 at 680ms while the strip snaps back. Leave: 0, .388, .652, .839, .934, .985, 1, −1 on Scale vs 0, .388, .685, .839, .934, .985, 1, −1 on the clone. Re-enter: −1, −.736, −.422, −.204 on Scale vs −1, −.736, −.422, −.205 on the clone. Before the fix the clone's strip slid out on leave and re-entry started from +.58 | yes | `cta-prefooter-hover-*` |
| same | focus | — | CMSLink internal | **Fixed**: `solid 1px #86bff2` on both (was the site's 2px transparent ring) | yes | — |
| intro | `top center` | useScrollTrigger | 961870 | end `bottom 20%` + retroactive (see section 1) | yes | — |

### Vahue `/industries/healthcare-life-sciences`
It renders the clone's own `HealthcarePage`, so every fix above applies there with the same params. Same script:
- tabs: no auto-advance; the 150ms tab fill and the CTA opacity .79 / .71 / .70 match
- the Vahue mockups run Scale's loops: the 450ms step loop with a 3200ms hold, and the 4s swap; the intake mockup adds an 850ms start delay after its window entrance
- testimonial: the tab is unselected / −1 / #010101 until activation; a click scrolls to top − 136 (1797 for top 1933); the focus ring is 2px white/80
- stack: same float curves, and the cards go out and back in
- marquee: 40s
- CTA: identical enter, leave and re-enter, with a 1px #86bff2 focus ring
- no console errors

The Vahue blog tiles are links (no video), so they have no dialog.

### Not reproduced
- Scale's video player inside the dialog (Wistia/MP4); the clone shows an empty 16:9 frame.
- The 150ms outline-colour fade on the tab focus ring and the Tailwind 4 `scale` property on the play button. Both come from Tailwind 4 vs 3, and the end states are the same.
- HubSpot `mousedown`, OneTrust and OptinMonster listeners: these are third-party and were left out on purpose.

## Libraries
- **Scale:** GSAP 3.15.0 (ScrollTrigger, SplitText), Lenis (shared site settings), React / Next.js. No Keen, Embla or Rive on this page; the three.js chunk loads but stays idle.
- **Clone:** the installed gsap 3.15 (ScrollTrigger + SplitText) and the shared Lenis from `app/scale-clone/layout.tsx`.

## Assets (`public/scale-clone/enterprise-healthcare/`)
- `hero.webp` (1920×1080) and `prefooter.webp` (2400w)
- `layer-diagram.webp`, `layer-dashboard.webp`, `layer-avatars.webp`: the three illustration layers
- `tile-rad-agent.webp` (1600×900)

Not shipped:
- the Scale logo
- the eight customer logos in the hero marquee (neutral tiles at the measured logo box sizes)
- the Mayo Clinic logo in the testimonial tab (a neutral tile)
- the two blog thumbnails with Scale branding baked in (the agents tile uses a dark fill; the Mayo tile uses its #1B3A2A background)
- the eight certification badges (SOC 2, ISO 27001, ISO 42001, HIPAA, GDPR, EU AI Act, CSA STAR, FedRAMP), which are third-party marks: light ring tiles at opacity .35
- the MP4s behind the two video tiles (the dialog shows an empty 16:9 frame)

## QA
Files in `qa/enterprise-healthcare/`:
- `1440-sbs-00..16.jpg`: every 50% viewport, Scale on the left
- `390-sbs-00..08.jpg`: every 100% viewport
- `*-sbs-tab0..2.jpg`: each tab's panel and mockup after the intro
- `*-sbs-hover-{tab,cta,play}.jpg`: cursor on the inactive tab, the pre-footer FlatCta and the blog play button

**1440:**
- Page height 6627 = 6627; footer at 5728 on both.
- Every section top and height matches to the pixel: hero 135/720, tabs 895/1076, testimonial 1971/738, stack 2709/839, blog 3548/970, trust 4519/426, pre-footer 4976/720.
- All 24 text anchors land within 1px. That covers headline, body, tabs, quote 2127/311, metric, name, cards, tiles, trust and pre-footer.

**390:**
- Section tops match: 198 / 718 / 1655 / 2649 / 3800 (clone 3799) / 4849 (4848) / 5432. Every anchor is within 1px.
- The page is 41px shorter, all of it in the shared footer (1360 on Scale vs 1320), which is not part of this page.

There are no console errors on the clone. scale.com logs 3 errors of its own (third-party scripts).

Fixed during QA:
- The quote line masks were missing the 0.12em descender compensation. Collapsed negative margins give Scale a 44px line pitch, not 40, which made the testimonial 17px short.
- The client name used text-lg's 28px leading instead of `leading-tight` (22.5px).
- The FlatCta label was not capitalised.
- Mockup icon for Patient Chart: Scale uses MdArticle, not MdAssignment.

## Remaining gaps
- Customer logos, the testimonial logo, certification badges and two blog thumbnails are neutral placeholders (see Assets). Layout boxes are kept, so heights match.
- The video dialog shows a placeholder frame instead of Scale's MP4 player.
- The title tag is 8px narrower (250 vs 258) because the clone's mono face is narrower than Scale's.
- Inside the Custom Agents table, a few cells wrap differently because the clone uses Vahue's display face. The frame clips the table, so section heights don't change.
- Scale's `oml:` (landscape-phone) variants aren't modelled. They only apply to short landscape viewports.
