# scale.com/experts → /scale-clone/experts

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a CDP 9230 tab (closed afterwards), the production chunks/CSS/RSC payload downloaded with curl, and Playwright with headless Chrome at 1440×900 and 390×844 (scripts kept in the session scratchpad: `qa.js`, `measure.js`, `inter.js`, `probe.js`).

Files: `app/scale-clone/experts/page.tsx`, `components/scale-clone/experts/*`, `public/scale-clone/experts/*`. QA: `reference-snapshots/scale-clone/qa/experts/` (`<w>-NN.jpg` = Scale left, clone right) and `qa/experts/interactions/<name>-{scale,clone}.jpg`.

`ExpertsPage({ content?, media? })` renders the page; `content: ExpertsContent` (`content.ts`) has one optional slice per section (`hero`, `cardGrid`, `domains`, `testimonials`, `resources`, `prefooter`), each section takes its slice as `content`, and `media.hero` / `media.prefooter` can replace the video/photo. The clone ships Scale's own copy so QA lines up.

## REA evidence
- `analyze_web_bundle` `ev_f3e08c71b700…`: 48/48 scripts parsed, 0 failures; Next.js (Turbopack) + React. Chunks by sha256, all byte-identical to the curl copies:
  - page chunk `3z_q0c19dxjc-.js` `054ace61…`: CardGridSection 794721 (cards + icons), DomainExpertise 558779 (tabs, word swap, logo-sphere scene, marquee), CardGrid 540409 / LinkCard 874328 / BaseCardScroll 598042.
  - `3lbyg5foru4s_.js` `b61a4fb5…`: ClientTestimonials 685963, BlogPreview 808358 + slot table 189756, CategoryIcon 280239, createScene 339682, logo-tile shaders 830333/282513, LineSegments2 + band material 391355/130728/92923. Modules 685963/808358 are identical to `3x8z3_0hhtdcb.js` (`89a4cc62…`, the enterprise-healthcare / physical-ai audits) except minifier renames (diffed module by module).
  - `3rls9s4y8-e83.js` `ac4814e5…`: three runtime 955774 (mountThreeRuntime, OrbitControls), `3kd41k7ews14b.js` `a1f1f909…` three r181.
  - Shared: `1h0nvyhf5gbrf.js` `10b2627a…` (FlatCta 892855, CMSLink 737900, AnimatedText 668761 + custom animations 947153) and `37xz28pjbnlx4.js` `b234eef5…` (FullBleed 540431, compact hero 478135, ResponsiveVideo 310080, useScrollTrigger 210104) are the same files as the security/careers/rlenvironments audits, so the FlatCta state machine (680ms reset), the #86bff2 CMSLink focus outline, the retroactive intro, useRefreshOnPageGrow and the onUpdate-only media scale were reused (careers `FlatCta`/`animatedText`, rlenvironments `motion.ts`, physical-ai `AnimatedText`).
  - Lenis `2fbrdg5m4_g_8.js` `c8dcfe22…` (shared layout runs it at lerp 0.14).
- RSC payload props: hero `478135 { compact: true }` (startPercentage 0, video + `hero-poster.webp`), CardGridSection (no props), DomainExpertise (no props), ClientTestimonials `{ heading "Expert voices", colorTheme evergreen #193A29 / contrast #ffffff, backdrop white, 2 testimonials }`, BlogPreview `{ heading "Resources", pageThemeOverride "light", 5 posts }`, pre-footer `540431` defaults (startPercentage 10, `prefooter.webp`).
- `inspect_web_event_listeners`:
  - `#domain-expertise canvas` (`ev_7cb41504d56a…`): `pointerdown`/`pointermove`/`pointerup`/`pointercancel` from the page chunk (scene drag, col 27098+), `pointerdown`/`pointercancel`/`contextmenu`/`wheel` from `3rls9s4y8` (OrbitControls, disabled), `webglcontextlost/restored/creationerror` from three.
  - `#domain-expertise button` (`ev_ec2e85fe5743…`), `.ClientTestimonials button[aria-label="Next testimonial"]` (`ev_d9d28278284b…`): HubSpot capture `mousedown` + React root `click` only.
  - `.LinkCard` (`ev_39e9e004557f…`): none (hover is CSS). `.BlogPreviewTile` (`ev_3e4fde11bca6…`): HubSpot `mousedown` only.
  - Window/document (from source): three runtime adds window `resize` (200ms debounce), passive `pointermove` + `touchmove` (scene onMouseMove) and a Lenis `scroll` subscription; DomainExpertise adds `pageshow`; ResponsiveVideo adds `pageshow/focus/scroll/resize` + `visibilitychange`; CardGrid adds `visibilitychange`; ScrollTrigger's passive `scroll` on `html` and OneTrust as on every page.

