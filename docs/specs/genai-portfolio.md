# /genai-portfolio

Live source: https://scale.com/genai-portfolio at 1440x900 and 390x844 (touch), 2026-11-01. Menu label here: Knowledge Agents. Page: `app/genai-portfolio/page.tsx`, `components/pages/genai-portfolio/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). This page adds WebCodecs: `VideoDecoder` scrubs frame bins into a three.js `RawShaderMaterial` quad. REA `analyze_web_bundle` with sources: 41 of 41 scripts parsed, Next.js and React fingerprints.

New ports in `components/site/shared`:
- `stepped-video/`: module 154479 with frame-edge config 668130 and 198863. `SteppedVideo.tsx` holds `SgpIntro` and `SgpFlywheel`, `ActiveFrame.ts` the bin player and edge controller, `shaders.ts` the GLSL verbatim. Static-image and `stepsOnly`/`headingPinned` branches are ported but no page drives them yet.
- `TwoColumnTextWithVideo` 857484, `Faqs` 966098, `TransparentVideo` 553471, `ScrollToExplore` 265985.

Page-only ports in `GenAiPortfolioPage.tsx`: `SgpHero` 63135, `SgpStack` 290276, Section with `parallaxFadeOut` 698764, `SgpPlatformDifferentiators` 420112, `SgpSecurity` 146778, `SgpDemo` 309685. `genai-portfolio.module.css` holds `PtX9LG`.

Reused: `HeadlineWithCta`, `LogoMarquee`, `CardGrid`, `ClientTestimonials`, `BlogPreview`, `ClipScrollSection`, `AnimatedText`, `RichText`, `ThreeCanvas`, `SectionTheme`.

Frame bins and their configs keep Scale's paths: `public/static/video/active-frame/`, `public/static/stepped-video/`.

## Sections
Heights in px, Scale then ours (filled page). Page height 1440: 16989, 16989. Page height 390: 17668, 17667.

| # | Section | 1440 | 390 |
|---|---|---|---|
| 1 | Hero, video, logo marquee | 900, 900 | 844, 844 |
| 2 | SgpIntro, pinned scene | 5400, 5400 | 5064, 5064 |
| 3 | Two columns, no video | 461, 461 | 593, 593 |
| 4 | SgpStack | 757, 757 | 1218.6, 1218.6 |
| 5 | Section, trust cards, parallax fade | 985.4, 985.4 | 1089.1, 1089.1 |
| 6 | SgpFlywheel, pinned scene | 1350, 1350 | 1266, 1266 |
| 7 | Two columns, video | 1084.8, 1084.8 | 793.4, 793.4 |
| 8 | Differentiators, tooltips | 881, 881 | 798.1, 798.1 |
| 9 | SgpSecurity | 837.8, 837.8 | 814.3, 814.3 |
| 10 | Testimonials, pin on exit | 834, 834 | 977, 976 |
| 11 | SgpDemo, parallax | 900, 900 | 844, 844 |
| 12 | Faqs, accordion | 666.2, 666.2 | 659.2, 659.2 |
| 13 | BlogPreview | 994.2, 994.2 | 1244.9, 1244.9 |

The 1 px at 390 is the testimonial font gap. Horizontal overflow: none at any width tested.

### Other widths
Layouts change at 768 (`md`, grid and `uScale`), 1024 (`lg`, stack and `uScale` range), 1280 (`xl`, flywheel `isMobile`, intro `uOffset`). Page height, Scale then filled: 768: 21170, 21118. 1024: 18397, 18376. 1280: 17163, 17079. 1728: 17006, 17006. The gaps come from text wraps where copy differs: FAQ first answer at 768 (-24), Differentiators at 1280 (-30), Security at 1280 (-54.8). Layout branches match by eye at 1024 and 1280 in the pairs. 768 and 1728 were measured for height only, no pairs. Landscape phone (`oml:`) was not driven.

