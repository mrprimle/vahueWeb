# /experts

Live source: https://scale.com/experts at 1440x900 and 390x844 (touch), plus 767, 768, 1023, 1024, 1279, 1280 and 1920 wide, 2026-11-01. Menu label here: Reviewers. Page: `app/experts/page.tsx`, `components/pages/experts/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md), plus framer-motion, which only this section uses so far: `AnimatePresence` (module 88653) and `motion` (846932) in `33v3jultxjet3.js`. The chunks ship no version string. Module 88653 has the `anchorX`, `anchorY` and `root` props, so it is 12.x; installed `^12.43.0`. Fingerprint from `analyze_web_bundle` with sources: Next.js and React, 41 of 41 scripts parsed, no failures.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `CardGrid`, `LinkCard`, `ClientTestimonials`, `BlogPreview`, `ThreeCanvas`, `PageThemeSetter`, `SectionThemeWatcher`.

Page-only ports: `DomainExpertise.tsx` and `domainScene.ts` (558779), `CardGridSection.tsx` (794721), `shaders.ts` (line material 391355 and tile shaders 830333, 282513, verbatim from `3lbyg5foru4s_.js`). `LineSegments2` and `LineSegmentsGeometry` come from three's examples: Scale's 92923 and 130728 are copies of them. The inline `experts-webgl-bfcache-restore` script is kept.

Three additive edits to shared code:
- `ThreeCanvas.sceneProps`: Scale's 955774 forwards its remaining props to `preload`, `setup` and `onReady`. The port dropped them. Default behaviour is unchanged.
- `Testimonial.logoNode`: Scale's mask-image logo, used by the clone only. The filled page gets `LogoTile`.
- `FullBleedMediaSection.stableCtaIntro`: not on Scale, see Deviations.

## Sections
Tops and heights at 1440, Scale then ours (filled page), measured after a full scroll.

| # | Section | Top | Height | Height at 390 |
|---|---|---|---|---|
| 1 | Hero (478135, non-globe, `compact`, video, `startPercentage` 0) | 39.3, 39.3 | 856, 856 | 568, 568 |
| 2 | Card grid, 4 link cards, `md:sticky md:top-20` | 895.3, 895.3 | 740.8, 740.8 | 992.2, 992.2 |
| 3 | Domain expertise, 7 tabs, canvas | 1636, 1636 | 758, 758 | 937, 893 |
| 4 | Expert voices, 2 items | 2394, 2394 | 820.8, 819.8 | 966.1, 965.1 |
| 5 | Resources, 5 tiles (4 at 390) | 3214.9, 3213.9 | 970.3, 970.3 | 1203.4, 1203.4 |
| 6 | Pre-footer (`startPercentage` 10) | 4185.2, 4184.2 | 752, 752 | 512, 512 |
| | Page height | | 5836, 5835 | 6641, 6596 |

The 44px at 390 is a font gap. DM Mono is narrower than Aeonik Mono, so "Healthcare" and "Software Engineering" fit on one row, which leaves 6 tab rows, not 7. Scale's labels stay, so it stays.

The sticky has no travel on either site: its parent is exactly as tall as it is.

### Where the layout changes
Section heights, Scale then ours, filled page. No horizontal overflow at any width.

| Width | What changes | Card grid | Domain | Testimonials | Resources |
|---|---|---|---|---|---|
| 767 | Stacked, canvas hidden, marquee shown | 940, 940 | 730, 730 | 719, 718 | 1823, 1823 |
| 768 | `md`: 2 columns, canvas on, sticky on, hero 720 tall | 1089, 1089 | 853, 853 | 804, 803 | 1677, 1677 |
| 1023 | | 1089, 1089 | 690, 690 | 708, 707 | 2076, 2076 |
| 1024 | `lg`: 4 card columns, full blog grid | 519, 519 | 830, 830 | 826, 825 | 883, 883 |
| 1279 | | 493, 493 | 786, 786 | 826, 825 | 933, 933 |
| 1280 | `xl`: card padding and gap | 767, 767 | 786, 786 | 826, 825 | 933, 933 |
| 1920 | Content capped at 1472 | 741, 741 | 758, 758 | 784, 784 | 1083, 1083 |

