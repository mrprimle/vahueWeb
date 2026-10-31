# scale.com/physical-ai: clone spec

Source: https://scale.com/physical-ai. Clone: `/scale-clone/physical-ai/` (`app/scale-clone/physical-ai/page.tsx` → `components/scale-clone/physical-ai/`).
Captured 2026-10-31 at 1440×900 and 390×844 with Playwright (computed styles, mid-animation sampling) and the page's production chunks (`37xz28pjbnlx4.js`, `1h0nvyhf5gbrf.js`, `197mu5y2fw9hi.js`, CSS `3ektzubma58z1.css`, `0npdyq12us3md.css`).

The header and footer are shared and not part of this spec. All type is the display face (Scale: Aeonik) except eyebrows, the testimonial heading and the role chip (mono). Tracking is −0.01em everywhere unless noted. Copy is placeholder (`content.ts`, marked `TODO: Vahue copy`), sized so every block wraps to the same number of lines as Scale's at both widths.

## Sections, top to bottom

Y positions are relative to the hero top (1440 / 390). After QA the clone matches every section top and height at both widths.

| # | Section | Layout | Type / spacing |
|---|---|---|---|
| 1 | **Hero** (FullBleedMediaSection in ClipScrollSection, `startPercentage 0`) | wrapper `pt-24 pb-10`; 16px side gutter; card 1408×720 (358×480 mobile), radius 24, `clip-path: inset(0 round 1.5rem)`; padding 64 (32 mobile); content bottom-aligned, `flex-col gap-6`, max-w 72rem | H2 `clamp(2rem, .5rem+5vw, 4rem)` / 1.05, white. Body 20/1.5 (16/1.45 mobile). CTA arrow pill (below). Logo strip: `mt-4 gap-2 max-w-md`, 6px triangle + 10px uppercase +0.05em label `#929292`; marquee `opacity .4`, gap 32, logos ≤70×28. Media: `#193A29` fill, image cover, overlay `linear-gradient(#0000, #000)` only (`.media-overlay`'s `background` shorthand cancels `bg-black/45`; see REA verification) |
| 2 | **Product overview** | legacy section `pt-16 pb-16 md:pt-20`; container max 1280, px 24 / 32 (1216 content); header `max-w-3xl md:mt-12 mb-10` centred | Eyebrow 12/24 mono +1px uppercase (black here, `#525252` elsewhere), `mb-5`. H2 48/1.25 (30/1.375 mobile; 40 at md). 2-col grid `gap-x-14 gap-y-12`; item `flex gap-4`: 44×44 icon tile (radius 8, `bg black/9%`, 1px `black/10%`, 22px icon), h4 24/1.5 regular, p `mt-4` 16/1.5 `#525252` |
| 3 | **Client testimonials** (evergreen) | `pt-20 pb-20` (pb 64 mobile); 12-col grid gap 8, px 24 (8 cols, px 12 mobile); panel bg `#193A29` radius 16, width 90%→100%; inner `lg:py-20`, `p-8` mobile. Left column col 2 (109px): heading, tiles (109² , radius 8, 1px white, gap 8, `mb-2`), arrows (50² at 1440, 40² mobile, radius 6). Right: cols 5–11, `flex-col justify-between gap-16` | Heading 12/1.375 mono medium uppercase. Quote 40/44 (24/28 mobile), tracking −0.05em, first-line indent 160px (100 mobile), line masks add 0.12em → 48.8px pitch. Name 18/1.25 medium (16 mobile), right-aligned at lg. Role chip mono 10px, white bg, evergreen text, radius 4, `p-1 px-2`. Mobile: header row (heading w-1/2 + arrows), quote stack (grid-area 1/1, height = longest quote), name, 80px tile row |
| 4 | **Use case** | legacy section; 2-col grid `gap-12` (`gap-8` mobile), items centred | h3 24/1.5 medium `mb-4`; p 16/1.5 gray-700 (`#364153`), `mb-4` between. Isometric PNG 584 wide, natural ratio, in `rounded-2xl` wrapper (overflow visible ≥md) |
| 5 | **Key features: embodiments** | legacy section; header with 20/1.6 subtitle (`black/70`, `lg:mt-2`); 3-col grid `xl:gap-x-10 gap-y-14` (`md:gap-6`, 1 col mobile gap 56) | Card image 4:3, radius 12 + `::after` 1px `#fff3` hairline, img radius 8; title `mt-12` (`mt-8` mobile) 24/1.5; body `mt-3` 16/1.65 `black/70` |
| 6 | **Environments** | as 5, eyebrow empty (keeps its 20px margin) | as 5 |
| 7 | **Annotations + chart** | legacy section; row 1 media-left 2-col `gap-12`; row 2 `mt-16` text-left | Multimodal screenshot 584×427. Chart: `aspect-video` `#080808` radius 12, SVG 580×360 (axes `rgba(255,255,255,.7)` 1.5px, labels 13px), three log curves `#E05533` / `#7B6FF0` / `#52C041` (ceilings .4/.65/.9, stroke 2.5) |
| 8 | **The difference** | legacy section, no eyebrow; `flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; items `basis-1/4 grow md:max-w-[368px]` (368 wide at 1440, x 112/536/960) | icon tile, h4 `mt-6` 24/1.5, p `mt-4` 16/1.5 `#525252` |
| 9 | **Prefooter** (FullBleedMediaSection, `startPercentage 10`) | wrapper `pt-16 pb-8`, backdrop gray-50 `#f9fafb`; same card as hero, no body/logos | H2 as hero; CTAs: arrow pill + border button (1px white, radius 6, `px-4 py-2`, 14px medium) |

Breakpoints: 768 (md: section top padding, 2-col cards), 1024 (lg: 2/3-col grids, testimonial desktop grid, H2 48), 1280 (xl gaps). The testimonial switches tile slide axis at `max-width: 768px`.

## Motion

Libraries on the page: GSAP 3.15.0 (ScrollTrigger, SplitText), Lenis 1.3.21 (lerp 0.14, run by the shared clone layout), React/Next. No three.js, carousel library or Rive on this page. No cursor-reactive elements; pointer interaction is limited to CTA/arrow hovers and testimonial clicks.

| Element | Trigger | Start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero + prefooter clip (ClipScrollSection) | outer wrapper | `top bottom` → `center center` | `clip-path: inset(startPercentage/2 % round 1.5rem)` → `inset(0%)` (hero 0 → 0, prefooter 5% → 0) | linear map of progress | `scrub: true` |
| Hero + prefooter media | section | `top bottom` → `center center` | `scale 1.25` → `1` | linear map | `scrub: true` |
| Hero/prefooter intro | section | `top center`, once, retroactive | — | CTAs `animateIn({duration .85, delay .5})`; headline then body `animateIn` with `delay .2 × i` | no |
| AnimatedText default (H2, body) | via intro | — | SplitText `lines,words`, masked lines (+0.12em pad/−0.12em margin). Lines `yPercent 400, opacity 0` → 0/1; words `x 30%, opacity 0` → 0/1; colour `#72CE7B` → `#79648C` → CSS colour | per line `i`: line at `.08i`, 1s `power3.out`; line colour at +.22 (.3276s) then .4524s `power1.inOut`; words at +.04, .9s `power3.out` stagger .03, colour at +.198 (.29484s) then .40716s | no |
| CTA "filledWhiteArrow" intro | via intro | — | root `autoAlpha 0, scaleX 0, radius 0` (origin left) → 1/1/8; inner `scaleX 0→1`; label opacity 0→1; arrow `x −6→0` | root .85s `power3.out` at 0; inner .85s at .1; label at .75; arrow .85s `power3.inOut` | no |
| CTA "fadeIn" intro (border) | via intro | — | `autoAlpha 0 → 1` | .85s `power3.out` | no |
| CTA hover (arrow) | pointer | — | 35% `currentColor` wash `-translate-x-full → 0`, exits `→ translate-x-full`, resets after 680ms; arrow strip `-50% → 0` | CSS 600ms ease-out | no |
| CTA hover (border) | pointer | — | 30% wash `translate-y-full → 0`, exits up; label `scale .9` | CSS 300ms ease-out | no |
| Logo marquee | mount | — | `translate(0) → translate(-50%)` over 2 copies | CSS 40s linear infinite (motion-safe) | no |
| Testimonial panel bg | panel | `top bottom` → `bottom 75%` | `width 90% → 100%` | `power3.out` (dur 1.15) | `scrub: true` |
| Testimonial select | section | `top 80%`, once | index −1 → 0 | — | no |
| Quote / name flip (customAnimation `d`) | index change | — | in: lines `rotationX −90, yPercent 108` (perspective 900, origin 50% 100%) → 0; out: `rotationX 90, yPercent −max(108, (h+pad+1)/h·(900+h)/900·100)` | .48s `power2.out` stagger .05; old quote out at 0, new quote in at .35s; old name out .5s, new name in .5s | no |
| Role chip | index change | — | width → 20px, swap text, text opacity → 1, width → text + 26px | .5s `power3.out` (opacity .5s none), delay .05 | no |
| Logo tiles | index change | — | white fill `y ±100% → 0` (desktop) / `x` (mobile) | .3s | no |
| Arrow buttons | hover | — | bg `white/0 → white`, colour white → evergreen, border → transparent | .3s | no |
| Model chart | IntersectionObserver 25% | — | `stroke-dashoffset len → 0`; labels opacity 0 → 1 | 1.6s `cubic-bezier(.4,0,.2,1)`, delays 0/.3/.6; labels .5s ease at delay+1.45s | no |

Legacy sections (2, 4–8) have no scroll motion on scale.com.

Verified in the clone by sampling inline transforms mid-animation against scale.com: hero line `yPercent` / colour curves, CTA `scaleX`, prefooter clip (`5% → 4.698% → 2.846% → 1.611% → 0%` at scrollY 5200/5500/5800/6000/6300) and media scale (`1.25 → 1.2349 → 1.1423 → 1.0806 → 1`), and testimonial bg width (1253 → 1329 → 1387 → 1392 px at scrollY 500/800/1100/1400) all match to the pixel. Reduced motion: no splits or scrubs, clip at 0, testimonials swap by opacity.

## Assets (`public/scale-clone/physical-ai/`)

- `hero-robotics-lab.webp` (1920×1078), `prefooter.webp` (1920×882, re-encoded from Scale's 7952px JPEG via its image endpoint)
- `use-case.png` (isometric illustration, 564×332 source), `img-multimodal.webp`
- `img-embodiment-1..3.webp`, `img-environment-1..3.webp`
- `icons/icon-*.svg`: the nine Material outline icons used in the feature tiles (also inlined in `icons.tsx`)
- Not downloaded: Scale logo, customer logos (hero strip uses neutral 70×18 placeholder tiles inside the 70×28 logo bounds).

## QA

Screenshots in `reference-snapshots/scale-clone/qa/physical-ai/`: `1440-{scale,clone}-00..10` (every 80% of the viewport), `390-{scale,clone}-00..08` (every 125%). Section tops and heights match Scale at both widths (verified by script, not only by eye). Page returns 200, no console errors, `tsc` clean for these files.

## Remaining gaps

- ~~Clicking a testimonial arrow doesn't scroll the section with Lenis.~~ Fixed in the interaction audit below (arrows and tiles both scroll, through `window.__lenis`).
- On Scale, the testimonial flip-in starts about 100ms later after a click than in the clone (React/Lenis overhead on their side). Durations, eases and staggers match.
- ~~The model chart's curves stay hidden until 25% in view.~~ Now as on Scale: fully drawn until the observer fires, then they snap to hidden and draw in (interaction audit below).
- Testimonial tiles show the client name. Scale's code supports client logos in the tiles, but this page uses names only.
- Hero logo strip uses placeholder tiles (TODO: partner logos).
- Scale's `lg:line-clamp-8` on the quotes is not applied. The placeholder quotes fit in 8 lines, and `max-h-[8lh]` with `overflow-y: clip` is kept.
- Scale's screenshots include their cookie banner overlay (not part of the page).


## REA verification (2026-10-31)

**Fingerprint:** REA `analyze_web_bundle` on a fresh CDP tab (127.0.0.1:9230, `include_script_sources: true`) — evidence `ev_9e1f3fbba6f13eff…`, 35/35 scripts parsed, 0 failures; Next.js (Turbopack chunks) + React. Chunk graph: page chunks `197mu5y2fw9hi.js`, `0mp_wvkveczep.js`; shared `37xz28pjbnlx4.js`, `09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`, `0sle6wl7ucd3b.js`. No three.js/WebGL, Rive or Embla on this page.

**FullBleedMediaSection (read from chunk `37xz28pjbnlx4.js`, identical on all six pages):**
- `FullBleedMediaSection({ startPercentage = 10, overlayVariant = 'flat', ... })` renders `ClipScrollSection` with `startPercentage` and **`startScale: 1`**, so ClipScrollSection's own inner `scale()` stays 1 (it always reads `transform: scale(1)` live).
- FullBleedMediaSection **also runs its own scrub** on the `<section>`: `start 'top bottom' → end 'center center'`, `onUpdate: scale = mapRange(progress, 0, 1, 1.25, 1, clamp)` set on the media wrapper (image div or video). So the media **does** scale 1.25 → 1. The automotive note ("no media scale") is refuted for this page: live samples below show `matrix(1.233…)` → `1.1636` → `1.0941` → `1`.
- ClipScrollSection: trigger = its own wrapper div, `top bottom → center center`, `clip-path: inset(mapRange(p, 0, 1, 0.5·startPercentage, 0)% round 1.5rem)`.
- The hero is rendered with `startPercentage 0` (live hero clip reads `inset(0%)` at every scroll position). The pre-footer uses the default 10, so it runs 5% → 0.
- Overlay: SSR markup is `media-overlay … bg-black/45` (`overlayVariant 'flat'`), but `.media-overlay { background: linear-gradient(#0000 0%, #000 100%) }` (CSS chunk `3ektzubma58z1.css`) uses the `background` shorthand, which resets `background-color`. Computed `background-color` is `rgba(0, 0, 0, 0)` on both sections, so the overlay is **gradient only, with no 45% black** (confirms the automotive note).
- AnimatedText intro (chunk `1h0nvyhf5gbrf.js`): lines `yPercent 400, opacity 0` → 0/1, 1s power3.out at `0.08·i`; words `x 30%` → 0, 0.9s power3.out, stagger 0.03 at +0.04; tint `#72CE7B` → `#79648C` (0.3276s at +0.22) → CSS colour (0.4524s). The clone matches.

**Live samples (Playwright, 1440×900, 225px steps, values read from inline style / computed transform):**

| scrollY | section | clip | media scale |
|---|---|---|---|
| 0 | hero (top 135) | inset(0%) | 1.0139 |
| 5400 | pre-footer (top 942) | inset(5%) | — (not started) |
| 5625 | pre-footer (top 717) | inset(3.87037%) | 1.1935 |
| 5850 | pre-footer (top 492) | inset(2.48148%) | 1.1241 |
| 6075 | pre-footer (top 267) | inset(1.09259%) | 1.0546 |
| 6300 | pre-footer (top 42) | inset(0%) | 1 |
Overlay computed `background-color: rgba(0,0,0,0)` on both.

**Listener map (REA `inspect_web_event_listeners`, direct listeners on the first match):**
- `[role=tab]` (feature / model tabs) and `button[aria-label="Next testimonial"]`: HubSpot `mousedown` (capture) plus `click` (`42ixmvih7808g.js`) only. (ev_0ad9f582, ev_dd751e89)
- `.LogoMarquee` (hero logos): no listeners. It's a CSS/GSAP marquee with no hover pause. (ev_5483b5cb)
- `.FullBleedMediaSection a`: the same delegated pair. (ev_168250b2)
- No Keen, canvas or `pointermove` on this page.

**Result:**
- **Confirmed:** `startPercentage` 0 (hero) and 10 (pre-footer), the clip trigger on the wrapper, media scale 1.25 → 1 on the section, and the AnimatedText intro. The clone already took these per instance.
- **Fixed:** the overlay. The clone combined `bg-black/45` with `bg-[linear-gradient(...)]`. In this repo's Tailwind those set `background-color` and `background-image` separately, so both applied. It is now `[background:linear-gradient(#0000_0%,#000_100%)]` (shorthand, as on Scale), and the computed bg-color is transparent. The section-table note "overlay `bg-black/45` + gradient" above should read "gradient only".
- Clone re-sampled: the pre-footer with its top at 450 reads `inset(2.27778%)` and scale 1.1139, against Scale's 2.2222% and 1.1111 (a 0.05% difference from the 2px taller clone card). No console errors.
- QA re-shot: `qa/physical-ai/1440-{scale,clone}-rea-{hero,prefooter}.jpg`.
- **Still unknown:** none.

## Interaction audit (2026-10-31)

**Method.** REA on a fresh CDP 9230 tab of scale.com/physical-ai: `analyze_web_bundle` (ev_4bea7658e124…, 46/46 scripts parsed, 0 failures), `inspect_web_event_listeners` on `html` (ev_67135ca089e7…), `body` (ev_ed97f690d84…), `.FullBleedMediaSection` (ev_4acf872f2ca1…), `.ClientTestimonials` (ev_0e57e423d05b…), `.ClientTestimonials button[role=tab]` (ev_8e4e4b1557e…) and the previous arrow (ev_fcbd1fab728…). React handlers (onPointerEnter, onClick, onMouseEnter) are delegated to the root, so REA can't see them on the element; I traced them in the chunk sources instead. The page chunk `197mu5y2fw9hi.js` holds ClientTestimonials (module 685963), FeaturesWithIcons (460138) and the chart (77633). Module 685963 is byte-for-byte the same code as on /data-engine after normalising minified names, and `1h0nvyhf5gbrf.js` (FlatCta 892855, AnimatedText 668761) and `37xz28pjbnlx4.js` (FullBleedMediaSection) are identical files. So the data-engine audit's findings for these modules apply here as well. Then Playwright (1440×900 and 390×844), with identical inputs on scale.com, `/scale-clone/physical-ai/` and `/automations/document-intake/`. The inputs: hover enter/leave/re-enter on every in-page CTA (sampled at 0/60/120/200/320/700/900 ms), the testimonial reveal (0–2200 ms), arrow hover, next-arrow click, tile click, the previous-arrow wrap, the mobile arrow click, the chart's IntersectionObserver on a fresh load, the pre-footer scrub at 10 points, and a 6×4 cursor grid sweep at 4 scroll depths (compared against the same wait without a sweep). Scripts: `scratchpad/pai-audit/qa.js`, `qa2.js`. Images: `qa/physical-ai/interactions/`.

**Window / document level.** `html` has a passive `scroll` listener (ScrollTrigger's scroller cache, `1h0nvyhf5gbrf.js`) plus the OneTrust `keydown`/`click` listeners. `body` has one passive `touchstart` (ScrollTrigger). Lenis 1.3.21 runs through lenis/react (`useLenis`, module 255667). There's no `pointermove`, `mousemove` or `wheel` listener anywhere, no Keen/Embla, and no canvas/WebGL (the three.js chunk is preloaded through 120064 but not mounted). The cursor grid sweep changed exactly 1 element on all three pages at every depth (the CSS logo marquee, which also changes with no mouse), so there are **no cursor-driven effects**.

### 1. Hero FullBleedMediaSection
| Element | Input | Listener (REA) | Source module | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip wrapper / media | scroll | ScrollTrigger (html scroll, ev_67135ca0) | `37xz28pjbnlx4.js` FullBleedMediaSection + ClipScrollSection | startPercentage 0 (no clip), media scale 1.25 → 1, `top bottom → center center`, scrub | yes (verified in the REA pass above) | `../1440-*-rea-hero.jpg` |
| headline / body / CTA | enter `top center` (once) | ScrollTrigger | `1h0nvyhf5gbrf.js` AnimatedText 668761 + FlatCta reveal | as in the Motion table | yes | n/a |
| "Book a Demo" CTA (arrow, white) | pointerenter / pointerleave | React delegated (no direct listeners, ev_4acf872f) | FlatCta 892855 | wash `translate-x` −100% → 0 → +100%, 600ms ease-out, opacity .35. It resets on the wash `transitionend` or after 680ms (snaps with no transition, released after 2 rAF). Re-entry while leaving snaps back first. Chevron track −50% → 0 (600ms) on enter, **snaps back on leave** | **fixed** (re-entry used to reverse from the exit side; no transitionend reset) | `1440-{scale,clone,vahue}-cta0-hover.jpg` |
| logo marquee | none | none (CSS animation, no hover pause) | `animate-logo-marquee` | 40s linear, −50% | yes | n/a |

Hover samples, wash position in % of its own width. Enter: Scale −100 / −81 / −56 / −35 / −16 / 0 at 0/60/120/200/320/700 ms; the clone gives −100 / −81 / −56 / −35 / −16 / 0. Leave: 0 → 19 → 44 → 65 → 84, then reset to −100 by 700 ms (both). Re-enter 80 ms after leaving: Scale −100 / −100 / −73.6 / −42.2 / −10.8 at 0/40/100/200/400 ms; the clone gives −100.3 / −100.3 / −73.8 / −42.4 / −10.7. **Before the fix** the clone gave 20.6 / 16.7 / 11.5 / 6.5 / 1.4, sliding back from the exit side. Track: −50 → −40.5 → −27.9 → −17.4 → −8 → 0 on enter, −50 at once on leave, re-enter −50 / −44.7 / −30.6 / −17.4 / −3.9 (identical on all three).

### 2. Product overview, 4. Use case, 5. Embodiments, 6. Environments, 8. The difference
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| all children | hover / click / scroll | none (static legacy markup: no anchors, no hover/transition classes in the SSR of these sections) | FeaturesWithIcons 460138, legacy SideBySide/cards | n/a | n/a (nothing to reproduce) | n/a |

### 3. Client testimonials (ClientTestimonials, module 685963, evergreen, 2 items)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel bg | scroll | ScrollTrigger | 685963 | width 90% → 100%, power3.out, scrub, `top bottom → bottom 75%` | yes | n/a |
| section | enter `top 80%` (hook 210104) | ScrollTrigger | 685963 | state −1 → 0. `safeIndex = min(index, n−1)` is −1 before entry, so **no tile is selected** (fills at y 100%, labels white), and the chip is empty (26px) | **fixed**: the clone clamped to 0, so tile 0 rendered selected (fill at 0, evergreen label) before entry | `1440-*-testimonial-entered.jpg` |
| quote / name / chip | index change | same | AnimatedText 668761 customAnimation (flip) + `animateToText` | as in the Motion table (flip .48s power2.out stagger .05; quote in at .35, name out/in at .5; chip 20px → text + 26px) | yes | same |
| tile `[role=tab]` | activation | React state | 685963 `c` | fill y ±100% → 0 / 0 → ∓100%, 0.3s, GSAP default ease (x below 768px). Label colour white ↔ evergreen with `transition-all`. Scale's `transition-duration-800` isn't a utility class, so the computed duration is the **0.15s** default | **fixed** (the clone used `duration-[800ms]`: computed 0.8s) | same |
| tile | click | React delegated `onClick` (REA: HubSpot `mousedown` capture + `click` on 42ixmvih7808g.js, ev_8e4e4b1557e) | 685963 `ei` | Lenis `scrollTo(root, { offset: −24 })`, then select. The root keeps `scroll-mt-28`, so it lands at 136px | **fixed** (was select only, no scroll) | n/a |
| prev / next arrow | click | React delegated (ev_fcbd1fab728: same pair) | 685963 `ea` | same Lenis scroll, then index −1 / +1 with wrap-around | **fixed** (no scroll before) | `1440-*-next-click.jpg`, `390-*-next-click.jpg` |
| prev / next arrow | mouseenter / mouseleave | React delegated | 685963 `a` | GSAP `to` .3s (default ease): bg `rgba(255,255,255,0)` → white, colour white → `#193A29`, border white → transparent; reverse on leave | yes | n/a |
| tablist | keyboard | none (no arrow-key handler; roving `tabIndex` 0 on the active tile, −1 on the others) | 685963 | n/a | yes (same markup) | n/a |

**Samples.** Before entry, all three show `sel 00`, fills `y 99.7%`, labels white, tile transition `0.15s all`, chip 26px empty, and section height 717. Reveal: Scale's fill goes 99.7 → 55.6 → 17 → 0 % at 0/100/200/350 ms; the chip goes 26 → 20 px by 350 ms, gets its text at ≈700 ms and reaches 125 px by 1000 ms. The clone runs the same sequence about 300 ms earlier: fill at 0 by 100 ms, chip text by 350 ms, 120 px by 700 ms. As on /data-engine, that offset is Scale's main-thread latency, not a parameter.

**Arrow hover.** Background alpha 0 / .545 / .886 / 1 at 0/100/200/400 ms on all three. Leave: 1 / .25 / 0.

**Next click** (section top at 250). Scale: top 188 / 164 / 150 / 143 / 137 / 136 at 0/100/200/300/500/800 ms. Clone: 250 / 179 / 157 / 145 / 137 / 136. Vahue: 199 / 178 / 154 / 144 / 137 / 136. Tile fills: Scale's tile 0 goes to +99.7 and tile 1 from −47 → 0 by 300 ms; the clone matches by 300 ms.

**Tile click** (section top at 500). Scale 407 / 253 / 187 / 158 / 140 / 136 at 0/100/200/300/500/1000 ms; the clone 500 / 293 / 204 / 165 / 141 / 136. The previous arrow at index 0 wraps to the last item on all three.

**390 next click.** Tile fills move on x. Scale 59.5 / 69 / 95 / 100 % and −40.5 / −31 / −5 / 0 at 0/100/200/400 ms; the clone 45.7 / 63.2 / 92.5 / 100 and −54.3 / −36.8 / −7.5 / 0. The section lands at 136 on all three.

### 7. Annotations + model chart (ProvenModelImprovementsChart, module 77633)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| chart root | IntersectionObserver (threshold .25, once) | IO (not an event listener) | 77633 | before: paths drawn, no dash, labels opacity 0. On intersect: dash = length, offset = length; after 2 rAF, `stroke-dashoffset` → 0 over 1.6s `cubic-bezier(0.4,0,0.2,1)`, delays 0 / .3 / .6; labels opacity → 1 over .5s ease at delay + 1.45s | **fixed** (the clone hid the paths with opacity 0 until intersect) | `1440-*-chart-peek.jpg`, `1440-*-chart-drawing.jpg` |
| multimodal screenshot | none | none | legacy | n/a | n/a | n/a |

Peek (40 px of the chart visible, fresh load): Scale, clone and Vahue all read `nodash, offset 0, label 0`. Draw (scrolled to 200 px visible): the clone reads 381.5 / 423.6 / 465.3 px at 0 ms and 0 / 6.1 / 39.7 px at 1500 ms; the labels reach 1 by 2400 ms. Scale draws the same curve about 300 ms later (IO → React render latency): 50 / 158 / 387 px at 1000 ms against the clone's 20.7 / 79.6 / 240.

### 9. Pre-footer FullBleedMediaSection
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip wrapper / media | scroll | ScrollTrigger | 37xz28pjbnlx4.js | clip inset 5% → 0, media scale 1.25 → 1, `top bottom → center center` | yes | `../1440-*-rea-prefooter.jpg` |
| arrow CTA + "Build AI" border CTA | pointerenter / leave | React delegated | FlatCta 892855 | arrow as in the hero. Border: wash `translate-y` 100% → 0 → −100%, 300ms ease-out, opacity .30; label `scale .9` (CSS group-hover, 300ms ease-out); same reset and re-entry rules | **fixed** (re-entry; shared FlatCta) | `1440-*-cta2-hover.jpg` |

10-point scrub (wrapper top 900 → 0 in 100 px steps), identical on all three: clip 5 / 4.383 / 3.765 / 3.148 / 2.531 / 1.914 / 1.296 / 0.679 / 0.062 / 0 %; media scale 1.25 / 1.2191 / 1.1883 / 1.1574 / 1.1265 / 1.0957 / 1.0648 / 1.034 / 1.0031 / 1. Border CTA re-entry: 100 / 100 / 55.8 / 16.1 / 0 % at 0/40/100/200/400 ms (Scale, clone, Vahue). At 320 ms after entering, the arrow wash sits at −16.1% on all three.

### Fixes in this pass
- `FlatCta.tsx`: Scale's state machine (reset on `transitionend` or after 680ms, re-entry snap, arrow track snaps back on leave).
- `Testimonials.tsx`: unselected until `top 80%` (`safeIndex` can be −1); arrow and tile clicks scroll the section through Lenis (`window.__lenis.scrollTo(root, { offset: -24 })`, with a smooth `scrollTo` fallback); tile transition 150ms.
- `ModelChart.tsx`: curves stay drawn until the observer fires (no opacity-0 pre-state).
- Same changes on `/automations/document-intake` (`components/automation/workflows/physical-ai/`: FlatCta, CaseResults; it imports the clone's ModelChart).

### Not reproducible / not applicable
- The ~300 ms reveal and chart-draw latency on scale.com is runtime jank, not a parameter.
- Scale's `lg:line-clamp-8` truncation (visible as "in…" on the second quote) stays unapplied (see Remaining gaps).
- Scale's metric-variant and pin-on-exit branches of module 685963 (`variant: 'metrics'`, `pinOnExit`) are off on this page.
