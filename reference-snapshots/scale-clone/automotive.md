# scale.com/automotive → /scale-clone/automotive

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + Chrome, 50% viewport scroll steps; production JS and CSS chunks fetched and grepped). REA was used for the bundle fingerprint and the listener map (details below). This is an older-style page built from code (`2kbgdjj-19374.js` holds the page component inline), not Plasmic CMS. It has two `FullBleedMediaSection`s, one tabbed media block, a feature grid with video modals, a Keen Slider and a react-fast-marquee logo strip on mobile. There's no WebGL, no pinning, no SplitText on body copy and no Rive.

Files: `app/scale-clone/automotive/page.tsx`, `components/scale-clone/automotive/*` (styles in `automotive.module.css`), assets in `public/scale-clone/automotive/`, QA shots in `reference-snapshots/scale-clone/qa/automotive/`.

## Global
- The body is white throughout. The containers use Scale's `container`: max-w 1280, padding 24 (32 from lg), centred. Every section from the overview on is `container py-16` (64/64).
- Section header (`SectionHeader`, light theme): `max-w-3xl` centred, `mb-10 md:mb-20 md:mt-12`. The overtitle is mono 12/24, +1px, uppercase, `#525252`, mb 20; the block keeps its 20px even when empty. Title 30/1.375 → 42 (md) → 48/1.25 (lg), black, weight 400, −0.01em. Sub 16/1.6 → 20 (lg), black/70, mt 16 → 8 (lg).
- Tracking is −0.01em everywhere. Weight is 400, and 500 for checklist titles, tags and CTAs.

## Sections (top → bottom)

| # | Section | Layout (desktop / mobile) | Type | Notes |
|---|---|---|---|---|
| 1 | Hero `FullBleedMediaSection` (page-header variant) | wrapper `pt-24 pb-10`, `px-4`, card radius 24, `p-16` / `p-8`, min-h 720 / 480, content bottom-left, max-w 72rem, gap 24 | h2 `clamp(2rem,.5rem+5vw,4rem)`/1.05 (64 → 32); p 20/30 → 16/23.2 | `hero.webp` (1920×1078) object-cover on `#193A29`; `.media-overlay` = `linear-gradient(#0000,#000)` only. Its `background` shorthand cancels `bg-black/45`, as the computed style confirms. One white arrow CTA. |
| 2 | Logo cloud | `py-10 md:py-14`. md+: `container`, `flex justify-around`, gap 32, min-h 52; <md: react-fast-marquee | n/a | 2 logos (92×40, 96×32) → `bg-black/10` tiles (TODO). Mobile marquee: 2 copies, each min-w 100%, items `ml-12`, default speed 50px/s |
| 3 | Overview (ChecklistWithMedia) | header, then `flex md:flex-row gap-[54px] mt-12 items-center max-w-[1216px]`; left `md:w-5/12` flex-col gap 24; right `md:w-7/12 p-2` | item title 16/24 500 black; body 14/21 black/70 | check chip 22px round, `bg-black/[.09]`, 1px black/10 border, 12px Material check black/70; `hr mt-6 border-white/10` between items (invisible on white). Diagram 662×553 (2085×1740 PNG) |
| 4 | "How to Build" + Supported Data | header (overtitle), then a panel `mt-10 bg-[#cc76ff]/[0.02]`; inner `relative flex flex-col-reverse lg:flex-row-reverse lg:gap-16`; text column `xl:min-w-[466px] xl:max-w-[466px]`; pink glow layer `absolute inset-0 opacity-50` | title 32/48 → 36/45 (xl) `#010101`; sub 16/24 zinc-400; body 16/24 gray-500, mb 32 | tabs: pill track `border #ffffff26` radius 100, p 4, 14/22; tab `px-4 py-2`, active black / others black/50, 1px black/15 dividers at 50% height (hidden next to the active tab). Media (xl): panel container `absolute -left-24 top-1/2`, media `absolute top-1/2 translate(40px,-50%)`, 649×402, `shadow-super`, 3D frame `border #D1AAD7/16` radius 10, other frames radius 8. Mobile: media above the tabs, `mb-9`. CTA: glass pill, h 32, 1px gradient ring (`to-br #9a9a9a → #1a1a1a → #6a6a6a`), fill `#1a1a1a`, 14/20 500 white, `px-[17px] py-2`, arrow ml 4 |
| 5 | Phases (Features, numbers) | header (+sub), `mt-10`, grid 1 / md 2 (gap 24) / lg 3; xl gap-x 40, gap-y 56 | title 24/36 (mt 32 → 48 lg, ml 44); body 16/26.4 black/70, mt 12, ml 44; number 12/18 600 Inter in a 22px chip at −40px | media 3:2 radius 8 in a `.feature` radius 12 wrapper with a 1px `#fff3` inset border; centred 64px play button `bg-black/40` → `/60` (150ms) opens a modal: `w-[95vw] md:w-[80vw] lg:w-[70vw] max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl`, 16:9 Mux HLS video |
| 6 | Why (FeaturesWithIcons) | header (overtitle + sub), `mt-10`, `flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14`; items `basis-full md:max-w-[368px] lg:basis-1/4 grow` | h4 24/36 black, mt 24; p 16/24 `#525252`, mt 16 | icon tile 44px radius 8, `bg-black/[.09]`, 1px black/10 border, 22px Material icons (whatshot, speed, bolt) |
| 7 | Resources | `relative py-16`; header in `container`; slider wrapper `mt-10 pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`, `overflow-x-hidden` | tag 14/1.71 500 `#D1AAD7`; h5 24/1.33, line-clamp 2 | Keen Slider at every width (no desktop grid on this page); card image aspect 389/243, radius 8, black bg; white glow layer `-top-[80%] -bottom-[20%] opacity-30` |
| 8 | Foundation model | header (title only), then `flex md:flex-row items-center gap-16 mt-12`, halves | label mono 12/24 +1px uppercase black; h2 30/45 → 36/45 (lg); p 16/24 zinc-400; link 16/24 black, `hover:text-gray-600` | image 576×324 (1920×1079) radius 8 |
| 9 | Pre-footer `FullBleedMediaSection` | wrapper `mt-16 pb-8`, then as the hero | h2 as the hero | `prefooter` image on `#193A29`; white arrow CTA plus white border CTA (stacked on mobile) |

