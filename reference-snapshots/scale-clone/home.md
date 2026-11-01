# scale.com homepage template spec

Template: `components/templates/home/` · Vahue page: `app/page.tsx` → `components/home/VahueHomePage.tsx` (art: `homeArt.tsx`, covers: `public/img/home/`) · QA: `reference-snapshots/scale-clone/qa/vahue-home/`

Captured 2026-11-01 at 1440×900 and 390×844. REA on an isolated Chrome tab (CDP 9230, closed afterwards), production chunks fetched and read locally, RSC payload parsed from the page HTML, then Playwright with identical inputs on scale.com and `localhost:3000/`.

`HomePage({ content, media })` renders every section from `HomeContent`. Picture and video slots come from `HomeMedia` and from the content items. No Scale copy, logos, footage or photos ship in the template; Scale's copy is recorded below only as the length target for each slot.

## Libraries (REA `analyze_web_bundle`, evidence `ev_37691c3f223197b3…`)
- 52 scripts parsed, 0 failures. Next.js (high), React (medium).
- GSAP 3.15 + ScrollTrigger + SplitText + MotionPathPlugin (`2d7ykwtxp_8ed.js`), Lenis (`2fbrdg5m4_g_8.js`), Keen Slider (`058pnujclak3f.js`), three r181 (`3kd41k7ews14b.js`). No Rive on this page. Video only as media (`Packed.mp4` into a VideoTexture, two `<video>` slots).
- **Shared-chunk check (sha256).** `1h0nvyhf5gbrf.js` `10b2627a…` and `37xz28pjbnlx4.js` `b234eef5…` are byte-identical to the earlier audits, so the FlatCta state machine (fill on CSS `translate`, 680ms reset, re-entry snap), the `#86bff2` focus outline and the retroactive intro trigger carry over. `3rls9s4y8-e83.js` `ac4814e5…` (three runtime) and `0sni47mcvnqwg.js` `0e137e33…`, `2k1qlgdxlbmz1.js` `bb51ad26…`, `3x8z3_0hhtdcb.js` `89a4cc62…` match the enterprise and about audits. New to this page: `0hh8x7qynpa7m.js` `5b65efba…` (homeHeroScene 140914).
- **Reuse.** Same modules as the siblings, ported into this folder because the homepage needs more than the sibling copies expose: `animatedText.ts` adds re-entry, `fadeOutSimple`, `colorIn`, the lift and quote animations and `seek`; `BlogPreview.tsx` has the 10-slot table (about stops at 5); `FlatCta.tsx` adds `filledEvergreenArrow`, `arrowOutline`, `iconOnly`.

## Page structure (RSC slices, in order)
1. `homeHeroSlice` (677838) + scene (376513 → 140914)
2. `scrollingQuote` (418462)
3. `applications` (920565) in ScrollRevealSection (756386) with `fullWidthCardCarousel` (424625)
4. ScrollRevealSection > CardGrid (540409, LinkCard 874328, BaseCard 598042)
5. `blogPreview` (808358, slots 189756)
6. `videoCta` (590542)

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Evidence | Source |
|---|---|---|---|
| `.HomeHero` | none | `ev_3f46655556475c47…` | Motion is ScrollTrigger + the scene's window listeners |
| `.HomeHero canvas` | not mounted in the headless REA tab (selector `not_found`) | `ev_77e0a685c0873c4d…` | From source: 955774 adds window `pointermove` / `touchmove`, `resize`; controls `enabled` off (enterprise audit `ev_001e33c864d…`) |
| `.PullApartContent a` | `mousedown`, `click` | `ev_ca44e504ccf2016a…` | HubSpot + Next Link. Hover is React-delegated (892855) |
| `.ScrollingQuote` | none | `ev_01bf4b0b72a28be7…` | ScrollTrigger |
| `.Applications` | none | `ev_43fc3aa5deddb9b0…` | ScrollTrigger, IntersectionObserver |
| `.application-item > div` | none on the node | `ev_a7d370b06f0d93f0…` | React-delegated `onMouseEnter/Leave/Click` (920565) |
| `.application-item a` | `mousedown`, `click` | `ev_fe46900003242f8c…` | HubSpot + Next Link |
| `.FullWidthCardCarousel .keen-slider` | `mousedown/move/up/leave`, `touchstart/move/end/cancel`, `dragstart`, `click`, `ksDragStart/ksDrag/ksDragEnd` | `ev_b30a9aa7675df632…` | Keen in `058pnujclak3f.js`. Window `keydown` from 424625 |
| `.FullWidthCardCarousel a` / `button` | `mousedown`, `click` | `ev_3e2c7b716bd335b9…` / `ev_39760f434cc8c690…` | HubSpot + Next Link / React |
| `.LinkCard` / `.LinkCard a` | none / `mousedown`, `click` | `ev_6eae14cd6a349a26…` / `ev_c77d98d99b126891…` | CSS `group-hover/card` |
| `.BlogPreviewTile` | `mousedown`, `click` | `ev_612341242aa71f91…` | CSS `group-hover` on the picture |
| `.VideoCta a` / `video` | `mousedown`, `click` / React media events | `ev_39e9fa404f650b8d…` / `ev_9463b9d9494156d9…` | Next Link / React |

