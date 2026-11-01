# scale.com/public-sector/national-security → /scale-clone/public-sector-national-security

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a CDP 9230 tab (closed afterwards), production chunks / CSS / RSC payload downloaded with curl and the page modules pretty-printed (esbuild), Playwright (headless Chrome) at 1440×900 and 390×844 with the same scripts on both sites (`shots.js`, `probe.js`, `cmp.py`, `inter.js` in the session scratchpad `pns/tools`).

Files: `app/scale-clone/public-sector-national-security/page.tsx`, `components/scale-clone/public-sector-national-security/*`, `public/scale-clone/public-sector-national-security/*` (≈960 KB: 19 webp/png photos and logos, 4 challenge SVGs). QA: `reference-snapshots/scale-clone/qa/public-sector-national-security/` (`<w>-NN.jpg` = Scale left, clone right, one per half viewport of scroll) and `qa/public-sector-national-security/interactions/<name>-{scale,clone}.jpg`.

`NationalSecurityPage({ content?, media?, theme? })` renders the page; `content: NationalSecurityContent` (`content.ts`) has one optional slice per section (`hero`, `challenges`, `stats`, `trust`, `missionTitle`, `flywheel`, `customers`, `howToBuy`, `resources`, `prefooter`). `media.prefooter` replaces the pre-footer photo. Colours are CSS variables on `.root` (`ns.module.css`: `--ns-bg/-fg/-dark/-tan/-tan-lt/-gray-10…95`), overridable with `theme`. Scale's own copy ships so QA lines up. The stats values are Scale's figures and are marked `// PLACEHOLDER METRIC` in `content.ts`.

## REA evidence
- `analyze_web_bundle` `ev_440551c8145881…`: 47/47 scripts parsed, 0 failures; Next.js (Turbopack) + React.
  - Shared chunks unchanged since the earlier audits: `1h0nvyhf5gbrf.js` `10b2627a…` (FlatCta 892855, AnimatedText 668761), `37xz28pjbnlx4.js` `b234eef5…` (ClipScroll 656598, FullBleed 540431, AnimatedFlatCta 961870, useScrollTrigger 210104, useScrollTimeline 681201), `2k1qlgdxlbmz1.js` `bb51ad26…` (CardGrid 540409, BaseCard 598042 / 317967, HeadlineWithCta 925107), `3x8z3_0hhtdcb.js` `89a4cc62…` (BlogPreview 808358, slot table 189756), `058pnujclak3f.js` `b0ed240d…` (TextLink 890803), `2fbrdg5m4_g_8.js` `c8dcfe22…` (Lenis).
  - Page chunk `0sni47mcvnqwg.js` `0e137e33…` (same file as the genai-portfolio / enterprise / about audits): NatSecHero 831675, NatSecStatsPanel 298718, NatSecHowToBuy 109486 (new to this page), SgpSteppedVideo 154479 (SgpIntro `X` + SgpFlywheel `H`), BlogPreview3D 62032, Section 698764, page-intro hook 700758, device detect 263942.
  - Page CSS module `lBBaeq_page` in `0npdyq12us3md.css` (read in full; see the sections).
- RSC slices (in order): `natSecHero`, `sgpSteppedVideo` SgpIntro `{ layout headingPinned, counterLabel CHALLENGES, introHeadline "Challenges", introImage, 4 steps with images }`, `natSecStatsPanel` (6 stats), `section` foundry-tan > `cardGrid` `{ animationDirection down, directionalEntrance, headerAlignment text-center, headerSize md, iconSize md, iconBgColor black, 4 cards }`, `section` white > `headlineWithCta` (CTA arrow "Schedule a Demo"), `sgpSteppedVideo` SgpFlywheel `{ layout stepsOnly, hideProcessLabel, 4 steps with images and links }`, `blogPreview3D` (4 posts), `natSecHowToBuy` (4 items), `blogPreview` "Resources" (3 posts: caption / overlay / overlay), `fullBleedMediaSection` pre-footer (CTA "Speak with an expert").
- `inspect_web_event_listeners`: `.NatSecHero` `ev_2f7f754f…` none; `.NatSecStatsPanel` `ev_e48bf510…` none; the SgpIntro region `[role=region][tabindex="0"]` `ev_ebecb4cd…` none (React root `keydown`/`click`); `.NatSecHowToBuy button` `ev_6991c08f…` HubSpot `mousedown` + React `click`. Window/document (from source): useScrollTrigger `pageshow` + `visibilitychange`, CardGrid `visibilitychange`, SgpIntro `resize` (art top), SgpFlywheel `resize` (50 ms debounce), BlogPreview3D window `keydown` + `visibilitychange`/`blur`, Lenis + ScrollTrigger scroll.

