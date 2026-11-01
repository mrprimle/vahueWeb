# scale.com/public-sector-data-engine → /scale-clone/public-sector-data-engine

Captured 2026-10-31 with Playwright (headless Chrome, 1440×900 and 390×844, scrolled in 50% viewport steps) and the production chunks downloaded from the page (`1h0nvyhf5gbrf.js` AnimatedText, `37xz28pjbnlx4.js` FullBleedMediaSection/ClipScrollSection/AnimatedFlatCta, `3_bsw0kgw5l_w.js` ClientTestimonials, `30w17vppvfdah.js` VideoGallery/ResourcesSlider/Keen Slider).

Files: `app/scale-clone/public-sector-data-engine/page.tsx`, `components/scale-clone/public-sector-data-engine/*`, `public/scale-clone/public-sector-data-engine/*`. QA: `reference-snapshots/scale-clone/qa/public-sector-data-engine/`.

This page is an older Plasmic page: only the two full-bleed media bands and the testimonial use the new GSAP components. The section headers, feature cards, checklist and sliders have no scroll reveals.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Spacing |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection in ClipScrollSection) | wrapper `pt-24 pb-10`; 12-col grid `minmax(0,150px)`, gap 8, side padding 16 (both sizes); card 1408×720 / 358×480, radius 24, `p-16` / `p-8`, content bottom-left, max-w 1152, gap 24. Media: cover image (bg `#193a29`) + overlay `linear-gradient(#0000,#000)` | h2 `clamp(2rem,0.5rem+5vw,4rem)` / 1.05, −0.01em, white; body 20/1.5 → 16/1.45 white | CTA 154×40 |
| 2 | Logo wall | `.container` (max 1280, px 32 ≥1024, px 24 below); lead line centred, max-w 698, `mb-12`; desktop `ul` justify-between, 5 logos; mobile marquee (react-fast-marquee, 50px/s, `ml-12` per logo) | lead 16/1.65 `#374151`; link `#008eff` 500 + `→` (hover translate-x 4px, 0.3s) | section `pt-10 pb-10` (mobile `pt-8`) |
| 3 | Product overview | SectionHeader (max-w 768, `md:mt-12 mb-10`) + flex-wrap cards, `gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`, card `basis-full md:max-w-[368px] lg:basis-1/4` | eyebrow mono 12/24 +1px uppercase `#525252`, `mb-5`; h2 48/1.25 (lg), 40/1.375 (md), 30/1.375; lead 20/1.6 → 16/1.6 black/70, `mt-2`/`mt-4`; card h4 24/1.5, body 16/1.5 `#525252` | icon tile 44×44 r8, bg black/9%, 1px black/10%; h4 `mt-6`; p `mt-4` |
| 4 | Why (ChecklistWithMedia) | `flex md:flex-row gap-[54px] mt-12 max-w-[1216px]`, list `md:w-5/12` gap 24, image `md:w-7/12 p-2` (raster 1944×1740) | item title 16/1.5 500; body 14/1.5 black/70 | check dot 22 round, 12px glyph black/70; `hr mt-6` between items |
| 5 | Testimonial (ClientTestimonials) | wrapper `pt-8 pb-10 md:pt-10`; section `pt-20 pb-16 md:pb-20`; grid 12×`minmax(0,150px)` gap 8 px 24 (mobile 8 cols, px 12); slate panel `#839CB2` r16 absolutely centred; inner `lg:py-20`, mobile `p-8` flex-col gap 32; eyebrow col-start 2 (stack justify-end, tile 109×109 under it); quote col 5–11; name + role pill right-aligned | eyebrow mono 12/1.375 500 uppercase white; quote 40/44 −0.05em (mobile 24/28) with 160px (100px) indent; name 18/1.25 500 (16 mobile); pill mono 10 uppercase slate on white, 6px triangle | quote/name stack `gap-16`; panel 1392×612 at 1440 |
| 6 | Demos (VideoGallery) | header (eyebrow black); main player `aspect-video` r16 bg `#f2f2f2` (hidden <640); play disc 96 (72 mobile) black/50 → black/70 hover 0.2s; Keen slider below `gap-y-10`; thumbnails in `.videoThumbnail` frame (5px padding, r16, 2px `#fff3` inner border), 384×235 r11 | slide h4 24/1.33, `mt-2 mb-3` | mobile: slides are players, dots 10px (`#fff` active, `#37383B`) |
| 7 | Resources (ResourcesSlider) | header in container; slider starts at container left (`pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`) and bleeds to the right edge; card image `aspect-[389/243]` r8 bg black | tag 14/1.71 500 `#D1AAD7`; h5 24/1.33 line-clamp-2 `mt-1` | `pt-6` under image |
| 8 | Prefooter (FullBleedMediaSection) | wrapper `mt-16 pb-8`, backdrop `bg-gray-50`; same card as hero, no body | h2 as hero | — |

