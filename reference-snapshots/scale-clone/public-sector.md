# scale.com/public-sector → /scale-clone/public-sector

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a tab in the shared CDP 9230 Chrome (closed afterwards); Playwright `connectOverCDP` on that tab for the DOM tree, computed styles and a clip/scale scrub; headless Chrome (under the browser lock) for side-by-side QA at 1440×900 and 390×844; the page's chunks and CSS curled and grepped.

Files: `app/scale-clone/public-sector/page.tsx`, `components/scale-clone/public-sector/*`:
- `PublicSectorPage.tsx` takes `{ content, theme? }`
- `content.ts` holds the content contract and `scalePublicSectorContent` (Scale's own copy)
- `Sections.tsx` (SectionHeader, LogoCloud, UseCases, GlassButton, Capabilities, WhyScale, StLouisBanner), `Resources.tsx` (Keen slider), `icons.tsx`, `ps.module.css`

Reused from earlier clones (same Scale chunks):
- `../evaluation-public-sector/FullBleedMedia` (hero + pre-footer; FullBleedMediaSection/ClipScrollSection from `37xz28pjbnlx4.js`, FlatCta from `../about/FlatCta`, AnimatedText from `../about/animatedText`, `useRefreshOnPageGrow`)
- `../evaluation-public-sector/Marquee` + `eps.module.css` (`.root` variables, Tailwind `container`, react-fast-marquee CSS)
- `../public-sector-data-engine/keenWheel` (WheelControls, module 29713)

Assets are in `public/scale-clone/public-sector/` (580 KB). The pre-footer photo is the same `/static/img/reskin/prefooter.jpg` as evaluation-public-sector and is read from that clone's folder. QA images are in `qa/public-sector/`.

Theme: body colours read `--ps-*` variables set on `.root` in `ps.module.css` (defaults = Scale's light palette): `--ps-bg`, `--ps-fg`, `--ps-muted` (#525252), `--ps-soft` (black/70), `--ps-tile` (black/9), `--ps-line` (black/10), `--ps-banner` (black/10), `--ps-tag` (#D1AAD7). The two full-bleed bands read the `--eps-*` variables, which `<main>` also carries.

## REA evidence
- `analyze_web_bundle` (`ev_b8fb1d1c6d607e2b…`) parsed 55/55 scripts with 0 failures (832,501 AST nodes) and fingerprinted Next.js (turbopack) + React.
  - Shared chunks checked by sha256 against earlier audits:
    - `1h0nvyhf5gbrf.js` = `10b2627a…` (AnimatedText / FlatCta hover)
    - `37xz28pjbnlx4.js` = `b234eef5…` (FullBleedMediaSection, ClipScrollSection, useScrollTrigger, FlatCta intros)
    - Both are byte-identical to the copies read on about / careers / evaluation-public-sector, so their findings (FlatCta 680 ms reset, retroactive intro with end `bottom 20%`, media scale only in onUpdate) carry over.
  - This page's CMS modules now ship in `3t7eetekne0nm.js` (`55e032ae…`): ResourcesSlider (module 382790), LogoCloud (970272), ChecklistWithMedia (872447), FeaturesWithIcons (460138), BrowserMockup (720912), react-fast-marquee (922998) and the `_5fl2pa_background` wash (799808). The ResourcesSlider code is identical to the copy read from `30w17vppvfdah.js` on public-sector-data-engine (same options, same keydown/focusin handlers).
  - FeatureGrid / bullets (module 450359) and the `.PrXvJq_feature` CSS module are in `2sv-38wn0i7kh.js`; the glass button (module 225913) in `058pnujclak3f.js` / `0_fm2xcv8_y2d.js`; Keen core + WheelControls (module 29713) in `2vj2iettvig10.js`.
  - `3kd41k7ews14b.js` (three.js, site-wide) is loaded but nothing on this page creates a canvas. No Embla, Rive or video on this page.
- `inspect_web_event_listeners`:
  - `.keen-slider` (`ev_9c00205a7a4b390f…`): Keen core (`click`, `dragstart`, `ksDragStart/ksDrag/ksDragEnd`, `mouse*`, `touch*`, all `2vj2iettvig10.js:13966/17947/18361`) + non-passive `wheel` at `2vj2iettvig10.js:665` (WheelControls).
  - slider overflow wrapper `div.overflow-x-hidden` (`ev_1ab0bdfc90e3cb36…`): `keydown` (`3t7eetekne0nm.js:21977`) + `focusin` (`:22057`).
  - glass "Learn more" `a[href="/donovan"]` (`ev_1e514706e4cc821b…`): HubSpot `mousedown` (capture) + React `click` (`42ixmvih7808g.js`) only; hover/active are CSS.
  - `.PrXvJq_feature` (`ev_f4962ae822477e50…`), Use Cases `section.relative.py-12` (`ev_e9c0b9d884e9609e…`) and the St. Louis card `.max-w-[440px]` (`ev_808c5275255ef685…`): no listeners.
- FullBleedMedia props measured live (scrub through the pre-footer on the CDP tab): hero `inset(0%)` throughout (startPercentage 0); pre-footer `inset(5%)` at rest → 0 at `center center` (startPercentage 10).

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Notes |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection, `startPercentage 0`, ClipScrollSection `bg-white`) | wrapper `pb-10! pt-24!`; card 1408×720 / 358×480, r24, `p-16` / `p-8`, content bottom-left `max-w-[72rem] gap-6`; image `us-public-sector.webp` 1920×1280 cover; `.media-overlay` = `linear-gradient(#0000, #000)` | h2 `header2` clamp(2rem,.5rem+5vw,4rem)/1.05 white; p `body1` 20/30 → 16/1.45 white | one arrow FlatCta "Book a Demo" 154×40 (`filledWhiteArrow` intro) |
| 2 | LogoCloud (Section `!py-12`) | 7 logos → g = 4: ≥768 `ul.grid` repeat(8, 1fr) (124 px tracks), gap-x 32, `md:gap-y-16`, `justify-between`, li `col-span-2` (280), 5th li `col-start-2` (x 268); <768 react-fast-marquee, li `ml-12`, two 827 px copies | — | logos `brightness-0` at White House 65×45, US Army 48×63, US Air Force 68×53, CDAO 79×22, DIU 70×16, Cohere 79×14, Accenture 82×22. No lead text on this page |
| 3 | Use Cases (SectionHeader + FeatureGrid) | Section `relative py-12 overflow-hidden` + white radial wash (opacity 25, invisible); container 1280 px-8; header `mb-10 md:mb-20 md:mt-12 max-w-3xl`; grid 1 / md 2 / lg 3, `gap-14 md:gap-6 xl:gap-x-10 xl:gap-y-14` (379 wide at 1440); media `.PrXvJq_feature aspect-[4/3]` r12 + 1px #fff3 inner border | eyebrow geist-mono 12/24 +1px uppercase #525252 `mb-5`; h3 30/1.375 → md 40 → lg 48/1.25; lead 16 → lg 20 / 1.6 black/70; card title 24/36 `mt-8 lg:mt-12`; bullets 16/24 black/70 `translate-x-3` | empty subtitle `<p mt-3>` collapses into the list's `mt-8`; tick: 18 px round black/9 + 1px black/10, 10×8 white/70 check svg |
| 4 | Capabilities (SectionHeader `!mb-12` + 2 × ChecklistWithMedia, dividers off) | rows `flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px]`, first `mb-16`; row 1 media left, row 2 media right (DOM order kept on mobile); media `p-2 md:w-7/12` img `w-full h-auto` (644×430 / 662×592 attrs, natural 1920×1375 → 662×474 once loaded); list `md:w-5/12 gap-6` | h3 `text-3xl heading` 30/45; item title 16/24 500, body 14/21 black/70 (`gap-2`); tick 22 round + MdCheck 12 black/70 | glass CTA "Learn more →" 120×32 under each list (→ /donovan, /public-sector-data-engine) |
| 5 | Why Scale (SectionHeader `!mb-10` + FeaturesWithIcons) | `flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; item `grow basis-full md:max-w-[368px] lg:basis-1/4` (x 112 / 536 / 960) | h4 24/36 `mt-6`; p 16/24 #525252 `mt-4` | figure 44×44 r8 black/9 + 1px black/10; MdOutlinePsychology / MdOutlineVerified / MdOutlineGroupAdd at 22 |
| 6 | St. Louis banner | card `max-w-[440px] mx-auto lg:max-w-none lg:h-[440px] bg-black/10 px-10 rounded-2xl`, row `flex-col gap-8 lg:flex-row lg:gap-16`, halves `lg:w-1/2` | h3 `text-3xl heading md:text-4xl` 30/45 → 36/45 balance; p 20/30 black/70 | glass CTA (→ /stl); image `imgArcStLouisPng` 1500² `w-full rounded-xl` (h auto → square once loaded; overflows the 440 card at ≥1024, `md:overflow-visible`) |
| 7 | Resources (ResourcesSlider) | header in container (`!mb-10`, no lead); slider `pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`, bleeds right; 9 slides 459 wide at 1440 (perView 2.8), 347 at 390 | tag 14/24 500 #D1AAD7; h5 24/1.33 line-clamp-2 `mt-1`; empty description p `lg:mt-2` | card image `aspect-[389/243]` r8 bg black; thumbnails are Scale's 280×228 PNGs |
| 8 | Pre-footer (FullBleedMediaSection, `startPercentage 10`, ClipScrollSection `bg-gray-50`) | wrapper `mt-16! pb-8`; same card as the hero; `prefooter.jpg` | h2 "The future of your industry starts here" | arrow "Book a Demo" + border "Build SI" (→ /data-engine) |

Header and footer come from the shared clone layout. The header stays light (no `data-nav-theme`).

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero / pre-footer clip | ClipScrollSection | `top bottom` → `center center` | `inset(0.5·startPercentage% round 1.5rem)` → 0 (hero 0, pre-footer 5% → 0) | linear map | onUpdate + onRefresh |
| Hero / pre-footer media | FullBleedMediaSection `<section>` | same | scale 1.25 → 1 (`mapRange`, clamped), set in onUpdate only | linear | onUpdate |
| Headline + body (AnimatedText default) | section `top center`, end `bottom 20%`, retroactiveOnEnter, once | — | SplitText `lines,words` masked; lines yPercent 400 / opacity 0, words x 30%; colour #72CE7B → #79648C → own colour; body +0.2s | lines 1s power3.out at 0.08·i; words 0.9s power3.out stagger 0.03 | — |
| Arrow CTA `filledWhiteArrow` | same call, delay 0.5 | — | root autoAlpha 0, scaleX 0, radius 0 → 1/1/8; counter scaleX 0 → 1 at +0.1; label opacity at 0.75; chevron x −6 → 0 | 0.85s power3.out; chevron power3.inOut | — |
| Border CTA `fadeIn` (pre-footer) | same timeline, position 0 | — | autoAlpha 0 → 1 | 0.85s power3.out | — |
| Mobile logo marquee | — | — | each copy translateX 0 → −100% | linear, duration = content width / 50 px/s (16.54s for 827 px at 390), infinite | — |
| Resources track | Keen `created` (1s fallback) | — | opacity 0.5 → 1 | 0.3s ease-in-out | — |
| Glass button | hover / active (CSS) | — | see Interaction inventory | 500 ms cubic-bezier(0,0,.2,1); sheen 500 ms cubic-bezier(.4,0,.2,1); arrow 300 ms ease | — |

The SectionHeaders, use-case cards, checklists, Why Scale and the St. Louis banner have no motion on Scale: no AnimatedText class and no tweens.

Under `prefers-reduced-motion` the clone doesn't split or tween anything (FullBleedMedia), CTAs show at rest, the clip and scale stay at their resting values, and the marquee stops (project rule; Scale's marquee doesn't stop).

## Libraries / versions
- GSAP 3.15 with ScrollTrigger and SplitText (via the shared FullBleedMedia).
- Lenis from the shared clone layout (lerp 0.14).
- Keen Slider (`keen-slider/react`) with the WheelControls plugin.
- react-fast-marquee reproduced in CSS (`Marquee.tsx` from evaluation-public-sector) with its defaults: speed 50, no autoFill, no pause, two copies each `min-width: 100%`, duration measured with a ResizeObserver.
- No three.js, Embla, Rive or video on this page.

## Assets (`public/scale-clone/public-sector/`)
- `hero.webp`: `/static/img/reskin/headers/us-public-sector.webp` 1920×1280, 36 KB (as served)
- `img-acquisition-procurement`, `img-mission-planning`, `img-isr`, `img-cyber-security`, `img-enterprise-support` `.webp`: re-encoded at 800 px wide, q75 (shown at 379 / 342 px)
- `ai-agents.webp`, `computer-vision.webp`: the 1920×1375 webps at 1152×825 (same aspect, so `h-auto` gives the same 474 px height), q80
- `st-louis.webp`: 1500² at 946², q80
- `resource-01…09.png`: Scale's 280×228 thumbnails as served (2–4 KB each)
- `check.svg`: the 10×8 bullet tick (`check.29rbqqg7i4nz6.svg`)
- The customer logos aren't shipped. Same-size neutral tiles stand in; `content.logos[].src` can supply real ones.
- No video on this page, so nothing was swapped for a poster frame.

## QA
- Layout passes: `qa/public-sector/{1440|390}-{scale|clone}-NN.jpg`, one screenshot per 50% of the viewport. The OneTrust banner is hidden.
- Measured after scrolling the whole page (lazy images loaded), Scale / clone:
  - 1440: document 7963 / 7963; every h3, h4, use-case paragraph, list, image and slide lands on the same x/y/width/height within 1 px (the capability images round to 475 vs 474). The glass buttons are 121 vs 118 wide (the `→` glyph, see gaps). Footer 6979 / 6980.
  - 390: every block top, heading, paragraph and image matches; the document is 10326 vs 10286 — the 40 px difference is in the shared footer, as on evaluation-public-sector.
- The page returns 200 and the clone logs no console errors. Scale logs its own 404/401 and OptinMonster errors.

## Interaction inventory
Method: identical inputs on both sites with `scratchpad/ps-audit/qa.js` (`int` mode) at 1440 and 390:
- hover / leave sampled every 100 ms on the hero arrow CTA and both pre-footer CTAs
- hover each glass "Learn more" (state at 0 / 150 / 750 ms) and mouse-down on it
- hero media at scroll 0 / 150 / 300 / 450 / 600; pre-footer scrub at 10 points (root top 900 → 360)
- jump straight to the page bottom (the pre-footer intro must still play)
- resources: drag 400 px left in 10 × 40 px steps, focus the first slide, Tab ×3 + Shift+Tab, 6 × 40 px horizontal wheel, one 160 px vertical wheel
- the mobile marquee sampled every 500 ms
- a 3×3 mouse grid over every top-level section, comparing transform, opacity, colour, background, translate and scale of every visible node before and after

Page-wide listeners: `html` passive `scroll` (ScrollTrigger), useScrollTrigger `pageshow` / `visibilitychange`, OneTrust `keydown` / `click` (left out deliberately).

The 3×3 mouse grid changed 0 nodes on every section on both sites once intros had settled (at 390 the hero intro and the logo marquee move by themselves, on both). There is no pointer-tracking, parallax or tilt effect anywhere on the page.

### 1 · Hero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| media | scroll | ScrollTrigger via `html` scroll | 37xz28 mod 540431 | scale 1.25 → 1. At scroll 0 / 150 / 300 / 450 / 600: Scale 1.0139 / 1 / 1 / 1 / 1 at 1440 (1.006 / 1 … at 390); the clone gives identical values | yes | `{1440,390}-{scale,clone}-00` |
| headline / body / CTA intro | scroll `top center` | useScrollTrigger (210104) retroactive | 37xz28 / 1h0nvyhf | as in the Motion table | yes | — |
| FlatCta arrow "Book a Demo" | pointerenter / leave | React; HubSpot `mousedown` | 1h0nvyhf mod 892855 | wash −100% → 0 → +100% at 600 ms ease-out, snapping back on the 680 ms timer. Enter (wash x / width): Scale −1, −.558, −.315, −.161, −.066, −.011, 0 / clone identical (one sample −.055 vs −.066, frame timing). Leave: Scale 0, .388, .652, .839, .934, .985, 1, −1 / clone identical | yes | `interactions/*-hero-arrow-hover-*` |

### 2 · LogoCloud
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| desktop grid | — | none | 970272 | static; logo positions identical at 1440 (220/540/842/1149, second row 373/681/991) | yes | `1440-*-01` |
| mobile marquee | none (CSS animation) | none | react-fast-marquee 922998 | 16.54s linear (827 px / 50 px/s); both copies 827 wide, moving 25 px per 500 ms on both sites | yes | `interactions/390-marquee-*` |

### 3 · Use Cases · 5 · Why Scale
No listeners (`ev_e9c0b9d8…`, `ev_f4962ae8…`), no hover styles, no scroll or pointer effects. The mouse grid changed 0 nodes. Nothing to reproduce.

### 4 · Capabilities and 6 · St. Louis banner — glass "Learn more" (×3)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| glass button | hover (CSS) | HubSpot `mousedown` + React `click` only (`ev_1e514706…`) | module 225913 | outer `scale` 1 → 1.02 and shadow 0 0 20px white/12 (500 ms cubic-bezier(0,0,.2,1)); link `filter` brightness 1 → 1.15, inset shadow 0 1px 1px white/10 → 0 2px 4px white/25; `::before` sheen opacity 0 → 1 and translate 0 → (8px, −8px) (500 ms); arrow translate 0 → 4px (300 ms ease). At 150 ms: Scale scale 1.0129, brightness 1.09675, inset 0 1.645px 2.935px white/.2, sheen .3673 at (2.939, −2.939), arrow 3.2097px; clone 1.0129, 1.09675, 0 1.645px 2.935px white/.2, .3673 at (2.939, −2.939), 3.2097px. At 750 ms both 1.02 / 1.15 / 1 / 8px −8px / 4px | yes. **Fixed during QA**: the shadow is written as Tailwind 4's five-layer list so it interpolates the same way | `interactions/{1440,390}-glass{0,1,2}-hover-*` |
| glass button | mouse down (`:active`) | — | 225913 | link scale .97, brightness 1.05. 300 ms after press: Scale .972937 / brightness 1.05979; clone .972939 / 1.0598 | yes. **Fixed during QA**: `:active` was declared before the hover rules, so brightness stayed 1.15 while pressed | — |

### 7 · Resources (ResourcesSlider, `3t7eetekne0nm.js` mod 382790)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| track | load | Keen `created` | 382790 | opacity .5 → 1 (0.3s ease-in-out); `grab` cursor | yes | — |
| track | drag | Keen core (`ev_9c00205a…`) | Keen 6 | grab → grabbing → grab. 1440 (free, perView 2.8): first slide 112 → −158 while dragging 300 px in 10 steps, −427 / −429 after release (Scale / clone). 390 (snap, perView 1.05): 24 → −246, snaps to −347 on both | yes | `interactions/{1440,390}-res-after-drag-*` |
| track | horizontal wheel | WheelControls `wheel` (non-passive, `2vj2iettvig10.js:665`) | 29713 | deltaX replayed as `ksDrag`, drag ends 50 ms after the last event. 6 × 40 px after the Tab steps: 1440 Scale −1323 / clone −1330 (free-mode momentum is timing-sensitive); 390 −1462 on both | yes (same plugin code) | — |
| track | vertical wheel | — | — | the page scrolls 128 px on both and the track stays put | yes | — |
| overflow wrapper | keydown Tab / Shift+Tab, focusin | `keydown` + `focusin` (`ev_1ab0bdfc…`) | 382790 | focus on the first slide → `moveToIdx(minIdx)`; Tab → `next()`, Shift+Tab → `prev()`. 1440: 112, −371, −854, −1337, −854 on both; 390: −347, −719, −1090, −1462, −1090 on both | yes | — |

### 8 · Pre-footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 540431 + ClipScrollSection | 10 points, root top 900 → 360 at 1440: inset 5 / 4.630 / 4.259 / 3.889 / 3.519 / 3.148 / 2.778 / 2.407 / 2.037 / 1.667 % with scale 1.25 / 1.2315 / 1.213 / 1.1944 / 1.1759 / 1.1574 / 1.1389 / 1.1204 / 1.1019 / 1.0833; at 390 (844 → 337) 5 … 1.171 % / 1.25 … 1.0585. Scale and the clone give identical values | yes | `interactions/*-prefooter-scrub-*` |
| intro after jumping to the bottom | scroll | useScrollTrigger retroactive | 210104 | heading opacity 1, CTA opacity 1, radius 8px, width 154 on both | yes | — |
| FlatCta arrow "Book a Demo" | pointerenter / leave | React + HubSpot | 892855 | same curve as the hero; Scale and clone sample-identical | yes | `interactions/*-hero-preArrow-hover-*` |
| FlatCta border "Build SI" | pointerenter / leave | React + HubSpot | 892855 | wash translateY .974 → .39 → .088 → .026 (300 ms), label scale 1 → .9315 → .9045 → .9; leave −.559 → −.836/−.861 → −.923, label back to 1. Scale animates `scale`, the clone `transform` (same values) | yes | `interactions/*-hero-preBorder-hover-*` |

## Remaining gaps
- Fonts are Vahue's. Line breaks match at both widths.
- The `→` glyph (font-unicode = Aeonik on Scale) uses system-ui, so each glass button is 121 px wide vs 118 (the arrow still moves 4 px on hover).
- The imagery is still Scale's (hero render, five use-case photos, two product screenshots, the St. Louis arch, resource thumbnails, prefooter photo). The customer logos are tiles.
- Links point at clone routes: `/scale-clone/demo/`, `/scale-clone/donovan/`, `/scale-clone/public-sector-data-engine/`, `/scale-clone/data-engine/`, `/scale-clone/blog/` (Scale: nine individual posts) and `/scale-clone/` (Scale: /stl).
- The white radial washes (`_5fl2pa_background-white`, opacity 25/30) are white on white and render nothing; they are kept as empty layers.
- `oml:` (short-landscape) variants are not reproduced.
- HubSpot `mousedown` analytics and OneTrust listeners are third-party and deliberately left out.