## Libraries
GSAP 3.15 (ScrollTrigger, SplitText via AnimatedText), Lenis (shared layout, lerp 0.14), Embla (BlogPreview3D, ported in the enterprise clone and reused as-is). SgpIntro / SgpFlywheel normally draw WebCodecs frames into a three.js quad; with images on every step (this page) Scale skips the video scene entirely (`staticImages`), so the clone needs no video or three.js. No Rive, Keen or Wistia on this page.

## Sections (Scale vs clone, px from page top)

| # | Section | Layout | Type | 1440 top / height | 390 top / height |
|---|---|---|---|---|---|
| 1 | NatSecHero (831675) | black, min-h-screen, grid; left col 2–5 (xl) self-centre: HeadlineWithCta h1 + subtitle, "Trusted by" + logo marquee (8 logos ×2, `brightness(0) invert(1)`, widths min(90, 36·w/h)); right col 7–12: collage 1451×635 object-left. Phones: image first (aspect 2029/1174), `pt-[max(6rem,16dvh)]`, gap max(2rem, 8dvh) | h1 header3 40/1 (24/1); subtitle 18/1.65 (16/1.65); label 12/1.5 tracking .05em | 39 / 900 both | 102 / 844 both |
| 2 | SgpIntro "Challenges" (154479 X, headingPinned) | 275vh; h-dvh panel pinned 3.75 vh (pinSpacing false); intro h4 + body1 at md:top-32; step copy at md:top-28 col 2–4; art below `--ns-art-top` (max-h 50vh, object-top); controls: 40px arrows + 4-button nav with 2px progress bars | intro h4 header3 40/1; body1 20/1.5 gray-60; step h2 header3 leading-none; body 14/21 #c7c7c7; chip detail-mono black on foundry-tan | 939 / 2475 both | 946 / 2321 both |
| 3 | NatSecStatsPanel (298718) | desert photo behind a ClipScroll (p-4, inset 5% → 0, round 1rem); black panel p-14 r16; column max 978; 3×2 grid gap 8 | h2 header2 64/1.05 centred; label detail-mono tracking-tight gray-60; value header3 gray-90 (32/40 < lg); line 14/20 gray-60 | 3414 / 894 both | 3267 / 1348 both |
| 4 | Section foundry-tan > CardGrid (540409) | contentWidth large (col 2–11 xl); CardGrid py-24 (py-12 < xl); 2×2 between 1024 and 1535 (page CSS), 4 columns ≥ 1536, flex column below; card #ebebeb21 r14 (8 < 1280), p-32 (24 < 1280), min-h 378; black 64px icon tile, glyph #a8927c | h3 header3 centred; card title 24/1.5 medium (18/1.35 < 1280), min-h 4.75rem ≥ 1024; body 16/24 #212121 | 4308 / 1156 both | 4615 / 1515 both |
| 5 | Section white > HeadlineWithCta (925107) | page CSS pt 7rem (5rem < 768), px 24; headline max 22ch balance; RichText max 52rem; FlatCta arrow white on foundry-tan, transparent icon box, r6 | h3 header3; body 16/24 (14/21) | 5464 / 379 both | 6130 / 357 both |
| 6 | SgpFlywheel (154479 H, stepsOnly) | panel h-dvh, min-h clamp(792px, 1362px − 29.7vw, 982px) ≥ 1280 (→ 934); py-24; grey #eaeaea box col 2–11; steps panel flex-1 + media flex-1.3 (mix-blend-darken); counter top-right | label detail-mono gray-30; paragraphs h4 32/36 −.03em (17/24 < 1280); TextLink 16/1.65 | 5843 / 934 both | 6487 / 844 both |
| 7 | BlogPreview3D (62032) "Real Customers. Mission Critical Work." | enterprise clone's Embla carousel (4 posts, perspective track, autoplay 4.5 s); page CSS pt 3rem < 768 | h3 header3 | 6777 / 786 both | 7331 / 598 both |
| 8 | NatSecHowToBuy (109486) | gray-80, py-28 (py-16); container max 1472 px-6; left flex-1 (heading, body max 486, CTA) + right 600 accordion; photo aspect 1477/360 (2/1 phones, object-right) r16 | h2 header3; body2 16/24 (14/1.35); question header6 20/1.5 gray-20 (18/1.05) | 7563 / 979 both | 7929 / 908 both |
| 9 | BlogPreview "Resources" (808358) | col 2–11; page CSS ≥ 1024: res1 1/1/3/3 aspect 605/552 (p-32, image aspect auto), res2 1/3/2/5 and res3 2/3/3/5 aspect 605/400; one column < 1024 | heading 64/1.05 (32) centred; caption title 16/22 medium; overlay title 32/38 white | 8542 / 1044 both | 8838 / 1034 both |
| 10 | Pre-footer FullBleedMediaSection (540431) | ClipScroll px-4 bg white, startPercentage 10; section pb-4 (page CSS); min-h 720 (480) | h2 clamp(2rem, .5rem+5vw, 4rem); FlatCta arrow white "Speak with an expert" | 9586 / 736 both | 9871 / 496 both |