Header and footer come from the shared clone layout.

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Prefooter clip (hero: startPercentage 0, no clip) | ClipScrollSection root | `top bottom` → `center center` | `clip-path: inset(5% round 1.5rem)` → `inset(0% …)` (startPercentage 10 × 0.5) | linear map of progress | onUpdate (no tween) |
| Hero + prefooter media | section | `top bottom` → `center center` | `scale 1.25` → `1` | linear | scrub |
| Full-bleed heading + body (AnimatedText default intro) | section `top center`, once, retroactive | — | lines `yPercent 400, opacity 0`, words `x 30%, opacity 0`, colour `#72CE7B` → line i at `0.08·i`: line `yPercent 0, opacity 1` 1s; words at +0.04 `x 0, opacity 1` 0.9s stagger 0.03; colour → `#79648C` (+0.22 line / +0.238 words, 0.3276s / 0.29484s) → own colour (0.4524s / 0.40716s) | `power3.out` (moves), `power1.inOut` (colour) | — |
| Body | same | — | same, delay 0.2s | | |
| CTA "filledWhiteArrow" intro | same, delay 0.5s | — | root `autoAlpha 0, scaleX 0, borderRadius 0` (origin left) → `1, 1, 8`; inner counter `scaleX 0 → 1` at +0.1; label opacity at 0.75; chevron `x −6 → 0` | root `power2.out` 0.85s; chevron `power3.inOut` 0.85s | — |
| CTA hover | pointerenter / leave | — | 35% current-colour sheet `-100% → 0` on enter, `0 → +100%` on leave, snapped back to `-100%` by the 680ms timer; re-entry during a leave snaps it back first; chevron track `-50% → 0` on enter, snaps back on leave | CSS `ease-out` 600ms | — |
| Testimonial panel | inner column | `top bottom` → `bottom 75%` | `width 90%` → `100%` | `power3.out`, 1.15 | scrub |
| Testimonial quote | wrapper `top 80%`, once | — | lines (masked) `rotationX −90, yPercent 108, transformPerspective 900, origin 50% 100%` → `0, 0` | `power2.out` 0.48s, stagger 0.05, delay 0.35 | — |
| Testimonial name | same | — | same flip | delay 0.5 | — |
| Testimonial tile fill | same | — | `y 100% → 0` | 0.3s | — |
| Testimonial role pill | same | — | ClientName `animateToText`: empty pill (26px) → width 20 → text set → width `textWidth + 26` | width tweens 0.5s `power3.out` (delay 0.05), 10ms gap, text opacity 0.5s `none` | — |
| Demo slides | hover / select | — | inactive 50% → 70% hover → 100% active | CSS opacity 0.3s | — |
| Main player | slide change | — | `fadeIn` keyframe 0 → 1 | 0.6s ease-out | — |
| Resources track | Keen `created` (or 1s fallback) | — | opacity 0.5 → 1 | 0.3s ease-in-out | — |
| Mobile logo marquee | always | — | `translateX(0 → −50%)` of doubled row | linear, 50px/s | — |

