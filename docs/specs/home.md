# Home (`/`)

Live source: https://scale.com/, checked 2026-11-01 at 1440x900 and 390x844. Strings and assets: `components/pages/home/content.scale.ts`. Rendered copy: `components/pages/home/content.ts`. Stack and shared rules: [../stack.md](../stack.md), [_chrome.md](_chrome.md).

## Stack on this page
Next 16.4.2, React canary via Next, GSAP 3.15 (ScrollTrigger, SplitText, MotionPath), Lenis 1.3.21, three r181, Keen Slider. `analyze_web_bundle` `ev_94eb3dc5…` with sources: 44 of 44 scripts parsed. Scale's Tailwind base defines `3xl` at 1450px: added to `@theme` in `globals.css`, because the hero's layout classes depend on it.

## Sections
| # | Section | Scale module | Ours | 1440 top / height | 390 top / height |
|---|---|---|---|---|---|
| 1 | HomeHero: pinned WebGL scene, heading, 3 pull-apart blocks | 677838, scene 140914, canvas 955774 | `HomeHero.tsx`, `homeHeroScene.ts`, `homeHeroShaders.ts`, `HomeHeroCanvas.tsx`, `shared/ThreeCanvas.tsx` | 39.3 / 4050 | 101.8 / 1958.1 |
| 2 | ScrollingQuote | 418462 | `ScrollingQuote.tsx` | 4089.3 / 1800 | 2059.8 / 1688 |
| 3 | Applications: orbit, cycling word, carousel | 920565, 424625 | `Applications.tsx`, `shared/FullWidthCardCarousel.tsx` | 5889.3 / 1640.4 | 3747.8 / 1449.2 |
| 4 | Benchmark link cards | 756386, 540409, 874328 | shared `ScrollRevealSection`, `CardGrid` | 7529 / 851 | 5197 / 1209 |
| 5 | BlogPreview | 808358, 189756, 280239 | `shared/BlogPreview.tsx` | 8380.3 / 1308.6 | 6405.9 / 1271 |
| 6 | VideoCta | 590542 | `VideoCta.tsx` | 9688.8 / 744 | 7676.9 / 454.1 |

Page total: 11331 at 1440, 9544 at 390, equal to Scale on both the clone and the filled page.

