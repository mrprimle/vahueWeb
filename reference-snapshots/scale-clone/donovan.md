# scale.com/donovan → /scale-clone/donovan

Captured 2026-10-31 at 1440×900 and 390×844 with Playwright and Chrome. I walked the live DOM after scrolling in half-viewport steps and dumped computed styles, sampled the tab indicator and mock cards over time, and diffed the mock cards element by element against the clone. The page is a CMS page made of Plasmic `FullBleedMediaSection`s (hero and pre-footer), a logo strip, three hand-built product-UI mock cards, a "foundation" card diagram, a headless-ui tabbed showcase and two icon feature grids. There's no WebGL, no pinning, no Rive and no Keen or Embla on this page.

Files:
- Page: `app/scale-clone/donovan/page.tsx`
- Components: `components/scale-clone/donovan/*` (`DonovanPage`, `FullBleedMedia`, `FlatCta`, `animatedText`, `LogoStrip`, `Sections`, `Mocks`, `Showcase`, `content.ts`, `donovan.module.css`)
- Assets: `public/scale-clone/donovan/`
- QA screenshots: `reference-snapshots/scale-clone/qa/donovan/`

`FullBleedMedia`, `FlatCta` and `animatedText` are copied from the data-engine clone because it's the same Scale component. They're copied rather than imported so the two pages stay independent.

## Global
- The body is white, apart from one gray-50 band (`#f9fafb`) for the Foundation section.
- Tracking is −0.01em everywhere. Overtitles use +1px.
- Container: `max-w-[1472px] px-6`.
- Standard section padding is `py-18 lg:py-20` (72 / 80). The logo strip and Overmatch use `!py-12` (48).
- Section header (CMS):
  - Wrapper: `max-w-3xl`, centred, `mb-10 md:mb-20 md:mt-12`. The two feature grids use `!mb-10`.
  - Overtitle: mono 12/24, +1px, uppercase, `#525252`, `mb-5`.
  - Title: 30/1.375, then 42 at md, then 48/60 at lg. Weight 400, black.
  - Subtitle: 16/1.6, then 20/32 at lg. Colour black/70, `mt-4`, then `lg:mt-2`, balanced.

## Sections (top → bottom)

| # | Section | Layout (desktop / mobile) | Type | Notes |
|---|---|---|---|---|
| 1 | Hero `FullBleedMediaSection` | wrapper `pt-24 pb-10`; `px-4` clip wrapper; card radius 24, `p-16` / `p-8`, min-h 720 / 480, content bottom-left, max-w 72rem, gap 24 | h2 `clamp(2rem,.5rem+5vw,4rem)` / 1.05 (64/67.2 at 1440); p 20/30 → 16 | `hero.webp` 1920×1282, image bg `#193A29`, overlay `linear-gradient(#0000,#000)` only (`.media-overlay` cancels black/45; see REA verification). One arrow CTA (white, 154×40, radius 8, label 14/21 500) |
| 2 | Logo strip | md+: `container` 1280, `px-8`, `justify-between`, gap 32, min-h 52; mobile: react-fast-marquee (`ml-12` items) | — | 5 marks at 65×45, 48×63, 68×53, 79×22, 70×16 → neutral `bg-black/10` tiles (TODO) |
| 3 | Product overview | grid 1 → md 2 → lg 3 columns, gap 24, `mt-2`. Card mock aspect 764/560 (448×328), radius 12 | title p 24/36 `mt-8 lg:mt-10`; body 16/26.4 black/70 `mt-3` | Mock: bg `#0c0b0f` + violet/cyan radial glows; inner window inset 20, radius 10, 1px white/10, triple shadow, 1px top highlight; UI in Inter 6.5–10px (font-sans). Ported 1:1 in `Mocks.tsx` |
| 4 | Foundation (gray-50) | header (h2); column `items-center gap-6 mb-24`; rows `flex-wrap gap-8 p-6` (left-aligned, the grid is not centred on Scale either); cards `w-[368px]` (shrinks to 294 on mobile) `p-6 gap-6` radius 16, white, 1px black/5 | card label 24/32 centred | 3 cards, then a 687×36 brace SVG (stroke `#959595`, opacity .45), then 6 cards. Icons are 24px grey (`#B9B9B9`) SVGs |
| 5 | Tabbed showcase | lg+: pill tablist (`w-fit`, `px-8 mb-8`), 1px black/15, radius 100, p 4, 14/22; box radius 16, `px-6 md:px-10 py-8 lg:py-12 xl:py-20 lg:pl-[58px] lg:pr-0` (the image overflows the right edge); grid `1.5fr 2fr` → xl `1.2fr 2fr`, gap-x 114 (xl) | bullets 16/28, `pl-24` → `lg:pl-32`, 14 between; check chip 18px, black/9 fill, 1px black/10 | box: bg `rgba(0,0,0,.01)`, `::before` 1px black/6, `::after` black/2 + inset glow `0 0 12px black/8`; a white radial glow layer at `-translate-y-1/2`, opacity .5. Image figure: black, `p-4`, radius 16, 1px `rgba(209,170,215,.16)`, img max-h 400. On mobile the media comes first, the tablist is hidden, and dot pagination plus swipe take over |
| 6 | Overmatch | flex-wrap `gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; items `basis-full md:max-w-[368px] lg:basis-1/4` (3 per row) | h4 24/36 `mt-6`; p 16/24 `#525252` `mt-4` | icon tile 44, radius 8, black/9 fill, 1px black/10; 22px react-icons (Material) glyphs |
| 7 | Trusted & Secure | same grid, 3 items | same | check-circle icon ×3 |
| 8 | Pre-footer `FullBleedMediaSection` | wrapper `pb-8`; same card as the hero | h2 as in the hero | white arrow CTA plus white border CTA (112×39, radius 6); image `prefooter.jpg`, bg `#193A29` |