## Interaction inventory
Same script on both sites (`new-qa/genai-portfolio/instr.cjs` in the scratchpad). React handlers are delegated to the root, so element-level REA results show only native listeners.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero text, marquee, video | load | No section listeners, `ev_063f4e56…` | 63135 | Text delay 1, logos 2.2, media opacity 1s at 2 | Frames equal at 3.5s. Video later on Scale (network) |
| Marquee box | | | 880750 | Logo box 35 tall | 35, 35. 390 heading top 563.5, 563.5 |
| Scroll arrow | timeline | None | 265985 | Repeat -1, delay 5, drop .5s | Transforms equal |
| Transparent video | IO threshold 0 | None | 553471 | Plays on screen, 700ms fade | By eye |
| Intro pin | scroll | ScrollTrigger, `ev_df20aa17…` none direct | 154479 | `top top`, `+=vh*span`, pinSpacing false | Section 5400, pin-spacer 900 both |
| Intro progress bar | scrub | ScrollTrigger | 154479 | Width progress to scaleX | y 2977: .4529, y 2958: .4487, y 3647: .6018, y 3634: .5989: same line |
| Intro frames | scrub | WebCodecs | 154479 | `00:00`-`03:03` on approach, `03:03`-`15:03` pinned, edges in `edges.ts` | Frames equal at every stop once Scale's bins load |
| Step chip, card | step index | zustand | 154479 | In and out delays verbatim | Chip colours rgb(39,50,82), rgb(25,58,41), rgb(168,146,124), rgb(121,100,140), equal |
| Intro arrows | click | React, `ev_e008616c…` HubSpot `mousedown` plus React | 154479 | `lenis.scrollTo` step midpoint | Ends y 3122, 3122 |
| Intro | ArrowLeft | React on region | 154479 | Step -1 | y 2199, 2199 |
| Intro canvas | pointer, wheel | `ev_9883c3d1…`: `pointerdown`, `pointercancel`, `contextmenu`, `wheel` from OrbitControls, plus 3 WebGL context listeners | 955774, 154479 | `controls.enabled=false` in source | Same runtime on ours. Pointer not sampled on the canvas |
| Two columns | `top 80%` | ScrollTrigger | 857484 | Delays .35, .45, .45, .55 | By eye |
| Stack plate | scrub | ScrollTrigger, `ev_e8af1d02…` none direct | 290276 | Scale .98 to 1 | .9967, .9968. .9997, .9997 |
| Stack media | `top center` | ScrollTrigger | 290276 | Opacity 1s, video reset and play | 0, 0 then 1, 1. 390: .89, .90 |
| Stack cards | `top 85%` | ScrollTrigger | 290276 | Mark .85s `power2.out`. Parent passes no `cardIndex`, so delay 0 | Third mark .36, .62, .80, .91 vs .31, .58, .80, .91 |
| Trust section | scrub | ScrollTrigger, `ev_da0da527…` none direct | 698764 | yPercent 20 `power3.in`, inner opacity to 0 from .15 | y 8327: 65.7492, .187, equal strings |
| Flywheel pin | `top top` | ScrollTrigger, `ev_18b2b0ad…` none direct | 154479 | `bottom bottom-=50%`, spacer 1350 | Spacer equal |
| Flywheel open | enter | gsap 2s `power3.out` | 154479 | Clip, chip, counter, arrows | Clip 45.8154% start, equal. y 8584: .0069 vs .0026, frame phase |
| Flywheel arrows | hover | CSS scale-y | 154479 | 300ms | Equal |
| Flywheel next | click | `ev_e008616c…` | 154479 | Counter, edge, cards | 01 to 02 to 03, disabled flags equal |
| Flywheel | ArrowRight | React | 154479 | Next | 03 \| 04, equal |
| Row dividers | `top center+=20%` | ScrollTrigger | 420112 | scaleX, stagger .25, 1.2s | 390: .749, .409 vs .722, .362, phase; settle equal |
| Tooltip | hover | React, `ev_ff0418dd…` none direct on card | 420112 | Clip .4s `power1.out`, body at `<.1` | 91.68, 50.77, 21.39, 4.41 vs 85.56, 45.23, 18.28, 2.98, phase. Box 228 x 232 equal. Last column opens leftward, rect equal |
| Tooltip | leave | React | 420112 | `reverse()` | Ends 100%, 10px radius, equal |
| Cell at 390 | tap | React | 420112 | Modal for partial cells, opacity .3s | Rect 0,0,390,844 and panel 40,318,310,208 equal, closes equal |
| Security image | scrub | ScrollTrigger, `ev_09ea852a…` none direct | 146778, 656598 | Inset 5% to 0, scale 1.2 to 1 | 390 identical strings. 1440: 3.51 vs 3.59, wheel position |
| Demo cards | scrub | ScrollTrigger, `ev_daa357a2…` none direct | 309685 | Parallax 1.3, 1.4, skew 18 | Start and end identical strings, mid within wheel position; 390 identical |
| FAQ clip | scrub | ScrollTrigger, `ev_e4c2be18…` none direct | 966098 | Inset 4% to 0, scale .9, offset .4 | 390 identical strings |
| FAQ row | click, tap | React | 966098 | Height .5s, one open | 187/0, 131/64, 75/127, 35/172 vs 187/0, 130/64, 76/126, 30/177. End heights and `aria-expanded` equal |
| Blog tiles | scroll | ScrollTrigger, `ev_4517831f…` none direct | 808358 | Shared port | Slot boxes equal at both widths |

