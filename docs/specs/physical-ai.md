# /physical-ai

Live source: https://scale.com/physical-ai at 1440x900 and 390x844 (touch), 2026-11-01. Menu label here: Document Intake. Page: `app/physical-ai/page.tsx`, `components/pages/physical-ai/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md): GSAP, ScrollTrigger, SplitText, Lenis. Three.js and the 975 KB `0sni47mcvnqwg.js` load on Scale's page, but the page has no `canvas`, Keen or Embla. Fingerprint from `analyze_web_bundle` with sources: Next.js and React, 46 of 46 scripts parsed, no failures.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `LogoMarquee`, `ClientTestimonials`, `PageThemeSetter`.

Page-only ports: `ModelChart` (77633), feature tiles (460138, both column variants), `SectionTitle` (1900), the side-by-side and three-card markup (server-rendered in the RSC payload). `physical-ai.module.css` holds `PrXvJq_feature` from `0npdyq12us3md.css`. `Aoc1lW_fullBleedImageMedia` is written as the same utility classes the hero uses.

One additive edit to shared code: `Testimonial.nameTile` in `ClientTestimonials`. Scale's module 685963 shows the client name in the tile when there is no logo. The port only had the logo branch. Default behaviour is unchanged.

## Sections
Tops and heights at 1440, Scale then ours (filled page), measured after a full scroll.

| # | Section | Top | Height | Height at 390 |
|---|---|---|---|---|
| 1 | Hero (478135, non-globe, `startPercentage` 0) | 39.3, 39.3 | 856, 856 | 616, 616 |
| 2 | Product overview, 4 features | 895.3, 895.3 | 584, 584 | 1018.5, 1018.5 |
| 3 | Testimonials, 2 items | 1479.3, 1479.3 | 717.1, 700.6 | 966.1, 965.1 |
| 4 | Use case | 2196.4, 2179.9 | 739.8, 739.8 | 715.8, 715.8 |
| 5 | Key features, 3 cards | 2936.2, 2919.7 | 840.8, 840.8 | 1615.1, 1615.1 |
| 6 | Environments, 3 cards | 3776.9, 3760.4 | 784.8, 784.8 | 1564.8, 1564.8 |
| 7 | Review image, chart | 4561.7, 4545.2 | 916.1, 916.1 | 1050.7, 1050.7 |
| 8 | The difference, 6 features | 5477.8, 5461.3 | 800, 800 | 1749.3, 1749.3 |
| 9 | Pre-footer (`startPercentage` 10) | 6277.8, 6261.3 | 816, 816 | 576, 576 |
| | Page height | | 7992, 7976 | 11334, 11333 |

The one height gap is a font gap: "Don't just take our word for it" sets on 3 lines in Aeonik Mono and 2 in DM Mono, 16.5px at 1440. No overflow at either width.