## Motion

| Element | Trigger / start → end | From → to | Ease / duration / stagger | Mode |
|---|---|---|---|---|
| ClipScrollSection (pre-footer; hero startPercentage 0 = no clip) | wrapper `top bottom` → `center center` | `clip-path inset(5% round 1.5rem)` → `inset(0%)`; media `scale 1.25 → 1` | linear map | scrub (onUpdate) |
| Hero / pre-footer headline | section `top center`, once, retroactive | AnimatedText: SplitText `lines,words`, `mask: lines`; lines `yPercent 400, opacity 0` → 0/1; words `x 30%` → 0; tint `#72CE7B` → `#79648C` → CSS colour | line 1s power3.out at 0.08·i; words 0.9s power3.out, stagger 0.03 | one-shot |
| Hero body | same | same, delay 0.2 | | one-shot |
| Arrow CTA intro | same, delay 0.5 | `autoAlpha 0, scaleX 0, radius 0` → `1, 1, 8px` (origin left); inner `scaleX` at +0.1; arrow `x −6 → 0`; label fades in at 0.75 | power3.out 0.85s (arrow power3.inOut) | one-shot |
| Border CTA intro | same, delay 0.5 | `autoAlpha 0 → 1` | power3.out 0.85s | one-shot |
| FlatCta hover | pointerenter / leave | currentColor layer (opacity .35 / .30) slides in from below (from the left for arrow) and out the other side; label `scale .9`; chevron track `−50% → 0` on enter, snaps back on leave; fill resets after 680ms; re-entry snaps it to the start first | 300ms (600ms arrow), `cubic-bezier(0,0,.2,1)` | React state + CSS (see Interaction audit) |
| Tab indicator | selection change (desktop) | GSAP `to` `left/width/height` of the selected tab | 0.2s, `power1.out` (Scale passes `"Power2.inOut"`, which GSAP doesn't know, so its default ease runs; rAF samples fit power1.out). The earlier "it jumps" note was wrong | GSAP |
| Tab text / separators | selection | colour black ↔ black/50; the separators either side of the selected tab `scaleY 1 → 0` | 200ms colours; 100ms separators | CSS |
| Mobile dots | selection / swipe | active bar `w-1 → w-4` (black/40 → black) | `all 0.3s ease` (`transition-width` isn't a Tailwind utility, so only `duration-300` applies) | CSS |
| Mobile logo marquee | always | `translateX(0 → −100%)`, two copies of the track | linear, track width / 50 px/s (react-fast-marquee default speed) | CSS |

Section headers, cards and feature grids have no scroll reveals. I captured inline styles before scrolling, and nothing below the hero starts hidden or transformed. The mock cards are static (their HTML is identical 3s apart, and `document.getAnimations()` is empty). Tabs don't auto-advance.

Reduced motion: no split, no clip or scale scrub, and no CTA intro. The hover fill stays, but the label scale and arrow slide are off and the marquee stops. Everything is cleaned up on unmount (`gsap.context().revert()`, `SplitText.revert()`, ResizeObserver and resize listeners).

## Libraries found
- GSAP 3.15 with ScrollTrigger and SplitText (AnimatedText, ClipScrollSection, CTA intros).
- Lenis, which the shared layout already runs.
- headless-ui `Tabs` (reimplemented locally).
- react-fast-marquee (reimplemented as a CSS keyframe).
- react-icons (Material) for the feature glyphs.
- Wistia iframes for three tab videos.
- Tailwind v4 on Scale; Tailwind 3 in Vahue.

There's no three.js, Rive, Keen Slider or Embla on this page.

One thing to know about the mock cards: they use `bg-gradient-to-br from-* to-*` utilities, but Scale's CSS only compiles some of them. Those that compile render as `transparent → indigo-600` or `transparent → red-600`; the others render as `none`. The clone reproduces the rendered result (two of them inlined, the rest dropped) rather than the class names. Otherwise Vahue's Tailwind would paint all seven.

## Assets (public/scale-clone/donovan)

| File | Source / notes |
|---|---|
| `hero.webp` | 1920×1282 |
| `prefooter.jpg` | The same `/static/img/reskin/prefooter.jpg` as data-engine, a 2400px downscale |
| `tab-ingest.png` | `/static/img/reskin/donovan/01.png`, 1236×595 |
| `tab-agent-arsenal.webp` | |
| `check.svg` | Bullet tick |
| `foundation-*.svg` | 9 icons, from inline SVG |
| `feature-*.svg` | 7 icons from inline react-icons SVG, colour set to `#000` |

Skipped:
- Scale's logo.
- The 5 government logos (replaced by placeholder tiles).
- The three Wistia videos (replaced by a neutral aspect-video frame with a play glyph, TODO).

The tab screenshots show third-party connector icons inside Scale's product UI. They're kept as product imagery; replace them when Vahue has its own screenshots.

## QA
At 1440, every section's top and height now matches Scale to the pixel. The only difference is the 39px announcement bar from the shared header:

| | Scale | Clone |
|---|---|---|
| Hero | 856 | 856 |
| Logos | 159 | 159 |
| Overview | 1104 | 1104 |
| Foundation | 1190 | 1190 |
| Tabs | 785 | 785 |
| Overmatch | 848 | 848 |
| Trusted | 536 | 536 |
| Pre-footer | 752 | 752 |
| Footer top | 6230 | 6269 |

At 390, overview (1958 vs 1959), foundation (2218), tabs (663 vs 664), Overmatch (1884) and Trusted (896) match. The offset there is the two-line shared announcement bar.

The mock cards pass an element-by-element computed-style diff for geometry, colours, borders, font sizes, line heights and letter-spacing. The only remaining differences are text widths, which come from the placeholder labels.

Tabs were tested by clicking: the indicator moves to the selected tab, `aria-selected` follows, and the separators hide either side of the selected tab. There are no console errors on the clone, `tsc` is clean for these files, and the page returns 200.

Screenshots in `qa/donovan/`:
- 1440: 9 stops, each one viewport apart.
- 390: 10 stops, each 1.3 viewports apart.

## Remaining gaps
- **Wistia videos** (Agentic RAG, Agent Interaction and Report Generation tabs) are placeholders.
- **Pre-footer image:** in Scale screenshots only the top band of the photo shows over `#193A29`. That's Scale's 7952px progressive JPEG still loading in headless Chrome, not a layout effect. The clone shows the full photo.
- **Mobile swipe:** now read from source (touchstart/move/end, 50px, no wrap; see Interaction audit).
- **Mock UI text** is Inter (Vahue's `font-sans`), and Scale's paragraph text inside the mocks inherits Scale's display face. The clone maps those paragraphs to Vahue's `font-display`.
- **Data I didn't capture:** I didn't fetch Scale's script bundles with REA. Every motion value above comes from runtime DOM and style sampling plus the shared Scale component ports (AnimatedText, ClipScrollSection, FlatCta) already verified on data-engine.


## REA verification (2026-10-31)

**Fingerprint:** REA `analyze_web_bundle` on a fresh CDP tab (127.0.0.1:9230, `include_script_sources: true`) — evidence `ev_357362ce10800619…`, 47/47 scripts parsed, 0 failures; Next.js (Turbopack chunks) + React. Chunk graph: page chunks `1rp7r9sw0y_aw.js`, `1fzcrwo_jci11.js`, `2_p1pc_oq7ewa.js`, `1x2up343t82em.js`, `2-uspc48boy4_.js`, `0cqri1imnx4ln.js`, plus the Plasmic/CMS set shared with generative-ai (`059q_ihpcslaa.js` 5.1 MB, `2oqqgjzhyolwf.js`, `19p53ufb3n98_.js`, `239g4jr8_7s86.js`, `3d2zty6gdk3do.js`); shared `37xz28pjbnlx4.js`, `09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`, `0sle6wl7ucd3b.js`. No three.js/WebGL, Rive or Embla on this page.

**FullBleedMediaSection (read from chunk `37xz28pjbnlx4.js`, identical on all six pages):**
- `FullBleedMediaSection({ startPercentage = 10, overlayVariant = 'flat', ... })` renders `ClipScrollSection` with `startPercentage` and **`startScale: 1`**, so ClipScrollSection's own inner `scale()` stays 1 (it always reads `transform: scale(1)` live).
- FullBleedMediaSection **also runs its own scrub** on the `<section>`: `start 'top bottom' → end 'center center'`, `onUpdate: scale = mapRange(progress, 0, 1, 1.25, 1, clamp)` set on the media wrapper (image div or video). So the media **does** scale 1.25 → 1. The automotive note ("no media scale") is refuted for this page: live samples below show `matrix(1.233…)` → `1.1636` → `1.0941` → `1`.
- ClipScrollSection: trigger = its own wrapper div, `top bottom → center center`, `clip-path: inset(mapRange(p, 0, 1, 0.5·startPercentage, 0)% round 1.5rem)`.
- The hero is rendered with `startPercentage 0` (live hero clip reads `inset(0%)` at every scroll position). The pre-footer uses the default 10, so it runs 5% → 0.
- Overlay: SSR markup is `media-overlay … bg-black/45` (`overlayVariant 'flat'`), but `.media-overlay { background: linear-gradient(#0000 0%, #000 100%) }` (CSS chunk `3ektzubma58z1.css`) uses the `background` shorthand, which resets `background-color`. Computed `background-color` is `rgba(0, 0, 0, 0)` on both sections, so the overlay is **gradient only, with no 45% black** (confirms the automotive note).
- AnimatedText intro (chunk `1h0nvyhf5gbrf.js`): lines `yPercent 400, opacity 0` → 0/1, 1s power3.out at `0.08·i`; words `x 30%` → 0, 0.9s power3.out, stagger 0.03 at +0.04; tint `#72CE7B` → `#79648C` (0.3276s at +0.22) → CSS colour (0.4524s). The clone matches.

**Live samples (Playwright, 1440×900, 225px steps, values read from inline style / computed transform):**

Sampled after hydration (the first run sampled before hydration and showed only the SSR `inset(0 round 1.5rem)`):
| scrollY | section | clip | media scale |
|---|---|---|---|
| 0 | hero (top 135) | inset(0%) | 1.0139 |
| 225 | hero | inset(0%) | 1 |
| 4725 | pre-footer (top 792) | inset(4.33333%) | 1.2167 |
| 4950 | pre-footer (top 567) | inset(2.94444%) | 1.1472 |
| 5175 | pre-footer (top 342) | inset(1.55556%) | 1.0778 |
| 5400 | pre-footer (top 117) | inset(0.166667%) | 1.0083 |
Overlay computed `background-color: rgba(0,0,0,0)` on both.

**Listener map (REA `inspect_web_event_listeners`, direct listeners on the first match):**
- `[role=tab]` and `button[aria-label^="Select tab"]` (showcase tabs), `.FullBleedMediaSection a`: HubSpot `mousedown` (capture, `4823527.js`) plus `click` (`42ixmvih7808g.js`) only. Tab state is React; there are no pointer or scroll handlers on the elements. (ev_c65e0a6f, ev_69f1f772, ev_23a16d58)
- No Keen slider, canvas or `pointermove` on this page.

**Result:**
- **Fixed:** the hero clip (the clone clipped 5% → 0). `DonovanPage.tsx` now passes `startPercentage={0}` to the hero and `{10}` to the pre-footer, and the component defaults to `priority ? 0 : 10`. The clip trigger is the wrapper.
- **Fixed:** the overlay (black/45 plus gradient became gradient only).
- **Confirmed:** media scale 1.25 → 1 and the AnimatedText and CTA intros.
- Clone re-sampled: the pre-footer with its top at 450 reads `inset(2.22222%)` and scale 1.1111, the same as Scale. Hero `inset(0%)`. No console errors.
- QA re-shot: `qa/donovan/1440-{scale,clone}-rea-{hero,prefooter}.jpg`.
- **Still unknown:** nothing new on the motion side.

## Interaction audit (2026-10-31)

**Method.** REA on a fresh CDP 9230 tab of scale.com/donovan:
- `analyze_web_bundle` (ev_6d602a801ada…, 58/58 scripts parsed, 0 failures).
- `inspect_web_event_listeners` on `html` (ev_5fb90a88cabf…), `body` (ev_4603e69c2e4c…), `[role=tablist]` (ev_7b151946b1fb…), `[role=tablist] [role=tab]` (ev_fb03d2a14bd0…), `[role=tabpanel]` (ev_56e3a74832da…) and `.rfm-marquee-container` (ev_012d4dcfb0e1…).

React handlers are delegated to the document, so I read them in the chunk sources:
- `1x2up343t82em.js`: TabsWithImages (module 753553), LogoCloud (970272), react-fast-marquee (922998) and the video player (11972).
- `1fzcrwo_jci11.js`: headless-ui v2 Tabs (970554).
- `1h0nvyhf5gbrf.js` (FlatCta 892855, AnimatedText) and `37xz28pjbnlx4.js` (FullBleedMediaSection) are byte-identical to the files audited on /physical-ai and /data-engine.
- The donovan FlatCta was byte-identical to the data-engine copy before that audit, so the data-engine FlatCta fix was ported unchanged. On top of it, the fill now moves with the CSS `translate` property; see the next section.

Then Playwright with identical inputs on scale.com, `/scale-clone/donovan/` and `/automations/support-agents/` at 1440×900 and 390×844 (mobile with `hasTouch` and CDP `Input.dispatchTouchEvent`). The inputs:
- Tabs: hover, click (indicator sampled every rAF), and the keyboard sequence ArrowRight ×2, End, ArrowRight, Home, ArrowLeft, PageUp, PageDown, Home, Enter, Space, Tab.
- A mouse drag on the panel.
- CTAs: hover enter, leave and re-enter, sampled at 0/60/120/200/320/700/900 ms.
- The pre-footer scrub at 10 points.
- A cursor grid sweep (6×4) at 5 scroll depths, comparing transform, opacity, background, colour and shadow.
- At 390: a dot click sampled to 500 ms, 10 swipes (±40/±60 px, 10 moves of 30 ms) started on the media and on the bullet text, a tap, a mouse drag, and marquee timing and hover.

Scripts: `scratchpad/don-audit/qa.js`, `swipe.js`, `swipe2.js`. Images: `qa/donovan/interactions/`.

**Window / document level.**
- `html`: a passive `scroll` listener (ScrollTrigger, `1h0nvyhf5gbrf.js`) plus the OneTrust `keydown`/`click` listeners.
- `body`: a passive `touchstart` (ScrollTrigger).
- `window`: Lenis touch/wheel listeners (`2fbrdg5m4_g_8.js`, which aren't used for touch because `syncTouch` is off), a passive ScrollTrigger touchmove, and FullStory `fs.js` (passive).
- Not present: `pointermove`/`mousemove` effects, Keen, Embla, canvas and WebGL (the three.js chunk `3kd41k7ews14b.js` is preloaded but not mounted).
- The cursor sweep changed **0** elements on all three pages at every depth, so there are no cursor-driven effects.

### 1. Hero FullBleedMediaSection
| Element | Input | Listener (REA) | Source module | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip wrapper / media | scroll | ScrollTrigger (html scroll, ev_5fb90a88) | `37xz28pjbnlx4.js` FullBleedMediaSection + ClipScrollSection | startPercentage 0 (no clip); media scale 1.25 → 1, `top bottom → center center`, scrub | yes (REA pass above) | `../1440-*-rea-hero.jpg` |
| headline / body / CTA intro | enter `top center` (once) | ScrollTrigger | AnimatedText + FlatCta reveal (`1h0nvyhf5gbrf.js`) | as in the Motion table | yes | n/a |
| "Book a Demo" arrow CTA | pointerenter / pointerleave | React delegated (HubSpot `mousedown` capture plus `click` only on the element) | FlatCta 892855 | Wash slides from −100% to 0 to +100% on x over 600ms ease-out, opacity .35. Chevron track −50% → 0 over 600ms on enter and **snaps back on leave**. Re-entry while the wash is leaving snaps it to the start first. Reset after **680ms**: Scale's `transitionend` check looks for `transform`, but its wash moves with the `translate` property, so only the timeout ever resets it | **fixed** (re-entry used to slide back from the exit side; the track used to slide back; the reset was at transform end) | `1440-{scale,clone,vahue}-cta0-hover.jpg` |

### 2. Logo strip
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| desktop row | none | none (no `carousel`, static `ul`) | LogoCloud 970272 | n/a | n/a | n/a |
| mobile marquee | none (always on) | none (ev_012d4dcf; CSS animation) | react-fast-marquee 922998 | `scroll` keyframes 0 → −100%, linear, infinite, duration = track width / 50 px/s (570 px → 11.4 s on both), `pauseOnHover` false (it keeps running under the cursor on both) | yes | n/a |

### 3. Product overview, 4. Foundation, 6. Overmatch, 7. Trusted & Secure
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| all children | hover / click / scroll | none (no anchors, no hover or transition classes in their SSR; the cursor sweep changed nothing) | CMS cards, FeaturesWithIcons | n/a | n/a | n/a |

### 5. Tabbed showcase (TabsWithImages 753553 + headless-ui Tabs 970554)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| indicator pill | selection change (desktop only, `max-width: 1023px` skips it) | React effect | 753553 | `gsap.timeline().to(pill, { left, width, height, duration: 0.2, ease: "Power2.inOut" })`. GSAP has no `Power2.inOut` key, so its default `power1.out` runs. rAF samples, 339 → 4 px: Scale 301/254/206/155/112/77/52/32/19/10/5/4 every ~17 ms. The clone runs 301/249/204/161/125/93/65/44/26/14/7/4 | **fixed** (the clone jumped; the old spec's "no transition" was a sampling miss) | `1440-*-tab-click.jpg` |
| tab `[role=tab]` | click | React delegated (ev_fb03d2a1: HubSpot `mousedown` capture plus `click`) | 970554 `I` / `k` | mousedown `preventDefault`; click → `focus({ preventScroll: true })` and select | **fixed** (the clone didn't focus the clicked tab) | same |
| tab | keydown | React delegated | 970554 `F` | Enter/Space select. Home/PageUp → first, End/PageDown → last. ArrowLeft/Right step with wrap-around. Focus moves and the selection follows (automatic activation). Roving tabIndex 0/−1. Tab from the selected tab goes to the panel (`tabIndex 0`) | **fixed** (the clone had arrows only, didn't move focus, and its panel wasn't focusable). The key sequence now gives the same `sel`/`focus` on all three: 1,2,4,0,0,4,0,4,0,0,0 | `1440-*-tab-keys.jpg` |
| tab text / separators | selection | CSS | 753553 | colour `transition-colors` 0.2s `cubic-bezier(.4,0,.2,1)`; `::after` `scale-y-0` on the selected tab and the one before it, 0.1s | yes | n/a |
| tab | hover | none | n/a | no hover style (computed values are unchanged while hovering) | yes | n/a |
| panel | mouse drag (desktop) | none | n/a | no-op | yes | n/a |
| panels wrapper (<lg) | touchstart / touchmove / touchend | React delegated | 753553 | `k = start x`, `C = last move x`. On end, if both are set: `k−C > 50` → next (no wrap), `< −50` → previous. A tap without a move does nothing. `touch-action: pan-y; user-select: none` only below lg | **fixed** (the clone used pointer events on the whole box, and `user-select: none` also applied on desktop). Swipe sequence −40/−60/−60/+60/−60×4/+40/+60 from the media: identical on all three (`10000 01000 00100 01000 00100 00010 00001 00001 00001 00010`) | `390-*-after-swipes.jpg` |
| panels wrapper | min-height (<lg) | React state | 753553 `S` / effect | `min-height` = the first panel's scrollHeight (423 px on Scale) until the first change, then removed: `S()` measures the target panel while it's still a hidden placeholder. No visual effect | yes (same sequence) | n/a |
| dots `button[aria-label^="Select tab"]` | click | React delegated | 753553 | select. Bar width `w-1 ↔ w-4`; `transition-width` isn't a Tailwind v4 utility, so the computed transition is **`all 0.3s ease`**. Widths at 0/50/100/150/200/300/500 ms: Scale 16/16/13.3/9.1/6.4/4.2/4, clone 16/16/13.3/9.1/6.4/4.2/4 | **fixed** (was `width .3s cubic-bezier(.4,0,.2,1)`) | `390-*-dot-click.jpg` |
| video tabs (Agentic RAG, Agent Interaction, Report Generation) | click | react-player poster → VideoOverlay modal | 11972 | Wistia, modal player | **no**: placeholder frame (no video asset) | n/a |

### 8. Pre-footer FullBleedMediaSection
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip wrapper / media | scroll | ScrollTrigger | `37xz28pjbnlx4.js` | 10-point scrub (wrapper top 900 → 0 in 100 px steps), identical on all three: clip 5 / 4.383 / 3.765 / 3.148 / 2.531 / 1.914 / 1.296 / 0.679 / 0.062 / 0 %; scale 1.25 / 1.2191 / 1.1883 / 1.1574 / 1.1265 / 1.0957 / 1.0648 / 1.034 / 1.0031 / 1 | yes | `../1440-*-rea-prefooter.jpg` |
| arrow CTA + "Try Donovan" border CTA | pointerenter / leave | React delegated | FlatCta 892855 | Arrow as in the hero. Border: wash on y, 100% → 0 → −100%, 300ms ease-out, opacity .30, label `scale .9` (300ms). The same 680ms reset and re-entry snap apply. Scale's border wash still sits at −100% 320 ms after leaving; the clone matches now | **fixed** | `1440-*-cta1-hover.jpg`, `1440-*-cta2-hover.jpg` |

**CTA samples** (wash position as a fraction of its travel).
- Arrow enter: Scale and clone both give 0 / .19 / .44 / .65 / .84 / 1 at 0/60/120/200/320/700 ms.
- Arrow leave: 0 → .19 → .44 → .65 → .84 on both, then reset by 700 ms. The track stays at −50% the whole time (it snaps on leave).
- Re-entry 80 ms after leaving, Scale: −1 / −1 / −.74 / −.42 / −.11 at 0/40/100/200/400 ms. Clone and Vahue: −1 / −1 / −.74 / −.42 / −.11. **Before** the fix: +.21 / +.17 / +.12 / +.07 / +.01, sliding back from the exit side.
- Border re-entry: 1 / 1 / .56 / .16–.20 / 0 on all three.

### Fixes in this pass
- `FlatCta.tsx`: Scale's state machine (data-engine port: re-entry snap, the track snaps back on leave, 680ms reset), and the fill moves with `translate`. As a result the `transform` transitionend check is dead, exactly as on Scale.
- `Showcase.tsx`:
  - GSAP indicator tween (0.2s power1.out).
  - headless-ui keyboard and focus model, focusable panel, ids and aria wiring.
  - Touch-based swipe on the panels wrapper, mobile-only swipe CSS, and Scale's min-height sequence.
  - Dot transition `all 0.3s ease`.
- The same changes on `/automations/support-agents` (`components/automation/workflows/donovan/`: FlatCta, Showcase, styles.module.css).

### Not reproducible / not applicable
- **Swipes that start on the bullet text don't work on scale.com.** Scale's ReactMarkdown `li` override is an inline arrow component, so the `setState` in `onTouchStart` remounts every `<li>`. The touch target is then detached, and React never sees the touchmove/touchend. Checked by wrapping the React props: `onTouchStart` fires, `onTouchMove`/`onTouchEnd` never do. With all 10 text swipes the selection stays at 10000. The clone keeps the intended behaviour (swipes work from anywhere in the panel) rather than copying this defect.
- **Wistia video tabs** (play, modal) are out of scope until Vahue has video. They're placeholder frames.
- Scale's ~50 ms main-thread latency on dot clicks and CTA entry is runtime jank, not a parameter.