Tab rows equal Scale at each of these. Panel height changes per tab on both sites: 738 to 869 at 1440, with "Research & Academia" the only 4-row panel.

## Interaction inventory
Same scripts on both sites (`instr.cjs`, `gl2.cjs`, `rea-drive.cjs`, `new-qa/experts/` in the scratchpad). React handlers delegate to the root, so element-level REA results show native listeners only.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words | Same reveal by eye; text starts later on ours when the dev server is compiling |
| Hero CTA | load | gsap, delay .5 | 961870 | .85s `power3.out` | Visible with arrow, both. See Deviations |
| Hero video | on screen | `IntersectionObserver`, React media handlers `ev_f0d4feb0…` | 310080 | Muted loop. The scale ref is ignored on video on Scale too | Plays, pauses off screen, both |
| Card hover | enter, leave | React, CSS | 874328 | `scale-y` 500ms ease-out, per-card colour | Enter .50, .71, .88, .98, 1 vs .56, .75, .91, .99, 1. Leave .70, .40, .24, .14, .05 vs .78, .45, .28, .16, .08. Same curve, sample phase differs |
| Domain heading | `top 80%`, once | ScrollTrigger | 558779, preset `F` in 947153 | `y` 100% to 0, words .8s, delay .1 | Line y 65 at section top 726, .29 at 716 vs 65 at 724, .73 at 714; then 0 |
| Tab | click, Enter | React `click` `ev_89519bdc…` | 558779 | Panel fades to 0 in .2s, swaps, back to 1 in .35s after .05 | Same end states: label, colour, panel text, canvas remount |
| Domain label | tab change | framer-motion `popLayout` | 88653, 846932 | y 60% in, -60% out, .45s `[.76,0,.24,1]` | Same library and values. Old label -39, new 0 near the end, both. Fine curves are noisy: the canvas remount stalls frames on both sites |
| Tab | hover | CSS | 558779 | 200ms colour and border | End values .8 and .2, both |
| Tab | keyboard | Native button | 558779 | `outline-style: none` on focus, both | Same, Enter activates |
| Canvas | pointer path | `window` `pointermove` | 955774, 558779 | Spin speed from pointer x, y, damped .03 | Frames match on real GPU; calls 23 vs 21 |
| Canvas | drag | `pointerdown`, `move`, `up` `ev_0252145d…` | 558779 | .004 per px; throw .02 x velocity if above 3e-4 | Same frames. Calls 1, 13, 1 on both |
| Canvas | scroll | Lenis | 558779 | Group `rotation.y` from page progress, lerp .06 | Calls 229 vs 218; frames match |
| Canvas | mount | `IntersectionObserver`, gsap | 955774, 558779 | Scale 0 to 1, .7s `power2.out`; 3 nearest neighbours, seed 12 | Tile layout equal on every tab with the same count |
| Marquee, phones | mount | CSS | 558779 | 14s linear, 64px tiles | Runs, both |
| Testimonials | scroll, click | ScrollTrigger, React | 685963 | Shared port | Next arrow changes the selected tile, both. Curves in the physical-ai spec |
| Blog tile | hover | CSS | 808358 | Image scale to 1.05 | 1.011, 1.021, 1.026, 1.032, 1.037 vs 1.011, 1.020, 1.026, 1.032, 1.037 |
| Pre-footer clip | scroll | ScrollTrigger scrub | 656598 | Inset 5% to 0 | At 3348 to 3748: 4.61, 3.98, 3.38, 2.76, 2.14 vs 4.60, 3.99, 3.37, 2.75, 2.14 |
| Page restore | `pageshow` | Inline script, React | RSC payload, 558779 | Reload without a canvas; remount on bfcache | Ported, not driven |