Not driven on this page, verified on other pages as shared ports: testimonial arrows and tiles, FAQ and demo CTA hover, blog tile zoom curves. Security link hover not sampled. Not on this page: drag and drop, carousels, cursor effects.

## Visual check
Every sheet of the final sets was opened. Clone: 23 at 1440, 16 at 390. Filled: 23 at 1440, 16 at 390, 9 at 1024, 9 at 1280. Sheets from superseded copy rounds (v3 to v8, and an earlier 1024 and 1280 set) were not all opened. Real wheel input at 1440, 1024 and 1280. At 390 stops use `scrollTo`, since the sampled path needs exact stops. Filled captures: `new-qa/genai-portfolio/v9/`. After those captures the security image was redrawn and rechecked alone at 1440 and 390.

Same by eye: direction of movement, what the header covers, rounded corners, what is visible when, every layout branch at 1024 and 1280.

Differences:
- **Raised words in the pinned scene cards, resolved 2026-11-02 on production, 1440:** not a gap. `animateIn` does not stop a running out-timeline, so words end at `translate(0, -30%)` when a card is re-entered while its out-timeline is still running. Forward scrolling on fresh loads: all words level, 5 of 5 loads on ours, 3 of 3 on Scale, at every stop. Leaving step 1 and returning after a delay, 2 loads each on both sites, the same result at each delay: 150ms and 300ms level, 450ms, 700ms and 1000ms all raised, 1400ms level. No mixed state on production on either site. The run-to-run variation and mixed state came from dev server timing.
- **Scale loads its scene later:** in headless runs Scale's bins arrive late, so Scale shows empty scenes, a black box on the flywheel at 1280 and 390, and no step cards where ours already plays. At 390 Scale's bins had not loaded by y 2296 in the instrument run. Compared only after load.
- **Intro heading reveal:** on Scale it starts by y 900, on ours at y 939. Likely Scale's trigger start is measured before its announcement bar mounts, not confirmed. 39px earlier.
- **Hero wrap at 1440:** a font gap. "Reliable infrastructure is at / the core", subtitle 3 lines vs 4, heading top 347.4 vs 334.5.
- **Testimonial first quote at 390:** font and copy wrap, column height equal within 1.

## REA evidence
- Bundle: `ev_24fd9157755a1149641ea78d37ccebce444fce793340af937c4192e61892cf6b`.
- No listeners on section roots: `.SgpHero` `ev_063f4e56…`, `.SgpIntro` `ev_df20aa17…`, `.TwoColumnTextWithVideo` `ev_153e4f9a…`, `.SgpStack` `ev_e8af1d02…`, `.Section` `ev_da0da527…`, `.SgpFlywheel` `ev_18b2b0ad…`, `.SgpPlatformDifferentiators` `ev_55e878f1…`, `.group/card` `ev_ff0418dd…`, `.SgpSecurity` `ev_09ea852a…`, `.SgpDemo` `ev_daa357a2…`, `.Faqs` `ev_e4c2be18…`, `.BlogPreview` `ev_4517831f…`.
- Listeners: `.SgpFlywheel button` `ev_e008616c…` (7 HubSpot `mousedown`, 1 React root `click`). `.SgpIntro canvas` `ev_9883c3d1…`, row above. `.arrow-control-button` also returned a large result; its file is gone, so its listeners are not summarised here.
- `observe_web_execution` with a CDP driver doing the same scroll, clicks and hover. Scale `ev_9470753b…` (50s), ours `ev_359606ed…` (40s). Over the MCP limit, read from `export_evidence_bundle`, then deleted. A first Scale window, `ev_61f0bcb4…`, ran with no input: the background tab did not take input.