Page height 11221 at 1440 on both (footer is the shared chrome).

## Motion
| Element | Trigger | From → to | Ease / duration | Source |
|---|---|---|---|---|
| Hero h1 / subtitle | page intro (mount) | AnimatedText, delay 1.5 / 1.6, wordStagger .06 / .03 | power3.out | 831675 + 925107 |
| Hero collage | page intro | opacity 0 → 1, 1 s, delay 1.5 | power1.out | 831675 |
| "Trusted by" row / logos | CSS | logo-rise (translateY 100% scale .85 → 0 / 1) .8 s cubic-bezier(.22,.61,.36,1), delay 2 s / 2.15 + .1 i | | 3ektzubma58z1.css |
| Logo strip | CSS | translate 0 → −50%, 40 s linear infinite | | 3ektzubma58z1.css |
| SgpIntro pin | `top top` → `+=3.75vh`, scrub | t = progress / (1.75/3.75); step k active from k/5; bar k scaleX((t − k/5)·5) | linear | 154479 |
| SgpIntro intro copy | `top bottom-=5%` (retroactive) in; t > .14 (.18 phones) out | h4 default AnimatedText (delay .2), body custom fade "H" (delay .5); out delay .1 i | | 154479 |
| SgpIntro step copy | step change | title in, body +.2, chip opacity 0 ↔ 1 .5 s | power2.out | 154479 A |
| SgpIntro art | step change | cross-fade (transition-opacity 500 ms) | ease (.4,0,.2,1) | 154479 |
| Stats clip | ClipScroll `top bottom → center center` | inset 5% → 0 (.75% phones) round 1rem | linear | 656598 |
| Stats heading | column `top 85%` retroactive | AnimatedText delay .1 | | 298718 |
| Stats cards | card `top bottom → top bottom-=276` (−188 phones) scrub | scale 1.06 → 1, y 48 → 0, opacity 0 → 1, x ∓160 → 0 for columns 0 / 2 on desktop devices; stagger window of 3 (1 phones) | power2.out | 298718 + 317967 |
| Trust cards | card `top bottom → top 50%` scrub | as above, window of 4, x ∓160 for column 0 / 3 from 1024 | power2.out | 540409 + 317967 |
| Trust intro | section `top bottom` retroactive | heading .125; icon tile clip inset(0 100% 0 0) → 0 .5 s power1.out at .1 i + .125; glyph opacity 1 s (+.1); title (+0), body (+.14) | | 540409 |
| Mission title | IO rootMargin −15% bottom | headline .5, subtitle 1, CTA autoAlpha .85 s delay 1.4 | power3.out | 925107 / 961870 fadeIn |
| Flywheel expand | root `top bottom-=25%` retroactive | proxy 0 → 1, 2 s: grey clip / steps clip / counter yPercent 100 → 0 / arrows opacity; arrow buttons opacity 0 scale .9 → 1 (.5 s, delay 1 + .1 i) | power3.out | 154479 H |
| Flywheel step | step change | label + triangle (.5 s), paragraphs (+.2), then link yPercent 100 → 0 (.85 s power2.out); out link −100% (.35 s power2.in) | | 154479 x2 |
| How to Buy panel | toggle | height 0 ↔ scrollHeight .5 s | power2.out | 109486 |
| How to Buy icon | toggle | vertical bar rotate 90 ↔ 0, 300 ms | ease-out | 109486 |
| Resources tiles | IO .12 / −6% | opacity 0 / y 16 → 1 / 0 .6 s, delay .05·min(i,3); image 1.08 → 1 scrub | cubic-bezier(.23,1,.32,1) | 808358 |
| Pre-footer | ClipScroll | inset 5% → 0, image 1.25 → 1; headline + CTA filledWhiteArrow at `top center` | | 540431 |