Not on this page: pinning with travel, Keen, Embla, cursor effects.

## Visual check
Pairs at first paint (.3 to 6s) and at every stage, 50% of the viewport, 10% steps through the hero's first viewport, at 1440 and 390, real wheel input. Headless with `--use-angle=metal` for the final filled pass; canvas also compared in frames at arrival, drag, release, pointer corners and tab changes. Opened and read: `new-qa/experts/visf/` and `gl2/` in the scratchpad. Breakpoint shots: `w/`.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, what is visible when, graph layout, line band and tile depth. Differences:

- **Hero video frame:** the frames differ in time on any run, since each site starts the loop at its own moment.
- **Header on a stop or two:** visible on one site only. My script corrects a wheel overshoot by scrolling back, which reveals the header. Script artefact, on both sites at different stops.
- **Canvas blank on Scale in software GL:** with SwiftShader Scale's canvas stayed empty after a tab change, while ours rendered. On a real GPU both render, so I read it as Scale's load under software GL, not a behaviour. Cause not confirmed.
- **Icons missing once:** in one filled run at 1440 all four card icons stayed hidden. Not reproduced in 5 later loads or the final pass. It is likely the same race as the hero CTA below, not confirmed. Dev only as far as I could see.
- **First 300ms, chrome:** same as physical-ai: the bar is server-rendered here.

## REA evidence
- Bundle, 41 of 41 scripts parsed: `analyze_web_bundle` `ev_ded133838e8076d2…`.
- Page: `inspect_web_page` `ev_b2e135e1fc7fb90b…`, over the response limit, read with `jq`.
- Listeners found: `html` `ev_91a5a2d35e36ea02…` (passive `scroll`, `1h0nvyhf5gbrf.js`, rest OneTrust), `body` `ev_08fa568d5551809a…` (`touchstart`), canvas `ev_0252145dc1bc9f24…`, filled-page canvas `ev_ae4f92fdf41e6de3…` (the same set), tab `ev_89519bdcda440f08…` (React `click`, HubSpot `mousedown`), video `ev_f0d4feb09b0b6e06…`.
- No listeners: `#domain-expertise` `ev_c160d73b33034bd8…`, `.FullBleedMediaSection` `ev_c06f017447545f93…`, `.LinkCard` `ev_34d1f361e32cef64…`, `.ClientTestimonials` `ev_dc86e1fd3d476ab6…`, `.BlogPreview` `ev_626afaf53bab6af0…`, `.CardGrid` `ev_deced720dc1c7425…`.
- Execution, 40s precise coverage, same scripted drive: Scale `ev_f9454abe5776c12f…`, filled page `ev_4c03c3b895e3e4ae…`. Over the MCP response limit, so read from `export_evidence_bundle`, then deleted.
- Discarded windows: `ev_aa51a225627888bf…` (the drive failed to start), `ev_aeca58cdf98a611b…` (the drive hung, since a background tab of the shared Chrome does not take input). The kept windows ran in a dedicated headless Chrome on port 9241, one foreground tab, closed afterwards.
- `capture_browser_scenario`: failed twice, connect and launch, with `cleanup_incomplete`, "Analysis operation timed out after 1000ms". Not retried further.
- Not run: `trace_web_source_location`, `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`, `observe_web_session`, `export_web_scripts`. Chunks came from `curl`, and comparison from the samples and pairs above.

### Calls in the window
| Function | Module | Scale | Ours |
|---|---|---|---|
| Pointer down, move, up | 558779 | 1, 13, 1 | 1, 13, 1 |
| Scene `setup` | 558779 | 4 | 4 |
| Tab click | 558779 | 4 | 4 |
| Scene `onResize` | 558779 | 6 | 4 |
| Scene `onMouseMove` | 558779 | 23 | 21 |
| Scene `onScroll` | 558779 | 229 | 218 |
| Scene `onTick` | 558779 | 32 | 52 |
| Scene `preload`, `onDestroy` | 558779 | 8, 4 | 16, 8 |

