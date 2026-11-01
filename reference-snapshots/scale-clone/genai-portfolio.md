# scale.com/genai-portfolio → /scale-clone/genai-portfolio

Captured 2026-10-31 at 1440×900 and 390×844. I used Playwright with Chrome, and fetched and pretty-printed the production chunks: `0sni47mcvnqwg.js` holds the Sgp* slices, `1h0nvyhf5gbrf.js` AnimatedText, `2k1qlgdxlbmz1.js` HeadlineWithCta/CardGrid, `37xz28pjbnlx4.js` ClipScrollSection, `058pnujclak3f.js` Faqs and `3x8z3_0hhtdcb.js` ClientTestimonials/BlogPreview. I also downloaded the stepped-video configs from `/static/stepped-video/sgp-{intro,flywheel}.json`.

Files: `app/scale-clone/genai-portfolio/page.tsx` and `components/scale-clone/genai-portfolio/*`:
- `GenAiPortfolioPage.tsx`, `Hero`, `Intro`, `Sections` (ClipScroll, TwoColumn, Stack, TrustCards), `Flywheel`, `Lower` (Differentiators, Security, Testimonials, Demo, Faqs, Blog), `FlatCta`
- `motion.ts` (AnimatedText port), `framePlayer.ts` (frame scrubber and edge controller), `styles.module.css` (grid, type ladder, CTA)

Assets are in `public/scale-clone/genai-portfolio/` and QA shots in `reference-snapshots/scale-clone/qa/genai-portfolio/`.

## Global
- Page body height: clone 16986 vs Scale 16989 at 1440; 17673 vs 17668 at 390.
- Grid: `grid-layout-desktop` is 12 × `minmax(0,150px)`, gap 8, px 24, centred. Mobile is 8 × 1fr. `grid-layout-desktop-double` is 24 columns (SgpStack). The breakpoint is 768. Scale's `oml:` (landscape phone, max-height 500) variants are not ported.
- Type ladder, desktop → <768px:
  - header2: 64/1.05 → 32
  - header3: 40/1.25 → 24/1.05
  - header4: 32/1.5, −0.03em → 24/1.05
  - header2b: 21/1.25 → 20
  - header5: 24/1.5 → 22
  - body1: 20/1.5 → 16/1.45
  - body3: 14/1.5
  - mono: 13/1.2 uppercase → 10
- Tracking is −0.01em everywhere except where noted. The type uses Vahue fonts (font-display / font-mono). The site-wide h1–h6 base rule (white, semibold, tracking-tight) is neutralised inside `.page`.
- Colours:
  - gray-10 #212121, gray-20 #373737, gray-30 #575757, gray-60 #929292, gray-80 #c7c7c7, gray-90 #eaeaea, gray-95 #f2f2f2
  - evergreen #193A29, atlas-blue #273252, foundry-tan #A8927C, archive-purple #79648C, cloud-slate #839CB2