## Libraries
GSAP 3.15 (ScrollTrigger, SplitText via AnimatedText), Lenis (shared layout), three r181 (WebGL logo sphere, `three/examples/jsm/lines/LineSegments2` + `LineSegmentsGeometry` with Scale's own band shader), Framer Motion on Scale for the word swap (reproduced with GSAP and the same cubic-bezier). No Keen/Embla/Rive.

## Sections (desktop 1440 / mobile 390, Scale vs clone, px from page top)

| # | Section | Layout | Type | Measured |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection compact) | wrapper `pt-12 md:pt-24 pb-10`; ClipScroll `px-4`, card r24, `min-h 480 / 720`, `p-8 md:p-16`; video (1920×1080 Sanity mp4) with `hero-poster.webp`; `.media-overlay` computes to `linear-gradient(#0000, #000)` | h2 `clamp(2rem,.5rem+5vw,4rem)`/1.05; body1 16/1.45 → 20/1.5; FlatCta arrow/white | 1440: 135 / 1408×720 both; 390: 150 / 358×480 both |
| 2 | CardGridSection | `section.relative.z-0 > max-w-[1472px] px-6 > md:sticky md:top-20` (never sticks: same height as its parent — probe at scroll 700…1500 identical on both); CardGrid `py-12 xl:py-24`; h2 `w-4/5 md:w-full max-w-[22ch] line-clamp-2 text-balance` 32/1.05 → 40/44, mb 48 / xl 64, **noSplit (no intro)**; 4 LinkCards `lg:grid-cols-4` gap 8, `#f2f2f2` r16 (r8 <xl), `p-6 xl:p-10`, gaps 20/24/64 | card title header5 24/1.5 (18/1.35 <xl); body 16/24 `#212121`; icon = 64×64 white tile r12 (40 <md) with a Material glyph at `translate(16,16) scale(4/3)` in `#A8927C / #79648C / #929292 / #839CB2` | section 895 / 741 tall both; cards 328×381 (scaled .96 before entry) at x 31/381/731/1081 both; 390 cards 195/194/169/169 both |
| 3 | DomainExpertise | `relative z-10` wrapper; `section#domain-expertise` `z-[2] overflow-clip rounded-t-3xl bg #EAEAEA`; container `max-w-[1472px] px-6`; md 2-col grid; left column `gap-7 pt-16 pb-8 md:pt-20 lg:py-24` (pointer-events-none, pills auto); right column = canvas (696×758 at 1440); <768 marquee instead | h2 36 → 52 / 1.25, −0.01em; word same size in domain colour; pills mono 12, 0.3px tracking, `px-4 py-2 r12`, 36 tall; row label mono 10 uppercase .1em black/40 mb 8; value 16 / 18 / 20, lh 1.375, black/75, divide black/9% | 1440: 1636 / 758 (clone 762); 390: 1662 / 937 (clone 941); pills, rows and canvas at identical positions (±1px) |
| 4 | ClientTestimonials (evergreen) | `pt-20 pb-16 md:pb-20`; panel `lg:grid-inner-12`, bg evergreen r16; tabs col 2 (109² at 1440, 80² at 390 bottom row), arrows; quote cols 5–11 with 160 / 100px indent | quote header3 40/44 −0.05em (24/28 mobile), name 18 medium, role chip mono 10 white/evergreen | 1440: 821 tall both; 390: 966 both |
| 5 | BlogPreview "Resources" | `py-12 md:py-16`, `md:col-start-2 col-span-10`, heading mb 32/80; grid 4 cols gap 8, rows `minmax(70px,auto)`; slots titleOnly 1/1/5/3, overlay 1/3/6/5, caption 5/1/7/3, 6/3/7/4, 6/4/7/5; <1024 one column gap 16, 4 tiles | heading 32 → 64/1.05; titleOnly title 24 → 40/1.25; overlay 32/38; caption 16/22 medium −0.025em; chip 26px swatch + mono 11 | 1440 tiles 575×304, 575×444, 575×383, 284×243 ×2 both; 970 tall both; 390 1203 both |
| 6 | Pre-footer (FullBleedMediaSection, startPercentage 10) | wrapper `pb-8`; image `prefooter.webp`; same card/overlay as the hero | as hero | 720 / 480 tall both |

Header/footer are the shared clone chrome (390 footer 1320 vs Scale 1360 is the shared footer, not this page).

## Motion
| Element | Trigger | From → to | Ease / duration | Notes |
|---|---|---|---|---|
| Hero / pre-footer clip | ClipScroll `top bottom → center center` | `inset((1−p)·.5·startPercentage% round 1.5rem)`; hero 0, pre-footer 5% → 0 | linear | |
| Pre-footer image | same, onUpdate only | scale 1.25 → 1 | linear | hero is a video: Scale's ref goes to ResponsiveVideo which never attaches it → scale stays 1 (measured `none` on both) |
| Hero/pre-footer text + CTA | section `top center`, retroactive | AnimatedText cascade (body +.2s); CTA filledWhiteArrow (scaleX 0→1, radius 0→8, autoAlpha, .85s power3.out, arrow x −6→0 power3.inOut, delay .5) | | |
| Card (BaseCardScroll) | card `top bottom → top 50%`, scrub | scale .96 → 1, opacity 0 → 1, staggered window `l = min(.1, .85/(n−1))`, power2.out | | directionalEntrance false: no x, origin centre |
| Card icon/title/body | CardGrid `top bottom`, once, retroactive, waits for a visible tab | icon clip `inset(0 100% 0 0 round 10px)` → 0 (.5s power1.out at .05i+.125), glyph opacity 1s (+.05), title cascade +.16, body +.18 | | |
| Card hover | CSS `group-hover/card` | fill `scale: 1 0 → 1 1` from the bottom, colour = hoveredColor (#A8927C / #79648C / #929292 / #839CB2) | 500ms ease-out | text colours unchanged |
| "The best minds in" | section `top 80%`, once, + refresh check (progress > 0) | AnimatedText custom F: words opacity 0→1 .8s stagger .03, lines y 100% → 0 stagger .08 | power2.out, delay .1 | |
| Domain word | pill click | enter y 60% / 0 → 0 / 1, exit → y −60% / 0 (popLayout) | .45s cubic-bezier(.76,0,.24,1) | |
| Details | pill click | opacity → 0 (.2s power2.out), swap content + scene, → 1 (.35s, delay .05) | | |
| Sphere intro | first scene onResize (≈200ms after mount, only while visible) | group scale 0 → 1 | .7s power2.out | replays on every tab change (scene remounts) |
| Sphere idle / pointer / scroll / drag | see Interaction inventory | | | |
| Marquee (<768) | CSS | translate 0 → −50% | 14s linear infinite | |
| Testimonials | panel `top bottom → bottom 75%` scrub; section `top 80%` | bg width 90% → 100%; select 0; flip quotes .48s power2.out | | ported from the physical-ai audit |
| Blog tiles | IO .12, −6% bottom | opacity 0 / y 16 → 1 / 0, .6s, delay .05·min(i,3); title cascade +.05 | `"cubic-bezier(0.23, 1, 0.32, 1)"` is not a GSAP ease → GSAP's default power1.out (verified in node: `parseEase` → undefined) | |
| Blog image | tile `top bottom → center center` | scale 1.08 → 1 | linear | |

Reduced motion: no splits/scrubs, cascades visible; videos and the WebGL scene keep running (Scale has no reduced-motion branch in ResponsiveVideo or the three runtime); the word swap duration drops to 0.

## Interaction inventory
Inputs were identical on both sites (`inter.js`, 1440×900; `measure.js` at both sizes). Images: `qa/experts/interactions/<name>-{scale,clone}.jpg`.

### 1 · Hero (FullBleedMediaSection compact)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| video | viewport | React media props; IO + window listeners from source | 37xz28 310080 | plays only in view, no reduced-motion branch | yes (rlenvironments `observeInViewPlayback`) | — |
| media | scroll | ScrollTrigger (`html` scroll) | 37xz28 540431 | scale ref not attached to a video → `none` at scroll 0/200/400 on both | yes | — |
| text + CTA intro | `top center`, retroactive | useScrollTrigger 210104 | 37xz28 | see Motion | yes | `1440-00` |
| FlatCta | pointerenter/leave, focus | React delegated + HubSpot `mousedown` | 1h0nvyhf 892855 (same file as the careers audit) | wash −100% → 0 → +100%, 680ms reset, track snap; clone sampled −1, −.671, −.092, −.021, 0 / leave 0, .264, .795, .908, .979, .998, −1; internal href → 1px #86bff2 :focus | yes (careers `FlatCta`) | — |

### 2 · CardGridSection
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| card | scroll scrub | ScrollTrigger; `.LinkCard` none (`ev_39e9e004557f…`) | 598042 | first card top at 850/700/550/450: opacity/scale `[.356 .9742][0][0][0]`, `[.942 .9977][.851 .994][.695 .9878][.457 .9783]`, `[1][1][.992 .9997][.961 .9984]`, all 1 — **identical** on both | yes | `1440-02` |
| card | hover | CSS | 874328 | fill `scale-y` 0 → 1, 500ms ease-out (Scale 0 / .50 / .76 / .90 / .98 / 1 at 100ms steps; clone same curve, one headless frame stall) | yes | — |
| intro | `top bottom`, retroactive, visibilitychange | useScrollTrigger + CardGrid | 540409 | see Motion | yes | — |
| sticky wrapper | scroll | CSS | page RSC | `md:sticky md:top-20` never sticks (grid top 195 / −5 / −205 / −405 / −605 at scroll 700…1500 on both) | yes | — |

### 3 · DomainExpertise
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| pill | hover | CSS | 558779 | inactive text black/50 → /80, border /10 → /20, 200ms ease-out (measured on both) | yes | `sphere-idle-*` |
| pill | click | React `click` (`ev_ec2e85fe5743…`) | 558779 | word/pill at once; details opacity 1 → 0 (.2s) → swap → 1 (.35s +.05); samples on both: word in at t≈0 `y 39px op ≈0`, crossfade, details back to 1 by ≈600ms | yes | `sphere-tab-200ms-*`, `sphere-tab-healthcare-*` |
| scene remount | pill click | React key | 558779 | canvas still the old one 150ms after the click, replaced after the fade (both); intro scale 0 → 1 replays | yes | same |
| Research tab | click | — | data | 4 detail rows (Peer Reviewed Publications) on both | yes | — |
| canvas | pointerdown/move/up/cancel | page chunk (`ev_7cb41504d56a…`) | 558779 | left button, pointer capture, rotation += .004·delta, cursor `grabbing` → `auto` on release (both); release inertia `.02·last delta` if > 3e-4. Same 12-step drag lands on the **same tile layout** on both | yes | `sphere-drag-*`, `sphere-release-*` |
| canvas | wheel | OrbitControls (disabled, no preventDefault) | 3rls9s4y8 | page scrolls 240px for a 300 wheel on both | yes | — |
| window | pointermove / touchmove | three runtime 955774 | 3rls9s4y8 | target spin y = 35e-5 + (x−.5)·24e-5, x = 8e-5 − (y−.5)·24e-5, eased .03/frame; ignored while dragging or off-screen | yes | `sphere-mouse-{tl,br}-*` |
| Lenis scroll | scroll | runtime | 955774 | group rotation.y target .82·(scrollY/(docH−innerH) − .5), eased .06/frame | yes | — |
| window resize | resize | runtime | 955774 | 200ms debounce → setSize + refit (v.scale = .36·min(1, fit)) | yes | — |
| window | pageshow (persisted) | 558779 | 558779 | remount scene + ScrollTrigger.refresh | yes | — |
| marquee (<768) | CSS | — | 558779 | 14s linear, list ×ceil(10/n) ×2 (36 tiles for Finance on both) | yes | `390-05` |

WebGL internals aren't exposed on Scale's `window`, so the sphere was compared by source constants (identical) and same-input screenshots; tile positions match frame for frame.

### 4 · ClientTestimonials
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| arrow | hover | React | 685963 | bg alpha 0 / .557 / .886 / 1 at 0–300ms (Scale) vs 0 / .557 / .89 / 1 (clone) | yes | — |
| arrow | click | React `click` (`ev_d9d28278284b…`) + Lenis scrollTo(root, −24) | 685963 | section top 229→170→149→141→137→136 (Scale) vs 250→178→151→145→138→136; tile fills ±106.7px over .3s, identical end state | yes (physical-ai port) | `testimonial-next-*` |
| tiles | click / roving tabIndex | React | 685963 | 150ms colour (Scale's `transition-duration-800` isn't a utility) | yes | — |

### 5 · BlogPreview
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tile | viewport | IO | 808358 | entrance mid-flight samples: tiles 3–5 opacity .868 / .8005 y 2.11 / 3.19 (Scale) vs .869 / .802 y 2.09 / 3.17 (clone) | yes | — |
| image | scroll scrub | ScrollTrigger | 808358 | 4 points, all 5 slots: identical (1.08 → 1.0713 → 1.0356 → 1 on the overlay tile) | yes | — |
| image | hover | CSS `group-hover` | 808358 | `scale` 1 → 1.05, 1000ms ease-out (1.042 at 500ms on both) | yes (fixed: was `transform`, now the `scale` property) | `blog-hover-*` |
| chip label | load | image luminance (64² canvas) | 808358 | desktop: hfc + genai dark (#101010), outlier + rl white; mobile all white — matches | yes | — |
| desktop/mobile count | media query | useSyncExternalStore | 808358 | 5 tiles ≥1024, 4 below / on the server | yes | `1440-07`, `390-09` |

### 6 · Pre-footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + image | scroll scrub (10 points, 60px apart) | ScrollTrigger | 540431 | clip 5 / 4.630 / 4.259 / 3.889 / 3.519 / 3.148 / 2.778 / 2.407 / 2.037 / 1.667%, scale — / 1.2315 / 1.213 / 1.1944 / … / 1.0833: **identical** on both | yes | `1440-09` |
| CTA | hover / focus | as hero | 892855 | as hero | yes | — |

## QA
- 1440 and 390: every section top/height within 4px of Scale (the 4px is DomainExpertise label line rounding: mono 10px label 1px taller per row). Cards, testimonials, blog grid and pre-footer sizes are identical. No console errors on the clone; the page returns 200.
- Mono metrics differ from Scale's mono (7.5 vs 7.75px/char at 12px), which wrapped the pills differently at 390; pill tracking is 0.046em instead of 0.025em so widths and wraps match (Software Engineering 207 vs 202 → row break identical).
- In the scripted side-by-side the Scale hero CTA was missing in two captures; a direct probe (`probe2.js`) shows it at opacity 1 at load, after scrolling away and back, so it's a capture artefact.

## Remaining gaps
- Third-party logos are not shipped (as in the enterprise clone): sphere tiles, mobile marquee tiles and testimonial tabs show the institution name in black, sized into Scale's logo box. `Logo.src` renders the real mark (CSS mask / silhouette texture) if a page provides one.
- Media are Scale's (hero video, poster, pre-footer photo, resource covers, downscaled to 1200px wide); a Vahue page must pass its own `media` and covers.
- Scale's `oml:` short-landscape variants are not reproduced.
- Fonts: Vahue faces (Scale's Aeonik is commercial); line breaks match at both QA sizes.