`preload` and `onDestroy` double on ours because the dev server runs React Strict Mode. `onTick` depends on frame rate. The `onResize` gap of 2 has no confirmed cause.

## Deviations from Scale
- **Hero CTA, `stableCtaIntro`:** Scale's order is retroactive enter in a layout effect, then prepare in a passive effect, then a refresh retries the enter. If the main thread blocks long enough, `lagSmoothing(0)` finishes the text at once, `started` turns true, the prepare hides the CTA and the retry returns early, so the CTA stays hidden for good. It happened on this page in dev, where the WebGL section and Strict Mode add the block. With the option on, prepare runs first and never after a reveal. Curves are unchanged. Only this hero uses it. Other heroes above a heavy section can hit the same race.
- **Fonts:** see stack.md. Tabs are 2 to 5px narrower, one row fewer at 390 as above.
- **Hero video:** re-encoded to 3.3 MB from 5.3 MB, same 1920 x 1080, no audio track. Scale's file has audio and plays muted.
- **Logos on the filled page:** one `logo-tile.svg` at Scale's per-logo box. On the canvas the tile drawing uses the SVG's own aspect, not each box. Removed from `public/` with the three branded images: recover from commit a21bf98 to re-check the clone, since `content.scale.ts` still points at them.
- **Images replaced at fill:** Outlier (name baked in), the Generative AI collage (Scale's papers) and the Leaderboard cover, not rendered in that tile, became `site/nav/neutral.svg`.
- **Links:** external Scale links became `/labs/leaderboard` and `/careers`.

## Copy mapping
Under Mike's rule and `vahue-positioning-copy-source.md` §0, §5, §6: keep Scale's line if true, swap a few words if not. This page is Vahue's expert engineer network.

69 strings: 53 unchanged, 1 brand only, 15 changed lightly, 0 rewritten. Six of the light ones are the forced name, role and quote placeholders; without them that is 54 of 63 kept, 86%.

Changed: meta title and description, hero headline ("The human experts behind AI agents.", from the source doc), hero body ("training" to "workflow"), resource titles (Scale Labs, Human Frontier Collective, Outlier, Reinforcement Learning, Generative AI Data Engine, to Vahue Labs, Human Expert Collective, Experts, Engineering Enablement, Back-office Sync), pre-footer body (brand). Quotes keep Scale's expert-voice story, not the customer template in §8, since the slot is the expert speaking: Gopakumar-Vafa and the topological vertex became a coverage exclusion and a "second-source" method, Bank of America became a mid-market bank.

## Placeholders
`// PLACEHOLDER` in `content.ts`: 31 lines. Network claims kept word for word for Mike to confirm or replace: "Millions of experts", the Ivy League line, "60%+ of the Fortune 500", "65+ languages. 117 countries.", "370+ unique fields", the seven "Who they are" lines, and the Nature, Science, Cell, Rhodes, Fulbright and NSF lines. Also 7 logo sets, 2 names, 2 roles, 2 quotes, and the meta and pre-footer network lines.

## For Mike
- The network claims above are Scale's facts sitting on our page until you replace them. Named institutions are in them: Stanford, MIT, Nature, Science, Cell.
- The menu reads "Reviewers"; the source doc makes this the expert network page. "Experts", Scale's own label, would fit. It lives in `components/site/content.ts`, so it is left for the lead.
- The hero and "Work With Us" go to `/demo`. The fellowship and platform tiles go to `/careers`, since we have no such pages.
- People in the hero video and pre-footer are Scale's footage. No brand in them.

## Gaps
- `oml:` landscape and real iOS were not driven; touch runs through CDP on Chrome.
- Page restore from bfcache was not driven.
- Timings were measured against Scale's production build on our dev server; no production build was measured.
