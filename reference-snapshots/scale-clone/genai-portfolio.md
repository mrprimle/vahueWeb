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
| "fade" variant (intro body) | — | lines yPercent 50 → 0; words op 0 → 1; out: lines −50 / 0 | T = max(.55, (L−1)·.052+.2, (W−1)·.025+.2); power3.out / power2.out; out .32s stagger .055 power2.in | |
| "rise" variant (stack card copy) | — | lines y 100% → 0; words op → 1 | .5s stagger .08 / .8s stagger .03 power2.out | |
| "flip" variant (testimonials) | — | lines rotationX −90, yPercent 108 (perspective 900, origin 50% 100%) → 0; out rotationX 90 / −108 | .48s stagger .05 power2.out | |
| Hero | mount | video op 0 → 1; h3, sub, cue label | 1s @2; AnimatedText @1.5 / 1.6 / 1; marquee @2.2; cue box autoAlpha .25s @1; arrow y −100% → 0 .5s, repeatDelay 5 | |
| Intro entry | section `top bottom-=30%` → `top top` | lines frames 0 → 93 (00:00 → 03:03) | linear | scrub |
| Intro pin | pin `top top` → `+=7·vh` | scrub = p/(5/7); lines frame 93 + scrub·360; step = last edge whose fromMs ≤ frame (5:01, 7:18, 10:05, 12:17); entering a scrollable edge plays it on the tris layer, then its loop edge; loop edges replay only when scrolling back; tris = frame 0 below frame 160 | linear; tris 30fps | scrub + pin (pinSpacing false) |
| Intro copy | scrub ≤ .1 / > .1 | h4 + body in / out | default / fade; body +.1 | |
| Intro steps | step change | previous out; new in (title, body +.2, chip op .5s power2.out). Chip colour per step; dark text from step 3 | | |
| Intro scene rect | resize | textureContain: uScale = clamp(.75, 1, map(1024..1728)), uOffset (1, 0) above 1280, (.5, .5) at 769–1280; ≤768: scale 2, offset tweens per step to (0,1) (.5,.5) (1.5,.5) (.5,1.5) | .5s power2.out | |
| Intro arrows / keys | click, ←/→ | scroll to the middle of the step's percent window × (height − vh) | 1.2s power2.inOut (Scale uses Lenis.scrollTo) | |
| Stack panel | section `top bottom` → `bottom 75%` | scale .98 → 1 (origin centre top) | power3.out 1.15 | scrub |
| Stack video | `top center` | op 0 → 1, restart; leave-back → op 0, pause, cards out (.1·i) | 1s | toggle |
| Stack cards | card `top 85%` | title in, copy rise, triangle op 0 / y 20 / x −10 → 0 | delay .25·i, .85s power2.out; leave-back out .1·i | toggle |
| Stack headline | IntersectionObserver rootMargin −15% | title @.5, sub @1 | | one-shot |
| Evergreen section | `bottom 100%` → `bottom top` | section yPercent 0 → 20; inner op 1 → 0 (from .15) | power3.in / none | scrub |
| Trust cards (BaseCardScroll) | card `top bottom` → `top 50%` | scale .96 → 1, op 0 → 1, x −160 / 0 / +160 → 0 (origin right / centre / left) | power2.out on a staggered progress (r = min(.1, .85/(n−1))) | scrub |
| Trust heading / cards text | grid `top bottom` | AnimatedText @.125 (+.1·i, body +.14) | | one-shot |
| ClipScroll | `top bottom` → `center center` | clip inset(start/2 % → 0, round r) + scale start → 1 | linear map (progressOffset) | scrub |
| Flywheel video intro | `top center-=15%` → `top top+=1%` | frames 00:00 → 02:02 (24fps) | linear | scrub |
| Flywheel pin | pin `top top` → `bottom bottom-=50%` (pinSpacing true inside 150vh) | enter → expand: proxy 0 → 1 (2s power3.out): Background clip inset-left l% → 0, steps clip map(.2..1, 100 → 0), intro y 0 → −100, label x .45w → 0 + span swap, counter y 100% → 0, arrows op. Leave-back → collapse | buttons scale .9 → 1 @1+.1i; intro copy out (in @1+.1i on collapse) | toggle |
| Flywheel steps | arrows / keys | edges 0,1 → loop 1,2; step 2: 2,3 → 3,4 → 4,5 → 5,6 → loop back to 3,4; step 3: 6,7 → loop 7,8; step 4: 8,9 → loop 9,10 | step copy in/out (+.2) | |
| Differentiators | heading `top 80%`; table `top center+=20%` | dividers scaleX 0 → 1; labels in; marks scale 0 → 1 | stagger .25 1.2s power2.out; labels @.1i; marks @.1·row + .1·col | one-shot |
| Tooltip | hover cell with note | clip inset(0 100% 100% 0 r10) → inset(0 r4); note op/scale .8 → 1 | .4s / .3s power1.out "<0.1"; reverse on leave | |
| Security heading | `top bottom-=20%` | AnimatedText | | one-shot |
| Testimonials panel | `top bottom` → `bottom 75%` | width 90% → 100% | power3.out | scrub |
| Testimonials switch | `top 80%` / tabs / arrows | old quote/name flip out, new in @.35 / @.5; tab fill y (x on phones) ±100% → 0 | .3s | |
| Demo cards | `top bottom` → `bottom bottom` | translate(x vw, −y vw) skewY 18: x = i·200 + p·1.3(i+1), y = i·90 + p·1.4(i+1), p = progress·50 (/1520; phones 80/50, /390) | linear | scrub |
| Demo copy + CTA | `top bottom-=50%` | h3 @0, sub @.5; CTA filledWhiteArrow @1 (autoAlpha/scaleX/radius 0 → 8, arrow x −6, label @.75) | .85 power3.out | one-shot |
| FAQ | click | answer height → scrollHeight / 0; icon bar rotate 90 | .5s; CSS .3s | |
| Blog tiles | IntersectionObserver | scale .96, op 0 → 1 | .6s cubic-bezier(.23,1,.32,1), delay .05·min(i,3) | one-shot |
| FlatCta hover | pointer | currentColor fill slides in (300ms, arrow 600ms track), label scale .9 | cubic-bezier(0,0,.2,1) | CSS |

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
- The testimonial role chip's text scramble (`animateToText`) is static.
- The blog video-modal tile is not built.
- `oml:` landscape-phone variants are not ported.
- No cursor-reactive sections on this page beyond the hover tooltips and CTAs, so no mouse-position shots were taken.
- All copy, links and logos are placeholders (`TODO: Vahue copy`).