## Sections (top / height, Scale → Vahue, banner dismissed on Scale)
| # | Section | 1440 | 390 | Layout + type |
|---|---|---|---|---|
| 1 | HomeHero | 0/4050 → 0/4050 | 0/1958 → 0/1958 | `h-[450dvh]` (`232dvh` under 768), white. Pinned `h-dvh`. H1 slot `header2` 64/1.05 (32). Pull-apart: category mono 11 (10) `#929292`, title 32/1.1875 (24) −.03em, body 14/1.43 `#C7C7C7`, evergreen arrow CTA 44 tall, logos 68×30. Under 1450 the text sits at `pt-[50dvh]` (45dvh on phone) in col 2–7, centred |
| 2 | ScrollingQuote | 4050/1800 → same | 1958/1688 → same | `h-[200dvh]` black. Media 362 wide, 60% tall, radius 24. Evergreen card `px-14 py-12`, radius 16, quote 64/4rem medium (32/40) |
| 3 | Applications | 5850/1649 → 5850/1599 | 3646/1459 → 3646/1421 | Gray-90 panel. Heading 64/1.05 (28/30). Orbit `w-[min(75%,1020px)]`, aspect 1020/572 (3/5 under 640). Carousel slides 404 wide (`100vw − 3.5rem`), heading 24 medium, subtitle 16 `#929292` |
| 4 | CardGrid | 7499/862 → 7449/862 | 5105/1234 → 5067/1236 | 3 LinkCards 381×556 at 1440, identical |
| 5 | BlogPreview | 8361/1312 → 8311/1290 | 6339/1282 → 6303/1263 | Slot table in `BlogPreview.tsx`; first slots 575×304 and 575×444–446 |
| 6 | VideoCta | 9674/751 → 9602/751 | 7621/459 → 7565/459 | Tan `#A8927C`, heading 40/1.25, body 20/1.5, media 695×525 at right 5% |

The −50 / −38px in section 3 is the tallest carousel card: Scale's longest heading wraps to 4 lines, Vahue's longest case title to 3. Blog differs by about one title line. Everything else lines up to the pixel.