## Interaction inventory
Same script on both sites (`new-qa/physical-ai/instr.cjs` in the scratchpad). React handlers are delegated to the root, so element-level REA results show only native listeners. A CDP listener scan over every page node found the same set on both: images `load` and `error`, buttons and links `click` (29 nodes on Scale's markup, 19 on the filled page, where the 10 marquee images became tiles).

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| All section roots, figures, feature images, chart | any | None. REA ids below | | No hover, no pointer tracking | Pointer grid at 9 scroll stops: nothing changed, both, except the two chart labels that finish fading in at stop 5100 |
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words from AnimatedText | Line y from trigger 62.2, 38.2, 22.4, 12.1, 5.1 vs 73.3, 45.8, 26.8, 14.5, 7.0: same curve, different frame phase. Both 0 by about 900ms |
| Hero CTA | load | gsap, delay .5 | 961870 | .85s `power3.out` | Opacity .444, .689, .844, .933, .976 vs .444, .691, .844, .932, .976. Radius 4, 6, 7, 7, 8, both |
| Hero media | scroll | ScrollTrigger scrub | 540431 | Scale 1.25 to 1 | 1.0139 at top, 1 at 304, both |
| Logo marquee | mount | CSS animation, no listener | 880750 | 40s linear, -50%, no hover pause | -46.9, -50.6, -54.5 vs -46.7, -50.6, -54.3. Keeps moving under the pointer, both. Tiles 70 x 27 |
| Testimonial panel | scroll | ScrollTrigger scrub | 685963 | Width 90% to 100% | 1252.8, 1362.8, 1391, 1392 vs 1252.8, 1364, 1391.2, 1392 |
| Testimonial reveal | `top 80%` | ScrollTrigger | 685963 | Index -1 to 0, nothing selected before | Selected false, false before, both. Tile fill 106.7 then 0 by about 300ms, both |
| Tile fill, next arrow | click | React, HubSpot `mousedown` on Scale only | 685963 | .3s, lands at top 136 | Fill 58.78, 98.49, 106.66 vs 58.78, 98.49, 106.66. Top 186, 154, 144, 139, 137, 136, both |
| Chip | index change | React | 685963 | Width to 20, swap, width to text + 26 | Same sequence. End width differs with the text |
| Quote, name | index change | React | 685963 | Flip .48s, stagger .05, quote in at .35 | Same call counts, see below |
| Arrows | hover, leave | React | 685963 | .3s, white fill | Fill alpha .47, .796, .973 vs .48, .796, .97. Leave .53, .2, .03 vs .52, .2, .027 |
| Prev arrow | click at index 0 | React | 685963 | Wraps to last | Second tile selected, both |
| Tablist | ArrowRight, ArrowDown, Enter, Space, Tab | No arrow handler | 685963 | Roving `tabIndex` | Focus stays on the tile for the first four, Tab goes to Previous, then Next, both |
| Tile, arrows at 390 | tap | React | 685963 | Fill moves on x | 43.68, 72.17, 78 vs 42.99, 69.16, 78. Top 352, 217, 171 ... 136 vs 355, 231, 171 ... 136 |
| Chart | IntersectionObserver .25, once | IO, no listener | 77633 | Dash to 0, 1.6s `cubic-bezier(.4,0,.2,1)`, delays 0, .3, .6. Labels .5s at delay + 1.45 | Same offsets two frames apart: 44.1, 26.5, 15.9, 6.5 vs 22.6, 13, 6.5, 2.4. Lengths 390.3, 423.6, 465.3, equal. Drawn with no dash before the observer fires, both |
| Pre-footer clip and media | scroll | ScrollTrigger scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | 11 stops of the card's top, identical strings: 5%, 4.38272%, 3.76543% ... 0, and 1.25, 1.2191, 1.1883 ... 1 |
| CTA wash and arrow | enter, leave, re-enter | React | 892855 | Fill 600ms, reset at 680ms | Enter -61.2, -34.8, -18.2, -7.8, equal. Leave 38.8, 65.2, 81.8, equal. Arrow -30.6, -17.4, equal |
| Border CTA | enter, leave | React | 892855 | Fill 300ms, label .9 | 38.4, 9.2, .16, equal. Label .931, .906, .9, equal |
| Swipe at 390 | touch | Lenis `syncTouch` | | | 240, 481, 723, 965, 1206, 1448 vs 241, 483, 725, 966, 1208, 1450 |

Not on this page: drag and drop, keen or embla, canvas, cursor effects. No hover state on feature tiles, cards, images or the chart, on either site.

## Visual check
Pairs at first paint (0 to 4s) and at every section stage (50% of the viewport), plus 10% steps through the hero, testimonial and pre-footer scrub ranges, 1440 and 390, driven by real wheel input. 131 pairs, opened and read: `new-qa/physical-ai/vis/` and `sheets/` in the scratchpad. Paint timing checked with a CDP screencast, `cast/`.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, what is visible when. Scale also paints the hero text and CTA first, hides them on hydration, then reveals them: ours does the same. Differences:

- **First 300ms, chrome, not fixed here:** Scale does not server-render the announcement bar. It paints without the bar, with the hero 39px higher, then the bar mounts and pushes the page down at about 350ms. Ours server-renders the bar, so the hero never shifts, and the fixed header sits at top 0 over the bar until the layout effect sets `--announcement-offset`. It is plainest at 390 in the first captured frame. It lives in `components/site/AnnouncementBar.tsx`, so it affects every page. For the lead.
- **Seen once on Scale:** a black band under the header at scroll 30 and 60, after a long jump back up. Two clean repeats on Scale at the same positions, so I read it as a raster artefact. Nothing built for it.
- **Copy and imagery:** expected differences, listed below.

## REA evidence
- Bundle, 46 of 46 scripts parsed: `analyze_web_bundle` `ev_04748b6cd00626a5a9f3a8f114ae018c7a8743f03674f2e7bf04c6c064a351a4`.
- Page: `inspect_web_page` `ev_36f22a75269a0a6d…`, 1,224 nodes, 46 scripts, no workers.
- Listeners found: `html` `ev_bff2836a233…` (passive `scroll`, `1h0nvyhf5gbrf.js`, rest OneTrust), `body` `ev_b19e4073ea2…` (`touchstart`). HubSpot `mousedown` plus React root `click`: hero CTA `ev_745f9b7c…`, tile `ev_088a6a1a…`, next `ev_de5fbf66…`, previous `ev_8154095e…`, border CTA `ev_7715ac9b…`.
- No listeners: `.ClipScrollSection` `ev_969836aa…`, `.FullBleedMediaSection` `ev_6e57a3d9…`, `.LogoMarquee` `ev_3a20e270…`, overview `ev_a6467047…`, `figure` `ev_007261de…`, `.ClientTestimonials` `ev_d78fdd85…`, use case `ev_9554f756…`, card image `ev_a3278311…`, embodiments `ev_333454f4…`, environments `ev_6987a9dd…`, annotations `ev_6a59d090…`, chart `ev_b6998c1e…`, chart svg `ev_9e26f108…`, difference `ev_246c5655…`, pre-footer `ev_3727ebd9…`.
- Execution, 55s precise coverage, same scripted drive: Scale `ev_39938329673db5f6…`, filled page `ev_f37612807c637c1e…`. Over the MCP response limit, so read from `export_evidence_bundle`, then deleted.
- Discarded windows: clone `ev_f9fad3026a09a162…` and filled `ev_6e1829486d1c3c4c…`. In the windowed Chrome a wheel moves 1.6x further than in headless, on both sites (5 x 250 gives 2000 on both), and in those two runs the next arrow had gone under the header, so the clicks hit the header. The drive now scrolls the section into place first. On Scale's window the pre-footer CTA was off screen, so its hover is covered only by the Playwright samples above.
- `capture_browser_scenario`: `ev_563ef7628764263f…` click on Next timed out at 15s; it cannot abort OneTrust, whose overlay is the likely cause, not confirmed. Retry with keyboard `ev_db72459bd778a5d9…`: Enter ran with no navigation. Its last step, my own check, failed because the selector matches two tiles, so that capture reads incomplete.
- Not run: `trace_web_source_location` (no `sourceMappingURL` in the two page chunks fetched; maps were not requested from REA), `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`, `observe_web_session`, `export_web_scripts`. Chunks came from `curl`, and comparison from the samples and pairs above.

### Calls in the window
| Function | Module | Scale | Ours |
|---|---|---|---|
| Quote and name flip in, out | 685963 | 8, 6 | 8, 6 |
| Lenis scroll to the section | 685963 | 3 | 3 |
| Arrow click, tile select | 685963 | 2, 1 | 2, 1 |
| `prepareForIn` | 685963 | 14 | 16 |
| Tile render | 685963 | 16 | 32 |
| Chart render, curve | 77633 | 1, 3 | 2, 7 |
| Pre-footer and hero scrub `onUpdate` | 656598, 540431 | 67 | 64, from the clone window |

Render counts on ours double because the dev server runs React Strict Mode. The `prepareForIn` gap of 2 has no confirmed cause: the flip curves sampled above match. Module attribution on ours is by function name, since dev chunks shift module markers.

## Deviations from Scale
- **Fonts:** see stack.md. The testimonial label wraps 2 lines instead of 3, the marquee line box is 26 vs 27 on the clone. Filled tiles are fixed at 27.
- **`Aoc1lW_fullBleedImageMedia`** is the hero's utility classes, same rules.
- **Image quality:** Scale asks `q=80` for two images. Here Next's default 75: `images.qualities` is outside this page.
- **Pre-footer image:** Scale's payload names `prefooter.webp` while its DOM loads `prefooter.jpg`. Here a 1920-wide webp from the 7952-wide source.
- **Images replaced at fill:** `img-embodiment-1` (Scale's logo on a cap) and `img-embodiment-3` (a small maker's mark on the robot) became `site/nav/neutral.svg`. The multimodal screenshot had robot instructions baked in, so `review.webp` is redrawn at the same 1920 x 1248 and layout, with an invoice and the intake steps. Removed from `public/` with the logos: recover from commit 22daeef to re-check the clone, since `content.scale.ts` still points at them.
- **Security sentence:** Scale claims SOC 2 Type II and ISO 27001. Neither is in the research, so the second sentence states the audit log instead.

## Copy mapping
Document Intake, the research's own mapping for this template. Substance: the Core Job from the full research (a high-volume document workflow, no added headcount, control over exceptions), the Critical Chain from inbox to system of record, and its success order: control first, then throughput. Names stay as in `research/research.ts`: Audit, Pilot, Operate, Document Intake.

Product overview became the chain and the four promises. Use case became the backlog trigger. Embodiments became document types, environments the intake channels, the annotation block the side-by-side review, model improvements the shadow-mode Pilot. CTA "Build AI" became Back-office Sync, its destination's menu label. "Product Overview", "Use Case", "Key Features" and the testimonial label are unchanged generic labels.

Word counts: 75 strings compared, 61 within 15%. The other 14 are one or two words off, mostly on very short strings, for example "Residential" to "Web Portals". Two are the "Role, Company" placeholders. The longest are the use case line (11 to 13) and the Pilot line (12 to 14), which needed the length to keep Scale's line count. Line counts equal Scale at both widths except "Field-by-field extraction…" on one card at 1440, which does not change the row height.

## Placeholders
`// PLACEHOLDER` in `content.ts`: 5 marquee tiles (one line), two names, two roles, two quotes, the "1000+" figure, the chart curves. 9 lines. Chart shapes are Scale's and illustrative.

## For Mike
- Non-brand photos of robots and collection rigs stay under document copy: hero, the isometric plate, Lab Reports, and the three intake channels. They carry no brand, so the rule keeps them, but they do not show documents. "SA3" on a sign in the Email Inboxes photo is not ours.
- Add SOC 2 or ISO lines only if they are true.
- Announcement bar first paint, above.

## Gaps
- `oml:` landscape and 768 to 1023 were not driven.
- Real iOS was not driven: touch runs through CDP on Chrome.
- Timings were measured against Scale's production build on our dev server; no production build was measured.