## Sections (top → bottom, 1440 tops)
| # | Section | Layout | Notes |
|---|---|---|---|
| 1 | SgpHero (39, 100vh, black) | video column 2–6, self-centre (575² transparent webm); copy column 8–11: h3 header3 leading-none, sub 16/24 #929292, gap 24, then a 40px gap to the logo marquee (opacity .5, gap 32, 35px row, 40s linear −50%). Phone: video column 2–7 scale 1.1, copy centred | scroll cue bottom 5vh, right 48: body3 medium + 34px bordered box with arrow loop |
| 2 | SgpIntro (939, 600vh) | inner h-dvh pinned for 7 viewports with pinSpacing false; the next section slides over it. Scene fills the pin (top 50dvh on phones). Step copy at top 112 (chip 32px, 12px gap, title header3 leading-none, body 14/21 #c7c7c7, col 2, xl span 3). Intro h4 header4 at top 128 (hidden on phones). Controls at the bottom: 40px #212121 buttons r8, "Scroll to explore" 10px, 2px progress track | track clip `inset(0 0 0 18%)` scaleX(100/82) translateX(−18%); 8px black ticks at 18/38/59/79% |
| 3 | TwoColumnTextWithVideo (461) | py-24, empty 64px heading row, then a 64px gap; h4 header4 leading-9 in column 2–6, p 16/24 + CTA (14 medium + arrow) in column 8–11 | copy is noSplit, so static |
| 4 | SgpStack (757, black) | #212121 panel r16 (inset 24); headline xl:span 7 at 64,32; video 720² absolute at left 45% −50%; cards in column 18–24 (377 wide), 211 min height, #373737, r12, p32, gap 8 | card title header2b, body 14 #929292, accent triangle 17px |
| 5 | Section, evergreen (985) | py-32; content xl column 2–11; CardGrid py-24; h3 header3 centred, mb 64; 3 cards gap 8, bg white/13, r16 (r8 below xl), p32 (p24), gap 64 | parallaxFadeOut |
| 6 | SgpFlywheel (150vh, overflow clip) | h-dvh panel py-24, column 2–11; Background #eaeaea r16; intro column 36% p48; label chip top/left 64; counter right 64; steps panel flex-1, video flex-1.3 (mix-blend-darken) | steps: mono label + 32px/1.2 text; 48px buttons r4 |
| 7 | TwoColumnTextWithVideo + video (1085) | video column 2–11, aspect-video, rounded-2xl, in a ClipScroll (start 20) | left h4 + "Learn more"; right two paragraphs |
| 8 | SgpPlatformDifferentiators (881) | py-20; h4 header2 (48 at md, 64 at xl) column 8–11; table gap 120 below; header row mb 32 (Capabilities 16/24, pills r6 37px, first black); rows 78 tall alternating white / #f2f2f2, label body1 column 1–3, marks column 8–12, 24px boxes r4 | tooltips #eaeaea p24 r6 |
| 9 | SgpSecurity (838, #c7c7c7) | pt-28 pb-16, row gap 112; h3 header3 column 5–8 + link; badges column 10–11 (px12 py4, border #212121, r8, gap 8); image row 360 (312 on phones) r16 in ClipScroll (start 10, scale 1.2) | |
| 10 | ClientTestimonials (834) | pt/pb 80; foundry-tan panel r16 (90% → 100% width); py-80 inside; column 2 holds the label, 3 square tabs (109) and arrows (50); quote column 5–11 at 40/44 −0.05em with a 160px indent; name 18 medium right-aligned + black mono chip | phones: arrows top-right, tabs (80) at the bottom |
| 11 | SgpDemo (900, black) | copy column 2–4, self-centre with pb 15vh; 3 screenshots column 6–9, `h-[min(420px,52vh)]`, aspect 1.5, r16, skewY 18°, top i·34, mt 8vh, back cards dimmed .8/.9 | arrow CTA (white, 32px black icon) |
| 12 | Faqs (666) | ClipScroll (black, start 8, scale .9, progressOffset .4); #f2f2f2 card r16 pt24; h2 header2; rows py24, icon column 1, question column 5–7 (24/36 medium), answer column 9–11 | phones: 16/22 bold, answer row 2 |
| 13 | BlogPreview (994, black) | py-16; heading 64/1.05 centred, mb 80; bento in column 2–11: left = text tile 304 + image/caption tile 407; right = full-bleed image 468 + two 243 tiles; gap 8 | phones: one column, gap 16, order T1, chart, cubes, track, pill |

## Motion
| Element | Trigger / range | From → to | Ease / duration / stagger | Mode |
|---|---|---|---|---|
| AnimatedText (default) | per caller | SplitText `words,lines`, mask lines (±0.12em). Lines `yPercent 400, op 0` → 0/1; words `x 30%, op 0` → 0/1; colour #72CE7B → #79648C → CSS colour | line 1s power3.out @0.08·i; colour +.22 (.3276s), then .4524s power1.inOut; words .9s power3.out stagger .03 @+.04 | one-shot |
| AnimatedText out | — | words yPercent −30 / op 0; line yPercent −100 / op 0 | .4s / .5s power3.in, @0.08·i | one-shot |
| "fade" variant (intro body) | — | lines yPercent 50 → 0; words op 0 → 1; out: lines −50 / 0 | T = max(.85, .55, (L−1)·.052+.2, (W−1)·.025+.2) (.85 = animateIn's default duration, used by h() as a floor); power3.out / power2.out; out .32s stagger .055 power2.in | |
| "rise" variant (stack card copy) | — | lines y 100% → 0; words op → 1 | .5s stagger .08 / .8s stagger .03 power2.out | |
| "flip" variant (testimonials) | — | lines rotationX −90, yPercent 108 (perspective 900, origin 50% 100%) → 0; out rotationX 90 / −108 | .48s stagger .05 power2.out | |
| Hero | mount | video op 0 → 1; h3, sub, cue label | 1s @2; AnimatedText @1.5 / 1.6 / 1; marquee @2.2; cue box autoAlpha .25s @1; arrow y −100% → 0 .5s, repeatDelay 5 | |
| Intro entry | section `top bottom-=30%` → `top top` | lines frames 0 → 93 (00:00 → 03:03) | linear | scrub |
| Intro pin | pin `top top` → `+=7·vh` | scrub = p/(5/7); lines frame 93 + scrub·360; step = last edge whose fromMs ≤ frame (5:01, 7:18, 10:05, 12:17); entering a scrollable edge plays it on the tris layer, then its loop edge; loop edges replay only when scrolling back; tris = frame 0 below frame 160 | linear; tris 30fps | scrub + pin (pinSpacing false) |
| Intro copy | scrub ≤ .1 / > .1 | h4 + body in / out | default / fade; body +.1 | |
| Intro steps | step change | previous out; new in (title, body +.2, chip op .5s power2.out). Chip colour per step; dark text from step 3 | | |
| Intro scene rect | resize | textureContain: uScale = clamp(.75, 1, map(1024..1728)), uOffset (1, 0) above 1280, (.5, .5) at 769–1280; ≤768: scale 2, offset tweens per step to (0,1) (.5,.5) (1.5,.5) (.5,1.5) | .5s power2.out | |
| Intro arrows / keys | click, ←/→ on the focused region | scroll to the middle of the step's percent window × (height − vh) | `Lenis.scrollTo(y)` with its default lerp (0.14) | |
| Stack panel | section `top bottom` → `bottom 75%` | scale .98 → 1 (origin centre top) | power3.out 1.15 | scrub |
| Stack video | `top center` | op 0 → 1, restart; leave-back → op 0, pause, cards out (.1·i) | 1s | toggle |
| Stack cards | card `top 85%` | title in, copy rise, triangle op 0 / y 20 / x −10 → 0 | delay .25·i, .85s power2.out; leave-back out .1·i | toggle |
| Stack headline | IntersectionObserver rootMargin −15% | title @.5, sub @1 | | one-shot |
| Evergreen section | `bottom 100%` → `bottom top` | section yPercent 0 → 20; inner op 1 → 0 (from .15) | power3.in / none | scrub |
| Trust cards (BaseCardScroll) | card `top bottom` → `top 50%` | scale .96 → 1, op 0 → 1, x −160 / 0 / +160 → 0 (origin right / centre / left) | power2.out on a staggered progress (r = min(.1, .85/(n−1))) | scrub |
| Trust heading / cards text | grid `top bottom` | AnimatedText @.125 (+.1·i, body +.14) | | one-shot |
| ClipScroll | `top bottom` → `center center` | clip inset(start/2 % → 0, round r) + scale start → 1 | linear map (progressOffset) | scrub |
| Flywheel video intro | `top center-=15%` → `top top+=1%` | frames 00:00 → 02:02 (24fps) | linear | scrub |
| Flywheel pin | pin `top top` → measured 0.5 vh later (Scale passes `bottom bottom-=50%` but its spacer gets 450px padding at 1440×900; the clone uses `bottom bottom`) (pinSpacing true inside 150vh) | enter → expand: proxy 0 → 1 (2s power3.out): Background clip inset-left l% → 0, steps clip map(.2..1, 100 → 0), intro y 0 → −100, label x .45w → 0 + span swap, counter y 100% → 0, arrows op. Leave-back → collapse | buttons scale .9 → 1 @1+.1i; intro copy out (in @1+.1i on collapse) | toggle |
| Flywheel steps | arrows / keys | edges 0,1 → loop 1,2; step 2: 2,3 → 3,4 → 4,5 → 5,6 → loop back to 3,4; step 3: 6,7 → loop 7,8; step 4: 8,9 → loop 9,10 | step copy in/out (+.2) | |
| Differentiators | heading `top 80%`; table `top center+=20%` | dividers scaleX 0 → 1; labels in; marks scale 0 → 1 | stagger .25 1.2s power2.out; labels @.1i; marks @.1·row + .1·col | one-shot |
| Tooltip | hover cell with note | clip inset(0 100% 100% 0 r10) → inset(0 r4); note op/scale .8 → 1 | .4s / .3s power1.out "<0.1"; reverse on leave | |
| Security heading | `top bottom-=20%` | AnimatedText | | one-shot |
| Testimonials panel | `top bottom` → `bottom 75%` | width 90% → 100% | power3.out | scrub |
| Testimonials switch | `top 80%` / tabs / arrows | old quote out, new in @.35; old name out @.5, new in @.5; role chip width → 20, text swap, width → text+26; tab fill y (x on phones) per Scale's direction rules; tab/arrow click scrolls the section to −24px (Lenis) | .3s fills; chip .5s power3.out | |
| Demo cards | `top bottom` → `bottom bottom` | translate(x vw, −y vw) skewY 18: x = i·200 + p·1.3(i+1), y = i·90 + p·1.4(i+1), p = progress·50 (/1520; phones 80/50, /390) | linear | scrub |
| Demo copy + CTA | `top bottom-=50%` | h3 @0, sub @.5; CTA filledWhiteArrow @1 (autoAlpha/scaleX/radius 0 → 8, arrow x −6, label @.75) | .85 power3.out | one-shot |
| FAQ | click | answer height → scrollHeight / 0; icon bar rotate 90 | .5s; CSS .3s | |
| Blog tiles | IntersectionObserver on the slot (threshold .12, rootMargin `0 0 -6% 0`) | op 0 → 1, y 16 → 0 (scaleDir "none", no scale); title AnimatedText in @.05 | .6s cubic-bezier(.23,1,.32,1), delay .05·min(i,3) | one-shot |
| Blog images | card `top bottom` → `center center` | image wrapper scale 1.08 → 1; hover img 1.05 | linear map; hover 1000ms ease-out | scrub |
| FlatCta hover | pointer | Scale's state machine (1h0nvyhf5gbrf mod 892855): fill in, leave to the far side, 680ms reset, re-entry snap; arrow strip −50% → 0, snaps back on leave; label scale .9 | 300ms (arrow 600ms) cubic-bezier(0,0,.2,1) on the `translate` property | CSS + React state |

Cleanup: every effect runs inside `gsap.context` and reverts it, and SplitText is reverted on unmount. Frame players remove their listeners and kill their tweens.

Reduced motion: no splits, scrubs or pins. The intro shows the settled step-1 frame and copy. The flywheel starts expanded. Text shows immediately.

## Libraries found
- GSAP 3.15: ScrollTrigger, SplitText, plus ScrollToPlugin in the clone for the intro arrows.
- Lenis: the shared layout instance.
- three.js r181 RawShaderMaterial: the intro and flywheel quads.
- WebCodecs VideoDecoder: Scale's "active-frame" player decodes a custom length-prefixed H.264/H.265 container whose JSON manifest trailer holds the avcC description, the frame index and a GOP of 5.
- zustand-like store for the step index, headless-ui Dialog (blog video tile), styled CSS modules.
- No Rive, Keen Slider or Embla on this page.

## Assets (public/scale-clone/genai-portfolio)
- `hero.webm` and `stack.webm`: VP9 with alpha.
- `dialect.mp4`, `security.jpg`, `demo-1..3.png` and `blog-1..4.webp`.
- `intro-lines.mp4`, `intro-tris.mp4` and `flywheel.mp4`: remuxed from Scale's `.bin` streams. Tris were pre-multiplied by the tris mask in RGB. All are H.264, GOP 5, no B-frames, faststart.

Skipped: Scale logo, customer logos (marquee, testimonial tabs and name logo are neutral placeholder tiles) and the nav assets.

## QA
- 12 stops at 1440 (every 1.5 viewports) and 8 at 390 (every 2.6 viewports), Scale against clone, saved as `1440-scale-NN.jpg` / `1440-clone-NN.jpg` and `390-…`.
- Section tops agree within about 20px down the page, and total height within 5px.
- No console errors on the clone; the page returns 200.
- The clone's intro scrub was checked frame by frame against frames extracted from Scale's streams: step chips, titles and the triangle loops all play.

## Remaining gaps
- **Scale's intro and flywheel scenes don't render in headless Chrome.** Its WebCodecs player never resolves, so `1440-scale-01..04` show the intro as black, and the flywheel canvas is black too. I compared those sections against the decoded source frames and the source code instead.
- The scenes use `<video>` seeking instead of a decoder plus shader. Scrubbing is slightly coarser on very fast scroll. The tris/mask composite is a CSS `screen` blend rather than the shader's mask mix, so `uCrossfade` (always 0 on this page) is not ported.
- **Safari won't show the hero and stack videos.** They are VP9-alpha webm, and Scale's HEVC-alpha `.mov` fallbacks were not downloaded.
- Flywheel: Scale's `awaitComplete` / `useActualPreviousEdge` chaining is simplified; edges play immediately on step change. The pin on the `top center-=15%` trigger is not replicated: it measured as not pinning.
- Blog: Scale's tiles 2 and 4 render as plain `div`s (no post link, no video button on this page), so no modal is needed.
- `oml:` landscape-phone variants are not ported.
- No cursor-reactive sections on this page beyond the hover tooltips and CTAs, so no mouse-position shots were taken.
- All copy, links and logos are placeholders (`TODO: Vahue copy`).

## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab (closed afterwards). `analyze_web_bundle` `ev_97e262b79408…` parsed 46/46 scripts with 0 failures. Chunks compared by sha256:
- FlatCta / AnimatedText `1h0nvyhf5gbrf.js` (`10b2627a…`) and ClipScroll / useScrollTrigger / FlatCta intros `37xz28pjbnlx4.js` (`b234eef5…`) are byte-identical to the security, evaluation-enterprise and enterprise-insurance audits, so their FlatCta findings carry over. The security clone's FlatCta was ported verbatim.
- Page slices `0sni47mcvnqwg.js` (`0e137e33…`): SgpSteppedVideo/SgpFlywheel 154479, Differentiators 420112, Security 146778, SgpDemo 309685.
- Faqs `058pnujclak3f.js` (`b0ed240d…`) mod 966098. ClientTestimonials 685963 and BlogPreview 808358 / 189756 in `3x8z3_0hhtdcb.js` (`89a4cc62…`). HeadlineWithCta 925107 and BaseCard entrance 598042 in `2k1qlgdxlbmz1.js` (`bb51ad26…`). OrbitControls in `3rls9s4y8-e83.js` (`ac4814e5…`).

`inspect_web_event_listeners` ran on every section root and its interactive children (ids below). Then Playwright ran identical inputs on scale.com, the clone and `/automations/knowledge-agents` (script `scratchpad/gp-audit/qa.js`) at 1440×900, plus 390×844 for the flywheel and the differentiators sheet. The inputs:
- intro scrub at 11 points through the 7-viewport pin; Next click and → key, scrollY sampled every 100ms; wheel over the scene
- flywheel at 11 points from one viewport before to the end of the pin; the 2s expand sampled every 200ms; step buttons, button hover, ←/→ keys, collapse on leave-back
- the tooltip enter/leave sampled every 80ms, plus the last column; the 390 sheet open/close
- security link hover, focus
- testimonials chip intro, arrow hover/leave, Next click (scroll + tab fills every 100ms), tab clicks, wrap
- demo cards at 11 scroll points, the CTA intro sampled every 100ms, CTA hover/leave/re-enter, focus
- FAQ open (heights every 100ms), icon bars, re-click, border-CTA hover/leave, focus
- blog: entrance, image scale at 11 points, hover
- a jump to the page bottom (late one-shot triggers)
- a mouse grid over 8 sections (transform/opacity/colour/clip of every node before and after)

QA images: `qa/genai-portfolio/interactions/<name>-{scale,clone,vahue}.jpg`. The flywheel-expanded shots are from the 390 run.

Page-wide listeners (CDP `DOMDebugger.getEventListeners` on window/document, plus REA `ev_e9f9458b871…` on `html`, `ev_758c6fb3437…` on `body`):
- `html`: ScrollTrigger `scroll` (passive)
- `body`: `touchstart` (passive)
- window: ScrollTrigger/Lenis `wheel`/`resize`/`scroll` and `pageshow` and `visibilitychange` (useScrollTrigger), plus analytics, OneTrust and OptinMonster
- React handles clicks at the root (`42ixmvih7808g.js` `click` on every button); HubSpot adds a capture `mousedown` (`4823527.js`)

The mouse grid found **no pointer-tracking effect** on any section, on all three pages. The 1-node changes were the hovered tooltip cell and the demo CTA.

### 1 · SgpHero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section | — | none (`ev_272c62789acd…`) | 63135 | mount timeline only (video, AnimatedText, marquee, scroll cue loop) | yes (build QA) | — |

### 2 · SgpIntro (SgpSteppedVideo, 600vh, pin 7 vh)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| root `.SgpIntro` | scroll scrub | none on the root (`ev_37b2cc67bbc2…`); ScrollTrigger via `html` | 154479 (X) | 11 points, scroll 939 → 7239: step index and fill identical on both pages: fill 0 / .14 / .28 / .42 / .56 / .7 / .84 / .98 / 1 / 1 / 1; steps 0,0,1,2,2,3,4,4,4,4,4; Prev/Next disabled states identical | yes | `intro-scrub-4-*` |
| region | ← / → keydown (focused, `tabIndex 0`) | React `onKeyDown` | 154479 eT | `eR(step ± 1)`: target = top + (start+end)/200 × (h − vh), `Lenis.scrollTo(y)`, then `setActiveStep` next frame | yes. **Fixed**: the clone tweened `window` with ScrollTo 1.2s power2.inOut. It now calls the shared Lenis (`window.__lenis.scrollTo(y)`, default lerp) with Lenis' scroll as the base. → from step 2: Scale 3122 → 3322, 3758, 3995, 4077, 4112 … 4139; clone 3122, 3700, 3976, 4068, 4108 … 4139 | — |
| Prev / Next `.arrow-control-button` | click | React `click` + HubSpot `mousedown` (`ev_22da58ca576…`) | 154479 B | same `eR`. Next from step 1: Scale 2289 → 2741, 2965, 3054, 3093 … 3122; clone 2289 → 2447/2762, 2852/2967, 3004/3055 … 3122 (first-sample jitter) | yes (fixed with the keys) | — |
| scene canvas | pointerdown / wheel / contextmenu | OrbitControls (`ev_fd22bced918…`, `3rls9s4y8-e83.js`) | scene `setup()` sets `controls.enabled = false` | wheel over the scene is not prevented: 300px of wheel scrolls the page 240px (Lenis ×0.8) on both | yes (inert on both) | — |
| intro copy / step copy | scrub `e ≤ .1` / step change | — | 154479 eu/ed, step x | fade body: **fixed** T floor 0.85 (animateIn's default `duration` feeds `h()`; the clone used 0.55) | yes | — |

### 3 · TwoColumnTextWithVideo · 7 · TwoColumnTextWithVideo + video
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Learn more" link | hover / click | React `click` + HubSpot `mousedown` (`ev_919a959ae90…`) | 857484 | no hover classes (static) | yes | — |
| video ClipScroll | scroll | ScrollTrigger | 656598 | `top bottom` → `center center`, start 20 | yes (build QA) | — |

### 4 · SgpStack · 5 · Evergreen CardGrid
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section roots | scroll | none (`ev_9e5a01f0d4b2…`) | 290276 / 540409 | scrub-only (panel scale, cards, parallax fade-out); no hover classes | yes (build QA) | — |

### 6 · SgpFlywheel (150vh)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| pin + expand | scroll | none on root (`ev_e973b844c97b…`) | 154479 H | **Fixed**: Scale's panel stays at 96px from `top top` for 450px only (spacer padding `0 0 450px`), then scrolls away; the clone pinned for 900px (`bottom bottom-=50%`). It now ends at `bottom bottom`. Grey-box top at 11 points: Scale 996, 816, 636, 456, 276, 96, 96, 96, 6, −174, −354; the clone and Vahue are identical, and 390 matches too (… 24, 24, −61 / −60 …). Expand: clip 45.82% → 0, label x 521 → 0 over 2s power3.out, same samples ±3% | yes | `flywheel-expanded-*` (390) |
| collapsed rest | mount | — | eu() on mount | **Fixed**: the arrow buttons rest at opacity 1, scale .9 (Scale's mount-time collapse); the clone had opacity 0 | yes | — |
| narrow (<1280) collapsed clip | scroll | — | ec() | **Fixed**: `(A.offsetTop + G.offsetHeight + 32) / box` (under the intro copy), not `1 − video/box`. 390: Scale 33.2%, clone 31.0% (the clone's intro copy is shorter) | yes | — |
| video intro scrub | scroll | — | useScrubTimeline 681201 | `top center-=15%` → `top top+=1%`; **fixed**: `onLeave` kills it (no re-scrub on the way back) | yes | — |
| step buttons `.aspect-square` | click / hover | React `click` + HubSpot `mousedown` (`ev_9c5fc7946ba…`) | 154479 I | fill `scale-y 0 → 1`, 300ms: Scale 0, .175, .775, .969, 1; clone 0, .176, .776, .983, 1. Counter 01 → 04 on both | yes | — |
| step triangles | step change | — | step x | **Fixed**: only the triangle fades (0.5s power2.out); the clone faded the label row too. Every triangle takes the *current* step's colour. Mid-switch: Scale .1012 / .8988 tan, clone .1025 / .8975 tan | yes | — |
| root | ← / → (focused) | React `onKeyDown` | eC / eP | `min(step+1, 4)` / `max(step−1, 1)`; **fixed**: ← from the collapsed step 0 opens step 1. Keys 04 → 03 → 04 on both | yes | — |

### 8 · SgpPlatformDifferentiators
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| cell `.group/card` | mouseenter / mouseleave | React (root delegated; buttons `ev_a596af7912c…`) | 420112 f | clip `inset(0 100% 100% 0 round 10px)` → `inset(0 round 4px)` 0.4s power1.out, note op/scale .8 → 1 0.3s `<0.1`; reverse on leave. Enter: Scale 91.7, 62.8, 29.4, 11.2, 1.6, 0%; clone 90.7, 56.3, 29.7, 11.2, 1.6, 0%. Last column opens left (1154–1382) on both. Note map (true/false per cell) identical | yes | `diff-tooltip-*` |
| mark button (phones <769) | click | React | 420112 N | **Fixed**: the sheet (`bg-black/20`) mounts with `pointer-events: none` (close button `auto`) and fades in 0.3s power2.out; close unmounts it at once. Open: Scale .45, .82, .98, 1; clone 0, .62, .91, 1 (one-sample offset) | yes | `diff-mobile-note-*` |
| heading / table reveal | scroll | useScrollTrigger (top 80%, `top center+=20%`) | 420112 | row `animateIn({duration 1.2, ease})`: the default variant ignores both | yes | — |

### 9 · SgpSecurity
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "View standards +" (CMSLink) | hover | React `click` + HubSpot `mousedown` (`ev_648da8d24ce…`) | 146778 / 737900 | **Fixed**: `hover:text-white` (150ms: 33 → 219 → 255 on both), and the underline turns white instantly (`group-hover/link:bg-white`) while scaling in 300ms | yes | — |
| same | focus | — | CMSLink | **Fixed**: `solid 1px` in currentColor (measured rgb(33,33,33); the skyblue class doesn't resolve on this link) | yes | — |

### 10 · ClientTestimonials
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| role chip (ClientName) | first enter / switch | — | 685963 `animateToText` | **Fixed** (was static): empty 26px chip; width → 20 (0.5s power3.out, +.05), text set, width → text + 26. Scale 26, 25, 21, 20, 20, 20, 47, 70, 79, 82; clone 26, 24, 21, 20, 20, 20, 60, 109, 130, 137 (longer placeholder title) | yes | — |
| arrows | mouseenter / leave | React (`ev_73b4120cfa4…`) | 685963 s | **Fixed** (was CSS `transition-colors`): GSAP 0.3s bg rgba(1,1,1,0) → #010101, colour → #A8927C, border → transparent. bg α Scale 0, .46, .80, .97, 1; clone .12, .56, .85, .99, 1 | yes | — |
| arrows / tabs | click | React | 685963 ei / el | **Fixed**: `lenis.scrollTo(section, {offset: −24})` first (Scale 12796 → 12723, 12627, 12589 … 12560; clone 12790 → … 12554). Wrap rules: left from ≤0 → last, right from last → 0 | yes | `testimonials-after-*` |
| quote / name / tab fill | switch | — | 685963 | **Fixed**: the name now goes in at .5 (not .35 on the first show) and the old name leaves at .5. Tab fills use Scale's rules (active from −100%, +100% if coming from a later tab or for tab 0; leaving to +100%, −100% for the last tab or when 0 becomes active), and uninvolved tabs keep their last position. 0 → 2: Scale tab 0 12, 67, 98, 107 / tab 2 −94, −40, −8, 0; clone 13, 67, 98, 107 / −94, −40, −8, 0 | yes | — |

### 11 · SgpDemo
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| cards | scroll | ScrollTrigger + body ResizeObserver | 309685 | **Fixed**: before entry the cards sit in the idle layout (no parallax term, from the ResizeObserver) and jump to the scroll layout on the first update; the clone had applied it on refresh. 11 points identical to 4 decimals | yes | — |
| CTA intro (filledWhiteArrow) | `top bottom-=50%` | useScrollTrigger | 961870 | **Fixed**: chevron x −6 → 0 starts at 0 (was +0.1); label opacity takes the default 0.5s from 0.75 (was 0.85s power3.out). Root/radius samples match within .01; label .2466, .559, .785, .946 vs .2466, .554, .781, .928 | yes | — |
| CTA (`button.FlatCta`) | pointerenter / leave | React + HubSpot (`ev_401341d011b…`) | 892855 | wash/strip: enter −1 → 0 / −.5 → 0; leave 0 → 1, reset −1 at 680ms; strip snaps to −.5; re-enter −1, −.736, −.422 on both | yes (FlatCta fix) | `cta-demo-arrow-hover-*` |
| CTA focus | focus | — | button, no CMSLink | Scale shows the UA ring on a `<button>`; the clone's `<a>` gets the site focus style (no CMSLink outline: `external`) | partial | — |

### 12 · Faqs
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| question button | click | React `click` + HubSpot (`ev_b59fcefacbd…`) | 966098 u | height → ResizeObserver `scrollHeight` / 0, 0.5s (default ease). **Fixed**: the clone tracks the height with a ResizeObserver too. Open item 2: Scale 0, 72, 131, 175, 202, 211; clone 0, 59, 104, 137, 156, 163 (same curve, shorter answer). Re-click on the open one does nothing | yes | `faq-open-2-*` |
| icon bars | state | — | | 16×2px bars (scale-x 1.2), rotate 90° when closed, 300ms | yes | — |
| CTA (border FlatCta, internal) | hover / focus | React + HubSpot (`ev_2b7a12d6610…`) | 892855 | wash y 1 → 0 (300ms) → −1, reset at 680ms; label scale .9; focus 1px #86bff2. Leave: −.536, −.839, −.972, −1 … then 1 on both | yes (FlatCta fix) | — |

### 13 · BlogPreview
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tile entrance | IntersectionObserver on slot | — | 808358 + 598042 (BaseCardViewportEntrance, scaleDir "none") | **Fixed** (the clone used scale .96 and threshold .15): opacity 0 / y 16 → 1 / 0, threshold .12, rootMargin `0 0 -6% 0`, .6s cubic-bezier(.23,1,.32,1), delay .05·min(i,3). Pre: `0 / y16` on all 5 tiles, post `1 / 0` on both | yes | `blog-tiles-*` |
| tile titles | visible | — | 808358 `$` | **Fixed** (were static): AnimatedText `animateIn({delay .05})` on visibility. A jump to the bottom leaves tile 1's title hidden on both (its slot never intersects) | yes | — |
| image wrapper | scroll | ScrollTrigger | 808358 | **Fixed** (missing): scale 1.08 → 1, card `top bottom` → `center center`. 11 points match per tile, e.g. 1.0688, 1.0561, 1.0435, 1.0309 … | yes | — |
| image | hover | React `click` + HubSpot (`ev_febf0d0b1f3…`) | `group-hover/*:scale-105` | 1000ms ease-out: Scale 1, 1.025, 1.038, 1.045, 1.049, 1.05; clone 1, 1.026, 1.039, 1.046, 1.049, 1.05 | yes | — |
| tiles 2 and 4 | — | — | | plain `div` (no link) on Scale; same in the clone | yes | — |

### Vahue `/automations/knowledge-agents`
`components/automation/workflows/genai-portfolio/` got the same fixes, with the same params: FlatCta state machine and CSS, the motion.ts fade floor, intro arrows/keys on Lenis (plus step 0, as on Scale), and the flywheel (pin span, button rest state, narrow clip, triangle fade/colour, ← from 0, intro scrub killed on leave). Lower also got the tooltip sheet, security link hover/focus, the Results chip/arrows/scroll/fills/name timing, the demo idle layout and CTA intro, the FAQ ResizeObserver, and the blog entrance/titles/image scale/hover.

Measured with the same script:
- intro Next 2251 → 3082 on a Lenis curve; ← / → work; wheel not prevented
- flywheel pin 96 ×3 then 6 / −174 / −354 (390: 24 ×3, −60) and steps 01–04; button fill .175 / .776 at 160 / 240ms
- the tooltip and the 390 sheet as above; link white on hover, focus 1px currentColor
- the chip animates 20 → 96px; the arrow tween ends at #010101 / #A8927C; fills match Scale's rules
- the demo CTA enter/leave/re-enter identical to Scale; FAQ heights animate to the ResizeObserver height, CTA focus #86bff2
- blog pre/post `0 y16` / `1 0`, image scale and hover as on Scale
- no console errors

### Not reproduced
- Scale's WebCodecs frame players and shader composite (the clone scrubs `<video>`s; the Vahue page has its own three scenes). Step logic and timings match.
- The flywheel's `awaitComplete` edge chaining (see Remaining gaps).
- Demo CTA focus ring: Scale's CTA is a `<button>` that `router.push`es `/demo`; the clone keeps an `<a>`.
- HubSpot `mousedown`, OneTrust and OptinMonster listeners: third-party, deliberately left out.