## Motion
| Element | Trigger | Range | From → To | Ease / dur |
|---|---|---|---|---|
| Hero pin + parallax | pin child | top top → 4.5 (2.32) vh | `.parallaxOut` yPercent 0 → −10 at .8–1 | power2.inOut, scrub |
| Scene timeline | scrollY / (4.7 vh, 2.15 ≤768) | 0–1 | rotation.y −.6 → −1; colourMix 0→1 (0–.1); T1 0→1 (0–.2); scale.z 0→1 (0–.1); alpha 1→0 (.8–1) | none / cubic.inOut / sine.inOut |
| Scene states | calls at .05, .299, .3, .599, .6 | — | T2, T3 tweens | 1s cubic.inOut (time-based) |
| Sections | same progress | — | 0: .1–.3; 1: .3–.6; 2: .6–.85 (.997 scrolling back); heading ≤ .035 | — |
| Camera | window pointermove | — | ±.6 / ±.3 at T1 = 1, lerp .06; zoom from `gaze()` | per frame |
| Pull-apart in / out | section visibility | — | see `HomeHero.tsx` header | k = phone 1.4 × last-going-back 1.35 |
| Quote | pin top 20% (phone top top), +2vh | — | wrapper y 25% → 0 (.75 power3.out); media y 67% → 0 (2.25 cubic.inOut, md); wrapper scale .9, opacity 0, y −20% (.75 at 1.5) | scrub; `seek(1.4p)` |
| Reveal panels | top bottom → top top | — | scaleX 1 − 2·gutter/w → 1, radii 16 → 0, starts at p = .5 | linear |
| Orbit | 28s repeat | — | path motion + scale curves | none, plays while in view |
| Apps pin-out | bottom bottom (phone −50vh), +1.5vh | — | carousel y → −20vh (.25 power1.out), overlay → .35 (.5 power1.out) | scrub |
| Cards | card top bottom → top 50% | — | scale .96 → 1, opacity 0 → 1, stagger .1 | power2.out |
| Blog picture | tile top bottom → center center | — | 1.08 → 1 | linear |

Reduced motion: text visible, no pins or scrubs except the scene's own progress, no Lenis.

## Interaction inventory
Scripts: `int.cjs`, `extra.cjs` (scratchpad `home-audit/`). Images: `qa/vahue-home/interactions/i-<w>-<name>-{scale,vahue}.jpg`. Side by side every 50% viewport: `qa/vahue-home/<w>-NN.jpg`, Scale left.

### 1 · HomeHero
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| pin, parallax | scroll at 12 points | ScrollTrigger | 677838 | y at p .84 / .9 / .99: −20.8 / −80.3 / −90 (pin −138) on both at 1440; −1.7 / −60.5 at p .9 / .99 at 390 on both | yes | `i-*-hero*` |
| section visibility | same | ScrollTrigger + scene | 140914 | identical at all 12 points at both widths | yes | `i-*-hero*` |
| heading, scroll hint | scroll past .035 | scene | 677838 | visible at p .02, hidden at .05 on both | yes | `1440-00` |
| camera | mouse to corners | window `pointermove` (source) | 19490, 955774 | same maths; compared by image, uniforms aren't readable | yes | `i-*-ptrTL/BR-*` |
| idle arrows, numbers, squares | time | gsap ticker | 140914 | same shader constants; Scale's anchors are random, so not comparable sample by sample | yes | `i-*-hero45-*` |
| Pull-apart text | section change | store + delayed calls | 677838 | Boxes at 1440: category 450, title +41, body +94 on both; colours `#929292`, `#C7C7C7` after fix | yes | `i-1440-hero45-*` |
| CTA | hover | React (`ev_ca44e504…`) | 892855 | multiply overlay .143 / .18 / .18 at 150ms steps on both (390); arrow strip 600ms | yes | — |
| CTA intro | section change | 961870 | `filledEvergreenArrow` | ported from source | yes | `1440-05` |

### 2 · ScrollingQuote
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| wrapper, media | scroll at 12 points | ScrollTrigger (`ev_01bf4b0b…`) | 418462 | y, scale, opacity, media y identical at every point, e.g. −32.9 / .974 / .74 / 8.1 at .8 (1440), −40.4 / .975 / .75 / 0 (390) | yes | `i-*-quote*` |
| words | scrub | `seek` | 947153.c | first word .11 vs .15 at .1 and last word .77 vs .69 at .6: stagger over 15 words vs 16, expected | yes | `i-*-quote*` |
| words transform | enter | one-shot intro | 947153.c | scale 1.75 before, 1 after on both | yes | — |