## Motion

| Element | Trigger / start → end | From → to | Ease / duration / stagger | Mode |
|---|---|---|---|---|
| ClipScrollSection (pre-footer) | wrapper `top bottom` → `center center` | `clip-path: inset(5% round 1.5rem)` → `inset(0%)` (FullBleed passes `startPercentage: 10`, ×0.5) | linear map | scrub (onUpdate progress) |
| ClipScrollSection (hero) | same | none: the page-header variant passes `startPercentage: 0` | n/a | n/a |
| FullBleed media scale (hero and pre-footer) | section `top bottom` → `center center` (FullBleedMediaSection's own trigger) | media layer `scale 1.25` → `1` (`v(progress, 0, 1, 1.25, 1, true)` in module 540431). The `startScale: 1` it passes only switches off ClipScrollSection's second scale, not this one | linear map, clamped | scrub (onUpdate progress) |
| FullBleed headline / body | section `top center`, retroactive | AnimatedText intro (SplitText `lines,words`, mask lines): lines `yPercent 400, opacity 0` → 0/1 over 1s, power3.out, at 0.08·i; words `x 30%` → 0 over 0.9s, stagger 0.03; tint `#72CE7B` → `#79648C` → CSS colour. Body delay 0.2 | see left | one-shot |
| FullBleed CTAs | same, delay 0.5 | arrow CTA: root `autoAlpha 0, scaleX 0, radius 0` → `1, 1, 8px`, inner scaleX at +0.1, arrow `x −6→0`; border CTA `autoAlpha 0→1` | power3.out 0.85s | one-shot |
| Tab indicator | tab change (headless-ui Tab.Group onChange) | `left/width/height` → selected tab's offsets | `Power2.inOut` 0.2s, timeline `{autoRemoveChildren, smoothChildTiming}` | tween |
| Tab text colour / dividers | same | text black/50 ↔ black (`transition-colors 200ms`); divider `scaleY 1 → 0` (100ms) | CSS | n/a |
| Tab media | n/a | `transition-transform duration-1000 ease-out` (static translate) | CSS | n/a |
| Text tab highlights | panel mount | 4 colour groups (`#ECA6FA`, `#E7FE53`, `#DBC6FC`, `#B2FCD2`) `autoAlpha 0, y 10` → `1, 0`; first delay 0.5, then `'>'` | `Power2.inOut` 0.6s, stagger 0.03 | one-shot |
| Glass CTA hover | :hover | ring `scale 1.02` + glow `0 0 20px rgba(255,255,255,.12)`; fill brightness 1.15 + inset highlight; sheen `before` opacity 0→1, translate(8px,−8px); arrow `translateX(4px)` | 0.5s `cubic-bezier(0,0,.2,1)` (arrow 0.3s) | CSS |
| Play button | :hover | `bg-black/40 → /60` | 150ms | CSS |
| FlatCta hover | pointerenter / leave (JS state machine, module 892855) | currentColor layer slides in from below (from the left on the arrow CTA), then out the opposite side and snaps back after 680ms; label `scale .9` (fill/border only, CSS hover); arrow track −50% → 0, snaps back on leave | 300ms (600ms arrow), `cubic-bezier(0,0,.2,1)` | state + CSS transition |
| Keen Slider (resources) | drag / trackpad wheel / Tab | plugin WheelControls; Tab / Shift+Tab → next / prev; focusin on the first / last card → min / max index; `mode: snap`, `perView 1.05`, `spacing 24`, `rubberband: false`; ≥640 free 1.4, ≥768 free 2, ≥1280 free 2.8; cursor switches between grab and grabbing; track opacity .5 → 1 on `created` (1s fallback), 0.3s ease-in-out | n/a | n/a |
| Logo marquee (<768) | always | `translateX(0 → −100%)` per copy, duration = width / 50px·s⁻¹ | linear, infinite | CSS |

In the sampled run I scrolled in half-viewport steps and read the inline styles of everything in `main`. Apart from the AnimatedText intro, the pre-footer clip and the FullBleed media scale, Scale has no scroll reveals on this page. That first pass missed the media scale; the REA re-check at the end of this spec added it. The clone was sampled mid-intro: a hero line caught at yPercent 309.65 → 29.47 → 0.09, tinted green → purple → white. The tab pill was caught at left 160 → 212 mid-tween. The pre-footer clip was caught at `inset(3.59%)`.

All of the above reverts on unmount (gsap.context, SplitText.revert, ResizeObserver disconnect, key listener removed). With reduced motion: no split, no clip scrub, no tab tween (it snaps), no text-tab stagger, no marquee, and CTA, glass and panel transitions are off.

## Libraries found (REA + chunk grep)
- REA `analyze_web_bundle` on the page (36 scripts, all parsed): Next.js (Turbopack chunks, webpack runtime) and React. Route strings: `/static/img/reskin/headers/automative-data-engine.webp` and `/static/img/reskin/prefooter.webp` in `2kbgdjj-19374.js` (the page component).
- GSAP 3.15 core and ScrollTrigger (`09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`); AnimatedText and SplitText intro (`1h0nvyhf5gbrf.js`); ClipScrollSection and FullBleedMediaSection (`37xz28pjbnlx4.js`).
- Keen Slider (`2vj2iettvig10.js` lib; options in `0vl8zp9uyr6-0.js`).
- headless-ui `Tab` (tabs); react-fast-marquee (`rfm-*`, mobile logos); prism-react-renderer (audio tab code); react-audio-player (audio tab).
- Lenis is shared (the clone layout runs it at lerp 0.14).
- Not present on this page: three.js/ShaderMaterial, Rive, Embla, pinning.

REA `inspect_web_event_listeners` listener map:
- `.keen-slider`: `click` (capture), `dragstart`, `ksDragStart/ksDrag/ksDragEnd`, `mousedown/move/up/leave`, `touchstart` (passive), `touchmove`, `touchend`, `touchcancel`, plus a non-passive `wheel` (WheelControls, module 29713; the first pass missed it, see the interaction inventory), all from `2vj2iettvig10.js`.
- `.ekJjCG_tabs button` and the `.PrXvJq_feature` play button: a single `click` from `42ixmvih7808g.js`, which is React's root-delegated handler (headless-ui and the modal state).
- `main a.FlatCta`: no direct listeners (hover is React-delegated pointer events plus CSS).
- No `pointermove` handlers on page content, so there's no cursor-reactive section. The only `wheel` handler is the Keen WheelControls one above.

## Assets (public/scale-clone/automotive)
`hero.webp` (1920×1078), `prefooter.jpg` (downscaled from the 7952px `prefooter.webp` to 2400px wide), `lidar.jpg` (the 3D tab placeholder still), `living-room.webp` (Image tab), `map.webp` (Mapping tab), `phase-base/improvement/target.webp` (1152×912 product screenshots), `foundation-model.webp` (1920×1079), and `resource-guide.png` (chip render).

Skipped:
- customer logos (Valeo, Oshkosh)
- the webinar resource thumbnail (it has speaker photos and title text): placeholder tile
- the overview diagram PNG, which bakes Scale's labels and font into the image; redrawn as SVG in `Sections.tsx` with placeholder labels
- the Text tab SVG, whose text is glyph paths of Scale copy; redrawn with neutral bars and the same 4 highlight colours and timeline
- the Audio tab's Steve Jobs speech clip and transcript: simplified placeholder panel

## QA
Screenshots are 100%-viewport steps at both widths: 9 stops at 1440 and 11 at 390, Scale and clone, 40 files. Desktop matches to the pixel on every measured anchor: the page is 7451px tall on both, and every section h2, h4, h5 and image top lines up exactly (606, 1191, 2192, 2861, 3794, 4102, 4470, 4949, 5208, 5429, 6325). On mobile the page is 9272 against 9269 tall, and the anchors are within about 45px (the placeholder copy wraps differently). No console errors on the clone; the page returns 200; `tsc --noEmit` is clean for these files.

## Remaining gaps
- The 3D tab: Scale lazy-mounts a live `lidar-now.scale.com` iframe behind the placeholder still. The clone keeps the still.
- The Audio tab is a simplified placeholder panel. Scale's version plays an mp3 with a progress bar and reveals a JSON transcript.
- Phase video modals show the poster frame. Scale streams Mux HLS, and hls.js isn't installed (native HLS would only work in Safari).
- Phase number chips: Scale asks for `font-family: Inter`, which isn't loaded, so they render in the browser serif. The clone falls back to a sans face.
- At lg (1024–1279) the Supported Data media sits in normal flow beside the 47% text column, which I approximated. Only xl and mobile were QA'd.
- The FullBleed scroll behaviour comes from the source props: media scale 1.25 → 1 on both sections, clip only on the pre-footer (none on the hero). An earlier version of this spec said there was no media scale; the REA re-check below corrected that.
- Shared header: the clone and Scale both show the announcement bar on mobile, so the hero top matches at 198.
- All copy and links are placeholders (`TODO: Vahue copy`). The logos, the webinar thumbnail and the diagram labels are placeholders too.

## REA re-check: FullBleed media scale (2026-10-31)

REA `analyze_web_bundle` on https://scale.com/automotive (evidence `ev_4858ef1c1e8a88ef…`, 58/58 scripts parsed). The chunks were read by their sha256: page component `2kbgdjj-19374.js` (`cd0e6084…`) and FullBleed/ClipScroll `37xz28pjbnlx4.js` (`b234eef5…`, the same file the early clones were checked against).
- Hero: `aH = a.i(478135)`, the page-header wrapper. It renders the 540431 FullBleedMediaSection with `{...props, startPercentage: 0}` inside `pb-10! pt-24!`. Props: `headline "Automotive Data Engine"`, `body`, `cta {Book a Demo, /demo}`, `backdropColor {white, #010101}`, `media [imageWithMeta automative-data-engine.webp]`.
- Pre-footer: `aY = a.i(540431)`, FullBleedMediaSection used directly in `mt-16! pb-8`. Props: `headline "The future of your industry starts here"`, `cta {Book a Demo, /demo}`, `secondaryCta {Build AI, /data-engine}`, `backdropColor {white, #010101}`, `media [imageWithMeta prefooter.webp]`. No `startPercentage` is passed, so the default 10 applies.
- In 540431, `startPercentage = 10` and `overlayVariant = "flat"` by default. It passes `startScale: 1` to ClipScrollSection, and also registers its own trigger: `(0,h.f)(P, {start: "top bottom", end: "center center", onUpdate: e => m.U.set($.current, {scale: v(e.progress, 0, 1, 1.25, 1, true)})})`. `P` is the section and `$` is the media `div` (the image branch; the video branch puts the same ref on the video). Both automotive sections use `imageWithMeta`, so both scale.
- Applied: `components/scale-clone/automotive/FullBleedMedia.tsx` and the Vahue `/automations/scoring-decisions` copy (`components/automation/workflows/automotive/FullBleedMedia.tsx`, on its dot-texture media layer) now scrub the media layer 1.25 → 1 on the section. The scrub is off under reduced motion.
- Not re-screenshotted: Playwright was in use by another agent, so there are no new QA images for this change.


## Interaction inventory (audit 2026-10-31)

Method: REA on a fresh CDP 9230 tab. `analyze_web_bundle` (ev_7d80065a10ea…, 58/58 scripts parsed; the page chunk `2kbgdjj-19374.js` and FullBleed `37xz28pjbnlx4.js` hashes are unchanged since the build) and `inspect_web_event_listeners` on every section root and interactive child (ids below). Each handler was traced into the downloaded chunks. Then Playwright with identical inputs on scale.com, the clone and `/automations/scoring-decisions` (script `scratchpad/am-audit/qa.js`), covering:
- CTA hover, leave and re-enter, sampled every 100ms
- the border CTA
- tab clicks, with the pill sampled every 50ms
- tab keyboard (Arrow, Home/End, PageUp/PageDown)
- glass CTA hover and press
- play-button hover and the modal open/close sequence
- resources drag, trackpad wheel, focus and Tab/Shift+Tab at 1440 and 390
- foundation-link hover
- the pre-footer scrub at 10 points
- a 3×3 mouse grid over every section, with a no-mouse control snapshot
- the mobile marquee

QA images: `qa/automotive/interactions/<name>-{scale,clone,vahue}.jpg`.

Page-wide listeners: `html` has a passive `scroll` from GSAP ScrollTrigger (`1h0nvyhf5gbrf.js`, ev_b66fffdd7e5d…) plus OneTrust `keydown`/`click`, and `body` has a passive `touchstart` (ev_483c179135f6…). Every interactive child carries only a HubSpot capture `mousedown` (`4823527.js`) and React's root-delegated `click` (`42ixmvih7808g.js`). The mouse grid found **no pointer-tracking effect** on any section of any of the three pages. The only elements that change after the grid moves are the shared header's reveal bar (shared chrome, outside this page's sections), and those change the same way on Scale and the clone.

### 1 · Hero (FullBleedMediaSection, startPercentage 0)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section | scroll | ScrollTrigger via `html` scroll | `37xz28pjbnlx4.js` mod 540431 | media scale 1.25 → 1 over `top bottom → center center`, no clip | yes | — |
| headline / body / CTA | scroll `top center`, once | ScrollTrigger | `1h0nvyhf5gbrf.js` | AnimatedText cascade; CTA "filledWhiteArrow" 0.85s after 0.5s | yes | — |
| FlatCta (arrow) | pointerenter / pointerleave | React `onPointerEnter/Leave` (ev_4acfe9dc769a…: only HubSpot + React click on the node) | `1h0nvyhf5gbrf.js` mod 892855 | wash −100% → 0 → +100%, then snaps back on the 680ms timer; strip −50% → 0, snaps back on leave; 600ms ease-out | yes. **Fixed**: it was a 4-phase approximation, now Scale's state machine with re-entry snap and the strip snapping back. See the note below. | `cta-hover-300ms-*`, `cta-leave-200ms-*` |

Samples, wash x as a fraction of its width:
- Enter at 0/100/200/300/400ms: Scale −1, −0.559, −0.315, −0.141, −0.036; clone −0.997, −0.557, −0.283, −0.141, −0.036.
- Leave at 100/200/300/400/500/600/700ms: Scale 0.388, 0.652, 0.877, 0.955, 0.993, 1, −1; clone 0.387, 0.683, 0.874, 0.952, 0.993, 0.997, −0.997.
- Re-enter 200ms into a leave: Scale −1, −0.736, −0.422, −0.229; clone −0.997, −0.734, −0.421, −0.228.

Note: Scale also wires `onTransitionEnd` on the fill and resets on `propertyName === 'transform'`. Its Tailwind 4 `translate-*` classes animate the `translate` property, though, so that handler never matches and the 680ms timer does the reset. The clone animates `transform`, so it leaves the handler out to keep the same timing. The data-engine and generative-ai-data-engine clones still reset on transitionend, about 80ms earlier than Scale.

### 2 · Logo cloud
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| mobile marquee (<768) | none | none | react-fast-marquee | `scroll` keyframes, 7.8s (= 390px / 50px·s⁻¹), linear, infinite | yes (7.8s on all three) | — |
| desktop logos | none | none | `970272` LogoCloud | static, no hover | yes | — |

### 3 · Overview (ChecklistWithMedia)
No listeners, no hover and no pointer or scroll effects. Matched (none).

### 4 · Supported Data (DataLabeling tabs)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `[role=tablist]` | none | none on the node (ev_65fcff94916d…) | headless-ui `Tab.Group` in `2kbgdjj-19374.js` | none | yes | — |
| tab | click | React-delegated (ev_3bc60dee62c2…) | same, component `aB` | `onChange` → pill `left/width/height` tween 0.2s `Power2.inOut` in a `{autoRemoveChildren, smoothChildTiming}` timeline; text black/50 ↔ black 200ms; divider `scale-y-0` on the selected tab and the one before it (100ms) | yes | `tabs-text-{1440,390}-*` |
| tab | keydown | headless-ui (React) | same | horizontal, automatic activation: ArrowRight/Left wrap; Home and PageUp go to the first tab; End and PageDown go to the last; focus and selection move together | yes. **Fixed**: the clone only handled Arrow keys, and only relative to the selected tab | — |
| Text panel | mount | GSAP | same | 4 highlight groups `autoAlpha 0, y 10` → 1/0, 0.6s `Power2.inOut`, stagger 0.03, first delay 0.5, then `'>'` | yes | same |
| glass CTA | hover / active | CSS | `51051` CTAs → NewButtonLink "glass" | ring `scale 1.02` + glow 20px/0.12 (0.5s ease-out); inner brightness 1.15 + inset 2px/4px; sheen `::before` opacity 0 → 1, translate (8, −8) over 0.5s **cubic-bezier(.4,0,.2,1)**; arrow +4px over 0.3s; active: inner `scale .97`, brightness 1.05 | yes. **Fixed**: the sheen ran on CSS `ease`. In Tailwind 4, `--tw-ease` is registered `inherits:false`, so the pseudo-element ignores the link's `ease-out` | `glass-hover-*` |

Pill `left` samples every 50ms after a click (px):
- Audio: Scale 125, 204, 250, 268, 271; clone 126, 189, 235, 267, 271.
- 3D: Scale 271, 168, 64, 10, 5; clone 271, 153, 72, 12, 5.

The final pill (5/50/38/5 at rest) and every resting tab colour match. Keyboard sequence from Text: → Audio, → 3D, Home 3D, End Audio, ← Text, PageUp 3D, PageDown Audio. This is identical on all three pages after the fix.

Glass at 150ms of hover: ring scale 1.01 on both; inner brightness 1.075 on both; sheen opacity 0.134 on both (the clone was 0.295 before the fix); arrow 2.30px on both.

### 5 · Phases (Features with numbers)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| play button | hover | CSS | `0vl8zp9uyr6-0.js` mod 450359 | `bg-black/40 → /60`, 150ms `cubic-bezier(.4,0,.2,1)` | yes (alpha 0.4 → 0.6; 0.567 vs 0.537 at 80ms) | — |
| play button | click | React-delegated (ev_6a1c50fbb498…) | same | opens Modal `582844` with the video (Mux, autoPlay) | yes (the poster stands in for the video) | `modal-open-1440-*` |
| Modal | open | effect | `2vj2iettvig10.js` mod 582844 | `body.style.overflow = hidden`; overlay `#060606/70` `fadeIn` 0.35s ease-out; dialog layer `showUp` (opacity 0 → 1, scale 1.1 → 1) 0.35s ease-out after 0.55s; panel `w-[95vw] md:80vw lg:70vw max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl` with the inset ring `::after`; 24px `bg-white/20` close chip in flow at the panel's top-left | yes. **Fixed**: the clone had a static `bg-black/60` overlay with no animation and no scroll lock, and an absolute 32px close button | same |
| Modal | Escape / click outside `[data-modal]` / close | `document` keydown; dialog `onClick` | same | unmount, `body.style.overflow = ''`, no exit animation | yes (**fixed**: the clone listened on window and closed on overlay click only) | — |

Modal samples every 100ms after the click:
- Overlay opacity: Scale 0, 0.43, 0.76, 0.98, 1; clone 0, 0.22, 0.60, 0.91, 1.
- Dialog layer from 600ms: Scale opacity 0.29 / 0.66 / 0.94 / 1 at scale 1.071 / 1.034 / 1.006 / 1; clone 0.08 / 0.49 / 0.84 / 1 at 1.092 / 1.051 / 1.016 / 1.
- The clone trails by about one sampling interval (~50ms), which is Playwright round-trip noise.
- Close chip at (216, 156) on both. Panel 1008px wide at 1440 on both. The video is letterboxed (`object-contain`) as on Scale.

### 6 · Why (FeaturesWithIcons)
No listeners and no hover. Matched (none).

### 7 · Resources (Keen Slider)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `.keen-slider` | drag / touch | Keen core (ev_c416b664e695…) | `0vl8zp9uyr6-0.js` mod 382790 | options as in the motion table; cursor `grabbing` while dragging | yes | `resources-{1440,390}-*` |
| `.keen-slider` | trackpad `wheel` (non-passive) | same evidence: `wheel` from `2vj2iettvig10.js` | WheelControls mod 29713 | deltaX replayed as ksDragStart/ksDrag/ksDragEnd; preventDefault only when deltaX ≠ 0; ends 50ms after the last event | yes (**added**: `keenWheel.ts`) | same |
| `.overflow-x-hidden` wrapper | `keydown` Tab / Shift+Tab | ev_1a430681af96… (`0vl8zp9uyr6-0.js` @3:23401) | mod 382790 | `next()` / `prev()`; focus still moves | yes (**added**) | same |
| wrapper | `focusin` on the first / last card | same evidence | same | `moveToIdx(minIdx / maxIdx)` | yes (**added**) | same |
| track | created | Keen `created` + 1s fallback | same | inline `visibility: visible; transition: opacity 0.3s ease-in-out`, opacity 0.5 → 1 | yes (`visibility` added) | — |

Samples at 390, x of the first slide:
- A 300px drag gives −303 mid-drag on all three; one sample read −348 in one clone run (timing noise).
- After release it snaps to −352.857 on all three.
- A wheel −720 brings it back to 0 on all three (on the clone it couldn't move before the fix).
- Focusing the first card gives 0; Tab gives −352.857; Shift+Tab gives 0. Identical on all three.

At 1440, two cards at perView 2.8 give zero track length, so nothing moves on any page.

### 8 · Foundation model
| Element | Input | Listener | Source | Params | Reproduced |
|---|---|---|---|---|---|
| link | hover | CSS | page chunk | black → gray-600, `transition-colors` 150ms `cubic-bezier(.4,0,.2,1)` | yes (TW4 `lab(35.6 …)` vs TW3 `rgb(75,85,99)`, the same grey) |

### 9 · Pre-footer (startPercentage 10)
| Element | Input | Listener | Source | Params | Reproduced |
|---|---|---|---|---|---|
| section | scroll scrub | ScrollTrigger | `37xz28pjbnlx4.js` | clip 5% → 0, media scale 1.25 → 1 | yes |

10-point scrub (section top 900 → 360 in 60px steps): the clip reads `inset(5%)`, 4.630, 4.259, 3.889, 3.519, 3.148, 2.778, 2.407, 2.037, 1.667% on all three pages. Media scale at top 720 / 540 / 360: 1.1944 / 1.1389 / 1.0833 on all three. At top 900, Scale hasn't written a scale yet (no update before the first progress), while the clone has already set 1.25. That frame is off-screen.

### Vahue page (`/automations/scoring-decisions`, `components/automation/workflows/automotive/`)
The same fixes with the same params: the FlatCta state machine on the hero and pre-footer, the headless-ui tab keyboard model, the glass sheen easing, and WheelControls, Tab/focusin and `visibility` on the case slider. Re-measured with identical numbers to the clone (see above); no console errors, and both pages return 200. The Phases cards on the Vahue page have no video and so no play button or modal; that was a deliberate build decision, so the modal interaction doesn't apply there.

### Can't be reproduced
- The Mux HLS video in the modal (hls.js isn't installed): the poster stands in for it.
- The `aria-hidden="true"` that Scale puts on its open `role=dialog`: an accessibility bug, deliberately not copied.
- The tab pill's mount tween (Scale tweens from an unset size to tab 0 on mount, off-screen at load). The clone sets it at rest, then re-measures after web fonts load.
- HubSpot capture `mousedown`, OneTrust `keydown`/`click` and OptinMonster are third-party tracking, left out deliberately.