`pinOnExit` is off for this testimonial, so the pinned exit (`top top → +=1.5·vh`, `y −15vh`, opacity → 0) in the component is not used on this page.

### Keen Slider options
- Demos: `rubberband: false`; `<640` perView 1 / spacing 32 / snap (Scale passes `centered: true`, which Keen v6 ignores); 640–767 perView 2 free; 768–1040 perView 3.1 snap; ≥1041 perView 3 snap.
- Resources: `initial 0, mode snap, rubberband false, perView 1.05 / spacing 24`; ≥640 1.4 free; ≥768 2 free; ≥1280 2.8 free. Cursor `grab` / `grabbing`; Tab / Shift+Tab step slides.

## Libraries / versions
GSAP 3.15 (ScrollTrigger, SplitText), Lenis (shared clone layout, lerp 0.14), Keen Slider (`keen-slider/react`), react-fast-marquee on Scale (replaced by a CSS keyframe marquee at the same 50px/s). No three.js, Embla or Rive on this page.

## Assets (`public/scale-clone/public-sector-data-engine/`)
- `hero.webp`: hero map image (1920×1078)
- `why-scale.png`: checklist illustration (1944×1740)
- `prefooter.jpg`: prefooter photo (downscaled from 7952 px to 2400 px wide)
- Icons (Material laptop / sparkles / trend / check, chevron, play, triangle) are inlined from the source markup in `icons.tsx`.
- Not shipped: customer logos (neutral tiles), the four resource thumbnails (they carry Scale, partner and DoD marks; plain black tiles), the three demo posters (Scale product UI with baked-in titles; dark gradient panels stand in for them).

## QA
Screenshots at every 100% viewport over the page body, both sites, at 1440 and 390, plus `1440-*-hero-intro.jpg` (sampled mid-intro) and `1440-clone-cta-hover.jpg`.
- Hero intro sampled on both sites mid-animation: line `translate(0, ~300%)`, words `translate(30%)`, colour `rgb(114,206,123)`. They match.
- Testimonial panel width when its top is 900 / 700 / 500px from the viewport top: Scale 1253 / 1345 / 1382, clone 1253 / 1351 / 1385.
- CTA hover sweep: −154px → 0 over about 600ms, and back on leave.
- Section offsets match apart from copy length (placeholder strings wrap differently) and the shared header's announcement bar, which adds 39px above the hero in the clone.
- No console errors. `npx tsc --noEmit` is clean for these files.

## Remaining gaps
- Placeholder imagery: the demo posters and resource thumbnails are plain panels (see Assets), and the logo wall uses tiles.
- `why-scale.png` is still Scale's diagram, and its labels are Scale copy. It needs a Vahue replacement.
- The Wistia player is not reproduced: a play click (or a thumbnail click on ≥640px) swaps the poster button for a placeholder frame of the iframe's box, where Scale loads `fast.wistia.net/embed/iframe/<id>?autoPlay=1`.
- On mobile, Scale's active demo dot is white on a white page, so it's invisible. This is copied as-is.
- The resources radial wash (white on white, opacity 30, invisible) is omitted.


## REA verification (2026-10-31)

**Fingerprint:** REA `analyze_web_bundle` on a fresh CDP tab (127.0.0.1:9230, `include_script_sources: true`) — evidence `ev_f7fd03f202aa10f3…`, 45/45 scripts parsed, 0 failures; Next.js (Turbopack chunks) + React. Chunk graph: page chunk `3_bsw0kgw5l_w.js` plus the CMS set shared with generative-ai (`30w17vppvfdah.js` holds Keen, the Resources and Demos sliders and WheelControls; `3d2zty6gdk3do.js`; `059q_ihpcslaa.js` and others); shared `37xz28pjbnlx4.js`, `09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`, `0sle6wl7ucd3b.js`. No three.js/WebGL, Rive or Embla on this page.