### 3 · Applications + carousel
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| reveal | scroll at 5 points | ScrollTrigger | 756386 | identical: .9667 / .9875 / 1, radius 16 / 6 / 0; 390 .9385 / .9769 / 1 | yes | `i-*-appsTop-*` |
| orbit | time 1s | timeline | 920565 | deltas (−83, 36) vs (−84, 37); scale .914 vs .916 at 1440; box 1020×572 at (190, 130), 293×488 at (43, 147) | yes | `i-*-appsTop-*` |
| tile | hover | React (`ev_a7d370b0…`) | 920565 | `scale(1.5)`, .3s; orbit stops (0, 0 over 500ms); word switches; leave resumes (−44, 12) vs (−43, 11) | yes | `i-1440-appsHover-*` |
| word | phone time | IO .25 + 3s interval | 920565 | changes every 3s on both | yes | — |
| tile | phone tap | React | 920565 | no navigation, word switches, autoplay stops on both | yes | — |
| pin-out | scroll at 8 points | ScrollTrigger | 920565 | y −91.8 / −151.2 / −180, overlay .067 / .224 / .319 / .35 identical; z-index 3 on enter | yes | `i-*-appsPin-*` |
| slider | drag −300px | Keen (`ev_b30a9aa7…`) | 424625 | cursor grab → grabbing; slide 0 x 518 → 248 mid → 106 after on both | yes | `i-*-car0-*` |
| next, arrow keys | click, keys | React, window `keydown` | 424625 | −306, −718, −306 on both (390: −656, −998, −656) | yes | `i-*-carNext-*` |
| arrow buttons | hover | CSS | 424625 | 44×44, radius 6, opacity .8 on both | yes | — |
| linked card | hover | CSS | 424625 | arrow track slides in, .6s | yes | `i-1440-carHover-*` |
| intro | enter | useScrollTrigger | 424625 | 10 nearest slides stagger .09, rest set after | yes | `i-*-car0-*` |

### 4 · CardGrid
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| card | hover | CSS (`ev_6eae14cd…`) | 874328 | colour layer in the card's colour, 500ms; CTA bg 93 / 27 / 2 / 0 at 150ms steps on both (390), 83 vs 93 at 1440 (sampling phase) | yes | `i-*-cardsHover-*` |
| cards | scroll | ScrollTrigger | 598042 | same formula as the about audit | yes | `i-*-cards-*` |
| intro | enter | retroactive | 540409 | icon clip, glyph, title and body with `colorIn`, CTA last | yes | `i-*-cards-*` |

### 5 · BlogPreview
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| picture | hover | CSS (`ev_61234124…`) | 808358 | 1.035 / 1.047 / 1.05 at 350ms steps on both | yes | `i-1440-blog-*` |
| picture, tile, title | scroll | ScrollTrigger, IO | 808358 | same as the about audit | yes | `i-*-blog-*` |
| phone cap | resize | matchMedia | 189756 | 4 tiles under 1024 | yes | `390-*` |

### 6 · VideoCta
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| root scale | scroll at 5 points | ScrollTrigger | 590542 | .9667 / .9875 / 1; 390 .9385 / .9769 / 1, on both | yes | `i-*-cta-*` |
| boxes | layout | — | 590542 | h2, p, CTA identical at 1440; CTA radius 8 after intro | yes | `i-*-cta-*` |
| CTA | hover, intro | React | 892855, 961870 | `filledWhiteArrow` .85s, delay .5 (phone .08) | yes | `1440-21` |

## QA result
- Vahue: 200, no console errors or page errors during load, scroll, drag or hover, no requests to scale.com or `/templates/`. Scale logs 401 / 404 and OptinMonster noise.
- Fixed during QA: body colour (`#C7C7C7`), category line height, LinkCard body size (16/24, card now 556 as on Scale), pre-footer media box 695×525, blog title lengths in the phone slots.

## Remaining gaps
- **Hero footage.** Scale plays `Packed.mp4`. Vahue draws its own animated frame in the same packed layout. The template also takes a `video` in that layout.
- **Scale's phone hero in the side-by-side.** After dismissing the banner in the test, Scale's frame shows a white strip at the bottom at 390 (`390-00`). It comes from that test step, not from a layout rule.
- **Header.** Vahue's sticky bar stays on screen where Scale's header hides on scroll, and it is 88px on phones. So the phone nav pad in the scene and the hero plate is 88, not 72, and on phones the bar covers the top 88px of the pinned quote media.
- **Landscape phones (`oml:`).** Variants aren't ported, including the landscape orbit path.
- **Touch drag.** Keen is the same library and options; only the tap was driven with touch.
- **Fonts.** Vahue's faces. Lines can wrap differently from Scale's.