Reduced motion: AnimatedText shows text at once; card scrubs, clips, the pin scrub and the hero intro are skipped (SgpIntro sits on step 1 with the arrows / nav working); CSS logo animations off.

## Interaction inventory
Identical inputs on both sites (`inter.js`, 1440×900; raw: scratchpad `pns/out/int-{s,c}.json`). See QA_RESULTS below for the measured values.

### 1 · NatSecHero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| collage / text | load | none on `.NatSecHero` (`ev_2f7f754f…`) | 831675 / 700758 | collage opacity at 0.5 s steps after commit: Scale 0, 0, 0, .73, 1, 1; clone 0, 0, 0, .44, .94, 1 (same 1 s / delay 1.5 tween; the clone mounts ~.2 s later after hydration). Label row opacity 0 until 2 s on both after the keyframe fix | yes | `1440-00` |
| logo strip | time | CSS | 3ektzubma58z1.css | 40 s marquee, rise delays 2.15 + .1 i | yes | `1440-00` |
| logos | hover | none (`pointer-events-none select-none`) | 831675 | — | n/a | — |

### 2 · SgpIntro "Challenges"
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| pinned panel | scroll scrub, 11 points over 3.75 vh | ScrollTrigger; region none (`ev_ebecb4cd…`) | 154479 X | pin top 0, −338, −675 … ; chip "0 → 1 → 2 → 3 → 4 to 4"; bar fills .073 / .143 / .216 …; prev/next disabled states — identical on both at all 11 points; art top 335 vs 343 | yes | `interactions/intro-scrub-3-*` |
| art | step change | — | 154479 | art top (pin-relative) 335 (Scale) vs 343 (clone) at step 0 | yes (font metrics) | `1440-04` |
| nav button 3 | click | React `click` | 154479 eR | Lenis scroll from 1886 → 2042: Scale 1886, 1998, 2030, 2038, 2041, 2042; clone 1863, 1991, 2029, 2038, 2041, 2042; chip "3 to 4" on both | yes | — |
| next arrow | click | React `click` + HubSpot | 154479 eT | → 2357, "4 to 4" on both | yes | — |
| region | ← / → keydown | React `onKeyDown` | 154479 | ← from step 4 → 2042, "3 to 4" on both | yes | — |
| nav button | hover | CSS | 154479 | opacity .55 → 1 (inactive) | yes | — |

### 3 · NatSecStatsPanel
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip | scroll scrub | ScrollTrigger; root none (`ev_e48bf510…`) | 656598 | inset 5 / 4.164 / 3.328 / 2.492 % … identical | yes | `1440-07` |
| cards | scroll scrub | ScrollTrigger | 298718 + 317967 | matrices identical at 6 points (e.g. `matrix(1.06,…,−160,48)` before entry) | yes | `1440-08` |

### 4 · Trust CardGrid
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| cards | scroll scrub | ScrollTrigger | 540409 + 317967 | 4 points identical to 4 decimals (e.g. card 0 .869 / `matrix(1.0079,…,−20.9676,6.2903)`) | yes | `1440-10` |
| icon tiles / copy | scroll once (retroactive), visibilitychange | ScrollTrigger + document | 540409 | as Motion | yes | — |
| cards | hover | none | 540409 | — | n/a | — |

### 5 · Mission title
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| FlatCta | hover | React + HubSpot | 892855 | fill translate −9.21% at 350 ms on both, opacity .35, fill width 184.8 / 184.6 (calc(100% + 4px)) | yes | `interactions/mission-cta-hover-*` |
| FlatCta | intro | IO | 961870 fadeIn | opacity 1 after on both | yes | — |

### 6 · SgpFlywheel
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll enter | ScrollTrigger | 154479 H | grey clip `inset(0% round 16px)`, arrows 1, counter translate 0 once expanded on both | yes | `interactions/flywheel-1-*` |
| next button | click | React `click` + HubSpot | 154479 | counter "02 \| 04", image 2, link rises — "02 | 04" on both, image 2 visible | yes | `interactions/flywheel-2-*` |
| button | hover | CSS | 154479 I | fill scale-y 0 → 1 from the bottom, 300 ms — Scale `scale: 1` (Tailwind 4 property), clone `transform: matrix(1,0,0,1,…)` (Tailwind 3): same visual | yes | — |
| root | ← / → | React `onKeyDown` | 154479 | prev / next | yes | — |