**FullBleedMediaSection (read from chunk `37xz28pjbnlx4.js`, identical on all six pages):**
- `FullBleedMediaSection({ startPercentage = 10, overlayVariant = 'flat', ... })` renders `ClipScrollSection` with `startPercentage` and **`startScale: 1`**, so ClipScrollSection's own inner `scale()` stays 1 (it always reads `transform: scale(1)` live).
- FullBleedMediaSection **also runs its own scrub** on the `<section>`: `start 'top bottom' → end 'center center'`, `onUpdate: scale = mapRange(progress, 0, 1, 1.25, 1, clamp)` set on the media wrapper (image div or video). So the media **does** scale 1.25 → 1. The automotive note ("no media scale") is refuted for this page: live samples below show `matrix(1.233…)` → `1.1636` → `1.0941` → `1`.
- ClipScrollSection: trigger = its own wrapper div, `top bottom → center center`, `clip-path: inset(mapRange(p, 0, 1, 0.5·startPercentage, 0)% round 1.5rem)`.
- The hero is rendered with `startPercentage 0` (live hero clip reads `inset(0%)` at every scroll position). The pre-footer uses the default 10, so it runs 5% → 0.
- Overlay: SSR markup is `media-overlay … bg-black/45` (`overlayVariant 'flat'`), but `.media-overlay { background: linear-gradient(#0000 0%, #000 100%) }` (CSS chunk `3ektzubma58z1.css`) uses the `background` shorthand, which resets `background-color`. Computed `background-color` is `rgba(0, 0, 0, 0)` on both sections, so the overlay is **gradient only, with no 45% black** (confirms the automotive note).
- AnimatedText intro (chunk `1h0nvyhf5gbrf.js`): lines `yPercent 400, opacity 0` → 0/1, 1s power3.out at `0.08·i`; words `x 30%` → 0, 0.9s power3.out, stagger 0.03 at +0.04; tint `#72CE7B` → `#79648C` (0.3276s at +0.22) → CSS colour (0.4524s). The clone matches.

**Live samples (Playwright, 1440×900, 225px steps, values read from inline style / computed transform):**

Sampled after hydration:
| scrollY | section | clip | media scale |
|---|---|---|---|
| 0 | hero (top 135) | inset(0%) | 1.0139 |
| 225 | hero | inset(0%) | 1 |
| 4725 | pre-footer (top 799) | inset(4.37654%) | 1.2188 |
| 4950 | pre-footer (top 574) | inset(2.98765%) | 1.1494 |
| 5175 | pre-footer (top 349) | inset(1.59877%) | 1.0799 |
| 5400 | pre-footer (top 124) | inset(0.209877%) | 1.0105 |
Overlay computed `background-color: rgba(0,0,0,0)`.

**Listener map (REA `inspect_web_event_listeners`, direct listeners on the first match):**
- `.keen-slider`: the Keen core set (`click` capture, `dragstart`, `ksDrag*`, `mouse*`, `touch*`) from `30w17vppvfdah.js`, plus a non-passive **`wheel`** from `3d2zty6gdk3do.js:665` (WheelControls, module 29713). Both the Resources slider (`[o.f]`) and the Demos slider (`[a.f]`) pass it. (ev_6859cb14)
- `[role=tab]`, `button[aria-label^="Play"]` (demo video), `.FullBleedMediaSection a`: HubSpot `mousedown` (capture) plus `click` (`42ixmvih7808g.js`) only. (ev_57bdb3dc, ev_6da4b5e5, ev_7e2aadb2)