| Function | Scale | Ours |
|---|---|---|
| `outputFrame` | 1163 | 1187 |
| `setFrame` | 1182 | 629 |
| `playRange`, `executeApply` | 17 | 14 |
| `setProgress` | 203 | 177 |
| `getFrameRange` | 833 | 736 |

The window lengths differ, so these are orders of magnitude, not a match. The `setFrame` gap has no confirmed cause; the frames compared by eye are equal.
- Not run: `capture_browser_scenario`, `observe_web_session`, `trace_web_source_location`, `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`, `export_web_scripts`. Chunks came from `curl` and comparison from the samples and pairs above. No source maps.

## Deviations from Scale
- **Fonts:** see stack.md.
- **Bins over the video limit:** `sgp-flywheel-v2` is 4.3 MB and 3.6 MB. They are frame data with no poster fallback, so they ship whole. All 8 bins total about 14 MB.
- **Safari video:** `hero.mov` and `stack.mov` are re-encoded from the WebM and flattened on the section colour (black, `#212121`), because Scale's alpha files are 5 and 7 MB. About 3.3 MB each. Not played in Safari here.
- **`dialect.mp4`:** re-encoded to 2.5 MB.
- **`pinReparent`, `onStart`, `onComplete`:** passed as on Scale, cast past gsap's types.
- **Scroll callback guard:** Strict Mode rebuilds the intro timeline in dev, and it fired at progress 0, revealing the heading at scroll 0. The callback now waits for the first progress above 0.
- **`role` on the Capabilities header:** Scale passes it to AnimatedText, which drops it. Left out.
- **Images replaced at fill, recover from commit `b8a1e85`:** logos, `security.webp` (unit patch, military uniform), `demo-1.webp` (Scale's product logo), `blog-5.webp` (pharma capsule). `content.scale.ts` still points at them. `demo-1.svg` and `security.svg` are drawn here at the same size. Blog tile 5 uses `site/nav/neutral.svg`.

## Copy
Source: the local positioning copy source, sections 0, 5, 7 and 8, with Mike's keep-first rule and his 22:46 no-niche rule. Its page note says to keep this page. 101 strings compared with Scale: **65 unchanged, 29 changed lightly, 7 rewritten**, so 64% unchanged and 93% unchanged or light. Below the 80% target because most light changes are required brand swaps (Scale, SGP, Dialect, Agentex) and placeholder attribution.

Rewritten: page title; "At its core…" line (Dialect product name); Agentic Infrastructure note (Agentex, AgentOps); eval note (SEAL and governments); first testimonial (source section 8 template); "CTO, Global Atlantic…" attribution; FAQ reliability answer (Context Engine).

No-niche swaps: "government standards" to "regulated industries"; deploying "for governments" to "for regulated industries"; DoD and FedRAMP chips; pharma blog tile to finance. "Dialect" became "decision layer"; the blog title became "Introducing Audits". The bins carry baked labels (Data, Orchestrate, Agent Execute, Evaluate, Learn), which fit the kept step titles and need no change.

## Placeholders
18 `// PLACEHOLDER` lines in `content.ts`: 7 logos, testimonial heading, 3 quotes with names, 5 blog entries, security chips, plus the comment line. The bin-baked scene labels are not placeholders.

## For Mike
- **Certification chips are placeholders in Scale's slots:** Enterprise Security Review Passed, SOC 2 Type II, ISO 27001, GDPR Compliant Deployment. Do not ship them until each is true.
- **Unverified claims kept by the keep rule:** "We are the industry leading experts in GenAI red teaming", "largely open-source technology toolkit", "evaluation datasets in days".
- **Two blog tiles have an image and no title or link**, as on Scale, where the CMS reference does not resolve. Keep, or give them titles.
- **`demo-2` and `demo-3`** are Scale's UI screenshots with generic content, dimmed behind the front card. No brand visible.

## Gaps
- Timings measured against Scale's production build on our dev server. Production not measured.
- 768, 1728 heights only. `oml:` landscape not driven. Real iOS and Safari not driven.
- Testimonial `pinOnExit` compared by eye only.