## REA evidence
- Bundle: `ev_94eb3dc583edeafb…` (`include_script_sources: true`).
- Listeners, direct on the element. Section roots have none, everything there is React delegated or GSAP: `.HomeHero` `ev_17b48155…`, `.ScrollingQuote` `ev_b7b3feca…`, `.Applications` `ev_b1381287…`, `.CardGrid` `ev_3429c80e…`, `.BlogPreview` `ev_2bda4b4e…`, `.VideoCta` `ev_9577fd99…`, `.application-item > div` `ev_862ab0cb…`, `.keen-slider__slide` `ev_b7396da4…`.
- Listeners found: canvas `ev_a35e2a65…` (webglcontext*, and OrbitControls `pointerdown`, `pointercancel`, `contextmenu`, `wheel` from `3rls9s4y8-e83.js`), `.keen-slider` `ev_f616654f…` (Keen's mouse, touch and `ks*` events from `058pnujclak3f.js`), `html` `ev_f9145e34…` (passive `scroll` from `1h0nvyhf5gbrf.js`, rest OneTrust), `body` `ev_f3d62068…` (`touchstart`, `1h0nvyhf5gbrf.js`).
- Links and buttons hold React's `click` root listener plus HubSpot analytics `mousedown`, not ported: `.application-item a` `ev_ef6f0fa7…`, `.BlogPreviewTile` `ev_397c52be…`, `.VideoCta a` `ev_7a3006b7…`, `.PullApartContent a` `ev_8b24d908…`, `.Applications .FlatCta` `ev_8bd4fd08…`, `.FullWidthCardCarousel button` `ev_30de8610…`, `.LinkCard a` `ev_b76d2c48…`.
- Precise coverage during real input (`observe_web_execution`, read back through `export_evidence_bundle`, because each result is over the MCP response limit): hero `ev_a167850d…` (scene and hero handlers ran), quote `ev_87d713ff…` (`onUpdate` seek, 207 calls in the module), applications and carousel `ev_f17385f0…` (orbit `onUpdate`, ticker, `ArrowLeft/Right` handler), cards, blog and CTA `ev_aff02709…` (blog zoom `onUpdate`, `onToggle`, VideoCta `onEnter`), pointer pass `ev_dd050b24…` (scene `onMouseMove` 13 calls, runtime pointer listener 25).
- Discarded windows: `ev_b2ec0a58…`, `ev_dfc7d31b…`, `ev_6e46732c…`, `ev_8ece3d84…` ran before the driver started, so they show no input.
- CDP mouse input does not reach handlers in a background tab: hover and drag handlers are only confirmed by the Playwright samples below. In `ev_f17385f0…` the tile hover did not fire. In the foreground pass I confirmed only the pointer handlers named above, not tile hover or drag.

## Interaction inventory
Measured with the same script on both sites (`motion.cjs`, `motion2.cjs` in the scratchpad), clone unless noted.

| Element | Input | Listener | Source | Params | Scale vs ours |
|---|---|---|---|---|---|
| Hero pin | scroll | ScrollTrigger pin, no spacing | 677838 | End `4.5vh` (`2.32vh` at most 768px). `yPercent` -10 between .8 and 1 | -9.07, -66.28, -89.63, -90, both |
| Hero timeline | animated scroll | gsap ticker `onTick` | 140914 | Progress = scroll / (4.7vh, phone 2.15vh). `t1` over .2, rotation -.6 to -1, alpha out from .8 | Compared on screenshots only: uniforms are not exposed |
| Pull-apart blocks | progress | zustand store | 140914, 677838 | Visible at .1, .3, .6, last ends .85 (.997 scrolling back) | Visibility strings equal at 15 scroll points |
| Heading and hint | progress | store | 677838 | Hide above .035, hint back after 1s | Equal on the clone |
| Block reveal | visibility | gsap | 677838 | Category .8s, title .8s at .3, body 1.8s at .5, CTA .85s at 1.3, logos from 2.3, stagger .08 | Same params. Timed in dev: ours starts about 200ms later, logos about 400ms. See Gaps |
| Page theme | scroll | Lenis `scroll` | 677838 | Dark past 350, light under | light, dark at same points |
| Camera parallax | `pointermove`, `touchmove` | window | 955774, 140914 | lerp .06, reach 4 x 2, strength up to .15 | Same movement on screenshots at 5 pointer positions |
| OrbitControls | drag, wheel on canvas | canvas | 955774 | Attached as on Scale, damping on | No lasting effect, both |
| Fallback panel | video ready | events and 100ms poll | 677838 | Black panel fades over 1s once video has played .08s | Ported, not sampled |
| Quote pin | scroll | ScrollTrigger | 418462 | `top 20%` (mobile `top top`), `+=2vh`. Wrapper `yPercent` 25 to 0, video 67 to 0, out from 1.5 | Equal at 10 points |
| Quote words | scrub | `seek(1.4 x progress)` | 947153 "c" | Scale 1.75 to 1, two-phase opacity | Equal on the clone |
| Section reveal | scroll | ScrollTrigger | 756386 | Panel width from 2x24 inset, radius 16 to 0 | Equal at 7 points |
| Orbit | timeline | gsap MotionPath | 920565 | 28s loop, phase .25, scale phase .75 | Tile scale .6211 vs .6212 at the same time after load, later samples drift with load time |
| Tile | hover | React | 920565 | `scale(1.5)` 300ms, orbit `timeScale` to 0 in 1s | 1, 1.308, 1.454, 1.5 vs 1, 1.372, 1.478, 1.5: same curve, sampled at different phase |
| Tile | leave | React | 920565 | Back over 300ms | 1.128, 1.033, 1.001 vs 1.102, 1.022, 1 |
| Cycling word | hover | gsap | 920565 | `expo.out` .5s, box width follows | Box 194 vs 192: font |
| Cycling word, mobile | interval, tap | `setInterval` 3s, IO .25 | 920565 | Tap stops it. Tile tap does not follow the link | Same word order and same stop |
| Carousel | drag | Keen | 424625 | Loop, spacing 8, origin center | 518, 478, 438, 398, 358, 318, both. Lands on 106, both |
| Carousel | arrows, keyboard | React, window `keydown` | 424625 | One slide, in view only | 106 to -306 to -718, both |
| Carousel card reveal | in view | gsap | 424625 | Stagger .09, badge scale .95s | Same final state, stagger not sampled |
| Link card | hover | CSS | 874328 | `scale-y` 500ms | Ends at 1 and back, both |
| Blog tiles | in view | IO .12, rootMargin -6% | 808358 | .6s, delay .05 x index | Close, differences within scroll timing |
| Blog image | scrub, hover | ScrollTrigger, CSS | 808358 | 1.08 to 1, then `scale` 1.05 over 1s | 1.04, 1.008, 1 equal; hover ends 1.05 both |
| VideoCta | in view, scrub | ScrollTrigger | 590542 | `top center` (mobile `top 92%`), CTA .85s | Scale curve equal, CTA width 140.7 vs 140.6 |

## Filled page
`content.ts` has the same shape and counts as `content.scale.ts`: 72 strings compared, all word counts within about 15%. CTA labels match the menu: For Operations Teams (`/enterprise`), Explore All Workflows (`/data-engine`).

Section tops and heights equal Scale's table above at both sizes. The carousel reads 580.4 at load instead of 589 (529.6 instead of 536.8 at 390), because its copy wraps differently before the text is split; the Applications section height is unaffected. Settled card heights at 1440 equal Scale (carousel 373.4, link cards 556, blog tiles same list). At 390 they equal too (carousel 348, link cards 349, 322, 335). Motion re-sampled on the filled page: same values, except quote word opacity (different word count), CTA width (longer label) and the cycling word box.

## Assets
- `packed.mp4` is Scale's 10 MB `Packed.mp4` re-encoded at 1920x1080 to 2.8 MB. Same size, so the shader's texture lookups hold. Its top strip holds the outline matte and its corner the frame offset, so it cannot be swapped for an ordinary video.
- Also in `public/home`: orbit tiles, quote video, Satellite video, and Scale's two scene textures.
- Scale's logos and brand images remain in `public/home` for `content.scale.ts`. They are not rendered on the filled page.

## Placeholders
24 lines marked `// PLACEHOLDER` in `content.ts`: 6 hero logos (one line), the "25% fewer errors" figure, the 90% quote, 11 carousel clients (neutral 40px "Logo" tile), the 87 cases title and the 2024 year, 8 blog posts. The 87 is from the research, but those are other agencies' cases.

## Deviations and gaps
- **Fonts:** Aeonik and DM Mono, see stack.md. Causes the small text-width deltas above.
- **Timing, unverified:** the reveal lag was measured against Scale's production build on our dev server. Params are the same, and a production build was not run, so the cause is not proven.
- **Scene uniforms:** compared by screenshot, not numerically. The video and 30 random scene points differ per load, on Scale too.
- **Not sampled:** 768 to 1449 band beyond 1440, tablet, `oml:` landscape, the fallback image path, reduced motion on blog images.
- **Touch:** carousel checked with a tap on Next. Touch drag was not run.
- **BlogPreview:** the video tile branch (Radix dialog) is not ported, home has none.
- **Links:** blog tiles go to `/blog`, since post pages are not built.
- **Copy kept:** "Scroll to explore", "Learn more" and "Real" stay as Scale has them: they are UI words with the same role.

## For Mike
- Non-brand Scale imagery still shows on the filled page: fighter pilot and other scenes in `packed.mp4`, a dish with a US flag in the quote video, three orbit tiles (`Case Files` a fighter jet, `Exceptions` and `Code Reviews` soldiers), the Capitol in blog 4, a Qatar landmark in blog 7, robot hands in blog 8.
- Blog tiles 2, 3, 5 and 6 are neutral: their images carried company names or a Scale benchmark.