**Result:**
- **Fixed:** the hero clip. `startPercentage` was hard-coded to 10 for both instances, so it now defaults to `priority ? 0 : 10` (`page.tsx` sits outside this pass's scope and passes `priority` on the hero only).
- **Fixed:** the pre-footer ran late. Live sampling showed the clone's pre-footer clip and scale stuck at 5% / 1.25 until the card was 76px *above* the viewport top. ScrollTrigger start/end had been measured before the sections above (sliders, lazy images) grew. After a forced refresh the values matched Scale, so the component now refreshes ScrollTrigger (debounced 150ms) whenever the document height changes, using a ResizeObserver that's cleaned up on unmount. Re-sampled: the pre-footer with its top at 450 reads `inset(2.22222%)` and scale 1.1111, identical to Scale.
- **Fixed:** added the WheelControls plugin (`keenWheel.ts`) to the Resources and Demos sliders.
- **Confirmed:** the overlay is gradient only (`.mediaOverlay`), media scale 1.25 → 1, the Keen options, and the AnimatedText cascade.
- QA re-shot: `qa/public-sector-data-engine/1440-{scale,clone}-rea-{hero,prefooter}.jpg`.
- **Still unknown:** none on the motion side.


## Interaction inventory (audit 2026-11-01)

Method: REA on fresh CDP 9230 tabs. `analyze_web_bundle` (ev_47d27eb825ff…, 56/56 scripts parsed, 0 failures). Chunks read by sha256: FlatCta/AnimatedText `1h0nvyhf5gbrf.js` (`10b2627a…`) and FullBleed/ClipScroll/useScrollTrigger `37xz28pjbnlx4.js` (`b234eef5…`). Both are byte-identical to the chunks in the security and rlenvironments audits, so their FlatCta and retroactive-intro findings carry over. ClientTestimonials `3_bsw0kgw5l_w.js` (`a08f46ff…`), module 685963, is the same code as data-engine's `1a9k8nwrsxal6.js` copy: same length, and the only differences are minifier variable names. Keen/VideoGallery/ResourcesSlider/ArrowLink are in `30w17vppvfdah.js` (`47631648…`), and WheelControls is in `3d2zty6gdk3do.js` (`056791f3…`). `inspect_web_event_listeners` ran on every section root and its interactive children (ids below), and each handler was traced into the downloaded chunks. Playwright then ran identical inputs on scale.com and the clone (script `scratchpad/psde-audit/qa.js`) at 1440×900, plus 390×844 for the testimonial:
- CTA enter, leave and re-enter, sampled at 100/300/650ms and 100/300/640/760ms
- CTA focus
- logo link hover
- testimonial state before and after select, sampled 50–1800ms, plus a tile click
- demo slide hover and thumbnail click
- main play click
- resources drag, horizontal wheel, vertical wheel, focus and Tab/Shift+Tab
- a 3×3 mouse grid per 800px band down `<main>`, with a no-mouse control snapshot

QA images: `qa/public-sector-data-engine/interactions/<name>-{scale,clone}.jpg`.

Page-wide listeners: `html` has a passive `scroll` (`1h0nvyhf5gbrf.js`) plus OneTrust `keydown`/`click` (ev_c8469d6091b…); `body` has a passive `touchstart` (ev_4e9c3d72aca9…). Section roots carry no direct listeners: `section.FullBleedMediaSection` (ev_7fc9ac51d0d3…) and `.ClientTestimonials` (ev_b2681990a54a…) have none. React's pointer/click handlers are delegated to the root. The mouse grid found **no pointer-tracking effect** anywhere on either site: the only nodes that changed are CSS hovers under the cursor (the play disc, and demo slides where a grid point landed on one), and the drift with no mouse is 0.

### 1 · Hero / 8 · Pre-footer (FullBleedMediaSection, startPercentage 0 / 10)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger via `html` scroll | `37xz28pjbnlx4.js` FullBleed / ClipScrollSection | see Motion and the REA samples above | yes (verified 2026-10-31) | `1440-*-rea-*` |
| heading / body / CTA intro | scroll `top center` | useScrollTrigger (210104), `retroactiveOnEnter` | `37xz28pjbnlx4.js` / `1h0nvyhf5gbrf.js` | AnimatedText cascade (body +0.2s); CTA filledWhiteArrow 0.85s after 0.5s; refresh check `progress > 0 \|\| scroll ≥ start − 1`, default end `bottom 20%` | yes. **Fixed**: the retroactive refresh check was added (the clone used `once` only) | — |
| FlatCta (arrow), both CTAs | pointerenter / pointerleave | React delegated; the node only has a HubSpot capture `mousedown` plus `click` (ev_e6d901f2f25…) | `1h0nvyhf5gbrf.js` mod 892855 | wash −100% → 0 → +100%, snapped back on the 680ms timer (Scale animates the CSS `translate` property, so its `transform` transitionend check never fires); strip −50% → 0, snaps back on leave; 600ms ease-out | yes. **Fixed**: the rlenvironments port. The 4-phase approximation became Scale's state machine with the re-entry snap, and the strip now snaps back instead of easing over 600ms | `1440-cta-hover-*` |
| FlatCta focus | keyboard focus | — | CMSLink (internal) | `focus:outline-1 focus:outline-scale-skyblue` = 1px solid #86bff2 | yes. **Fixed**: added (`.ctaFocus`). Both sites read `solid 1px rgb(134,191,242)` | — |

Samples, wash and strip as a fraction of their own width:
- Enter at 100/300/650ms: wash Scale −0.612 / −0.182 / 0, clone −0.612 / −0.182 / 0; strip Scale −0.306 / −0.091 / 0, clone −0.306 / −0.091 / 0.
- Leave at 100/300/640/760ms: wash Scale 0.388 / 0.818 / 1 / −1, clone 0.388 / 0.818 / 1 / −1; the strip is at −0.5 from the first sample on both.
- Re-enter 200ms into a leave: at +30ms the wash is −1 on both (strip −0.447 / −0.447); at +330ms the wash is −0.182 on both.

### 2 · Logo wall
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Meet our customers" ArrowLink | hover | HubSpot `mousedown` + `click` (ev_36947b374be3…) | `30w17vppvfdah.js` mod 890803, theme `light` | `text-link` #008eff, `hover:text-blue-700`; Scale's CSS has **no** `blue-700` rule, so the colour stays #008eff; the arrow moves translate-x 4px (300ms ease-out; 3.36px at 150ms on both) | yes. **Fixed**: the clone darkened the link to #1d4ed8 on hover | `1440-logo-hover-*` |
| mobile marquee | time | — | react-fast-marquee | 50px/s linear | yes (CSS keyframes) | — |

### 3 · Product overview · 4 · Why (ChecklistWithMedia)
No listeners, no hover, no scroll or pointer effects (grid: 0 changes). Matched (none).

### 5 · Testimonial (ClientTestimonials, `3_bsw0kgw5l_w.js` mod 685963)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll scrub | ScrollTrigger | 685963 | width 90% → 100%, power3.out, `top bottom → bottom 75%` | yes (verified 2026-10-31) | — |
| select | scroll `top 80%` | useScrollTrigger (not retroactive), end `bottom 20%`; onEnter selects 0 while the index is −1 | 685963 | quote flip delay 0.35, name flip delay 0.5, role pill `animateToText` delay 0.05 | yes. **Fixed**: the pill typed-in sequence is now exact (it was a clip reveal), and it renders empty until the select. Pill width at 50/200/400/600ms: Scale 20 / 60 / 130 / 138, clone 20 / 57 / 100 / 104 (the final widths differ only because the copy differs) | `1440-tm-selected-*`, `390-tm-selected-*` |
| unselected layout | — | — | 685963 | at index −1 the quote wrapper is `overflow-hidden lg:absolute lg:inset-0` and the name wrapper `absolute inset-0 overflow-hidden`, so the panel grows on select | yes. **Fixed**: the panel height before select is 518px on Scale and 518px on the clone at 1440 (it was 699). At 390 the height grows +20px on both | — |
| tile (`[role=tab]`, desktop + mobile lists) | state | HubSpot `mousedown` + `click` only (ev_ca345dd5c9f…) | 685963 `u` | inactive: `aria-selected=false`, `tabindex −1`, label #000, fill parked at y 100% (x 100% at ≤768px); active: label #839CB2, fill 100% → 0 on that axis, 0.3s | yes. **Fixed**: the clone was always selected with a slate label, and its mobile fill moved on y | — |
| tile | click | React `onClick` | 685963 `ei` | Lenis `scrollTo(root, { offset: -24 })` (and the root's `scroll-mt-28`), then select | yes. **Fixed**: the click was missing. Clicking from the root at −150px lands at 136px on both sites (1440 and 390) | — |
| tile | focus-visible | — | 685963 | `outline-2 outline-offset-2 outline-white/80` | yes. **Fixed**: added | — |
| arrows (prev/next) | — | — | 685963 `o` | only rendered with more than one testimonial; this page has one | n/a | — |

### 6 · Demos (VideoGallery, `30w17vppvfdah.js` mod 482270)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| slider | drag / wheel | Keen core (`click` capture, `dragstart`, `ksDrag*`, `mouse*`, `touch*`) + non-passive `wheel` from WheelControls `3d2zty6gdk3do.js:665` (ev_3a8de9ee8a7…) | Keen 6 + module 29713 | see Keen options; three slides at perView 3 on desktop, so nothing moves at 1440 | yes | — |
| slide | hover | React `onClick` only (ev_7c8716135db2…) | 482270 | inactive `sm:opacity-50 hover:opacity-70`, 300ms; measured `[1, .7, .5]` on both | yes | — |
| slide | click | React `onClick` | 482270 | select; on ≥640px also `autoPlay` the main player and `window.scrollTo({ top: rootTop − 16, behavior: 'smooth' })`. Measured: the root lands at 16px on both, slides `[.5, 1, .5]` | yes. **Fixed**: the autoplay and the smooth scroll were missing | — |
| main player | hover / click | React `onClick` | 832862 WistiaPlayer | disc `bg-black/50 → /70` 200ms; click (or autoPlay) swaps the button for `div.relative.aspect-video.rounded-2xl` holding the Wistia iframe | partly. **Fixed**: the click now swaps to the playing state, but the frame is a placeholder (no Wistia, see Remaining gaps) | — |
| mobile dots | click | React | 482270 | `moveToIdx(i)` | yes | — |

### 7 · Resources (ResourcesSlider, `30w17vppvfdah.js` mod 382790)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| track | drag | Keen core + WheelControls `wheel` (ev_6859cb14, 2026-10-31) | Keen 6 | free mode at 1440 (perView 2.8, spacing 24). Drag 400px over 300ms: −360 while dragging, −579 (max) after release on both; cursor grab → grabbing → grab on both | yes | `1440-res-after-drag-*` |
| track | horizontal wheel | WheelControls | 29713 | deltaX replayed as `ksDrag` (preventDefault when deltaX ≠ 0, drag ends 50ms after the last event). 6 × 40px: Scale −380 / −425, clone −385 / −514 across two runs (free-mode momentum is timing-sensitive) | yes (same plugin code) | — |
| track | vertical wheel | — | — | the page scrolls (160px on both) and the track stays put | yes | — |
| overflow wrapper | keydown Tab / Shift+Tab | `keydown` + `focusin` (ev_fadad1fea6f0…) | 382790 | Tab → `next()`, Shift+Tab → `prev()`; focusin on the first slide → `moveToIdx(minIdx)`, on the last → `maxIdx`. Measured focus first 0, Tab −483, Tab −579, Tab −579, Shift+Tab −483 on both | yes. **Fixed**: the `focusin` handler was missing | — |
| track opacity | created / 1s fallback | — | 382790 | 0.5 → 1, 0.3s ease-in-out | yes | — |

### Vahue page
No Vahue page is built on this clone. `lib/automation-content.ts` PAGE_TEMPLATES and `components/automation/workflows/registry.ts` don't reference it, so there was nothing to port.

### Not reproduced
- Wistia playback: the "playing" state is a placeholder frame, because Scale's videos are its own product footage.
- The pill timing at the moment of select differs by about ±50ms run to run on both sites, because the start is scroll-triggered through a React state update. The tween sequence and durations are identical.