### 7 · BlogPreview3D
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| carousel | drag / arrows / keys / autoplay | Embla + window `keydown` | 62032 | same module and port as the enterprise audit — z-index order before / after Next identical: 730 730 816 1000 816 730 → 730 730 730 816 1000 816 | yes | `interactions/customers-next-*` |
| card | hover | CSS | 62032 | image scale-125 500 ms, arrow slide-in | yes | — |

### 8 · NatSecHowToBuy
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| question | click | HubSpot `mousedown` + React `click` (`ev_6991c08f…`) | 109486 | open item 2 from item 1: panel heights at 100 ms steps Scale [38,33] [16,49] [4,57] [0,60]; clone [38,33] [15,49] [4,57] [0,60]; second click closes all on both; plus bar rotate 90 ↔ 0 (Scale via the `rotate` property) | yes | `interactions/howtobuy-item2-*` |
| question | hover | CSS | 109486 | gray-20 → black, 200 ms — question colour rgb(0,0,0) on hover on both | yes | — |
| Contact Us | hover / focus | React + HubSpot | 892855 | shared FlatCta (680 ms reset, #86bff2 focus), fill calc(100% + 4px) | yes | — |

### 9 · Resources
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tile picture | hover | CSS | 808358 | overlay picture `scale` 1.05 after 1.1 s on both | yes | `interactions/resources-hover-*` |
| tiles | IO / scrub | IO + ScrollTrigger | 808358 | as Motion (same port as the about audit) | yes | `1440-19` |

### 10 · Pre-footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip | scroll scrub | ScrollTrigger | 540431 | inset 5 / 3.7775 / 2.5550 / 1.3325 % at 900 / 700 / 500 / 300 px above: identical; overlay = `linear-gradient(#0000, #000)` only (the `bg-black/45` of overlayVariant "flat" loses to the unlayered .media-overlay rule on Scale too) | yes | `1440-21` |
| CTA | hover / focus | React | 892855 | shared FlatCta | yes | — |

### Not reproduced
- HubSpot `mousedown` analytics, OneTrust and OptinMonster (third-party).
- The WebCodecs / three.js frame scene of SgpIntro / SgpFlywheel: Scale does not mount it on this page (every step has an image).

## QA
- 1440 and 390: every section top and height identical to Scale (page 11221 at 1440). No console errors on the clone; the page returns 200.
- Interaction values above are from the same `inter.js` run on both sites; screenshots pair Scale (left) and the clone (right).
- Fixed during QA: global `h1–h6` colour rule (BlogPreview3D / overlay titles turned dark when the module forced `color: inherit`; every heading now has an explicit colour class); hero subtitle 28 → 29.7 px line height (Tailwind 3 `md:text-lg` resets leading); "Trusted by" leading 16 → 18; CSS-module `gap: .5rem` on the grid overriding Tailwind `gap-y-*` in the hero (text 59 px too high on phones) → `!gap-y-*`; SgpIntro step `pb-30` only below 768 (Scale's `md:grid-layout-desktop` `padding: 0 1.5rem` overrides it), which moved the art 128 px up to Scale's position; HeadlineWithCta `grid-padding` (px 24) on phones (section 334 → 357); Flywheel paragraphs: the page CSS negative margin cancels the flex gap (no extra h4 margin); Tailwind 3 vs 4 radius (`rounded-sm` 2 → 4 px) and `leading-tight` (1.1 here) → 1.25 for the nav titles; logo-rise keyframes written as longhands so the CSS-module keyframe rename applies; a native `@layer` in the module broke PostCSS (Tailwind 3) and was removed.

## Remaining gaps
- Fonts: Vahue faces (Aeonik / Aeonik NatSec Medium are commercial): mono labels 3–10px narrower, some wraps differ by a line.
- SgpIntro `--ns-art-top` is measured from the rendered copy on mount, as on Scale; with Vahue fonts the art sits 8px lower (343 vs 335).
- Media are Scale's (collage, logos, challenge diagrams, stats background, flywheel illustrations, customer and resource photos, how-to-buy and pre-footer photos), downscaled; a Vahue page must pass its own. Logos are real government / partner marks, as on Scale.
- Stats values are Scale's figures (marked PLACEHOLDER METRIC).
- `oml:` short-landscape variants are out of scope.
