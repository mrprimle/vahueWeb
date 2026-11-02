# /enterprise

Live source: https://scale.com/enterprise, 2026-11-01. Stack: [../stack.md](../stack.md). Scale's strings: `components/pages/enterprise/content.scale.ts`. Rendered strings: `content.ts`.

REA: `analyze_web_bundle` with sources `ev_803c02c46af389fe…` (47 of 47 scripts parsed), `observe_web_execution` during a driven pass (hero pointer and node hover, carousel drag, keys and arrow, sphere drag, testimonial next, card hover) `ev_37cc9936ddba8826…`. That result is 10.5 MB and exceeded REA's response budget. It is retained and was exported (646 MB), but its coverage ranges were not parsed: the export was deleted for disk. Listener samples are in the inventory.

Another agent's Chrome collided on port 9257 around 22:51 and sent stray input to my tab. The DOM samples and three canvas and viewport listener samples were retaken on a fresh port (9277). The values matched. The side-by-side sheets ran in their own Playwright browser and were not affected.

## Sections

Section tops and heights, Scale then filled. Measured after a full scroll.

| # | Section | Module | 1440 | 390 |
|---|---|---|---|---|
| 0 | Hero (pinned, 900 spacer) | 291143 | 900, equal | 844, equal |
| 1 | Pull-apart WebGL | 322473 | 4050, equal | 3798, equal |
| 2 | Section with Bridge | 698764, 676267 | 796, equal | 850.8, equal |
| 3 | BlogPreview3D | 62032 | 786, equal | 550.4, equal |
| 4 | LogoCloud sphere | 151755 | 810, equal | 759.6, equal |
| 5 | Section with stat CardGrid | 698764, 540409 | 852, equal | 1195, equal |
| 6 | ClientTestimonials | 685963 | 833.8 vs 817.3 | 997, within 1 |
| 7 | TwoColumnTextWithVideo | 857484 | 1062.1, equal | 794.4, equal |
| 8 | EnterprisePillars | 909085 | 901.6 vs 893.6 | 1232.6, equal |
| 9 | EnterprisePoweredBy | 366838 | 1347.5, equal | 1112.1, equal |
| 10 | EnterpriseBuiltToBeTrusted | 270115 | 1416, equal | 1525.2, equal |
| 11 | Spacer, FullBleedMediaSection, spacer | 540431 | 64, 720, 32, equal | 64, 480, 32, equal |

Other widths, filled minus Scale, sections over 1px only:

| Width | Differences |
|---|---|
| 768 | none |
| 1024 | pillars -26 (the clone was also -26) |
| 1280 | race +4, pillars +11, powered +23, trusted +4 (equal to the clone) |
| 1920 | race +4, pillars +2, powered +11, trusted +2 |

Testimonials at 1440 is the known font gap: the mono heading wraps to 2 lines, on Scale 3. The clone had it too.

At 1200, 1280 and 1920 Scale's first section sat at top 0, ours at 39.3. Cause not established; section heights are unaffected.

## Interaction inventory

Listener evidence: section roots and static cards have no direct listeners (`.EnterpriseHero` `ev_d64d928c…`, `.EnterprisePoweredBy` `ev_1b2fc0c2…`, `.LinkCard` `ev_6056357d…`, `.TwoColumnTextWithVideo` `ev_aacdac21…`, `.EnterprisePillars` `ev_5160dfc5…`, `.Card` `ev_6842dc71…`). `.node` also has none (`ev_7a8cea7e…`, before the collision): hover is React delegated.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero nodes | load | gsap | 291143 | x 2s `power4.inOut`, y 1s, scale 0 to 1, image scale 5 to 1.2, clip `inset(10px)` to 0 1.6s `power3.inOut`, per-node delay | Node 0 at 400ms steps from first motion: .002, .072, .754, .989 vs .001, .081, .697, .983. Ours starts about 400ms later in dev |
| Hero nodes | window pointermove | `addEventListener` | 291143 | Per-node ease `.3*k`, reach 20px x depth `1+.4i`, off on phones | Same sign and scale at 4 corners; idle sine differs by clock |
| Hero nodes | idle | ticker | 291143 | `sin(.4t)`, `cos(.5t)`, scale `.05cos(.3t)`, fades in over 4s after 1.7s | By eye |
| Hero node | mouseenter, mouseleave | React | 291143 | Node 1.2, image 1, .35s `sine.inOut` | At 100ms steps 1.047, 1.127, 1.195, 1.2 vs 1.045, 1.137, 1.198, 1.2; image 1.153, 1.073, 1.005, 1 vs 1.155, 1.063, 1.002, 1 |
| Hero edges | load | gsap | 291143 | Base dash 1000 to 0, 1.2s; moving dash 8s yoyo from 2s + .5i | By eye |
| Hero | scroll | ScrollTrigger pin, `pinSpacing:false` | 291143 | `yPercent` to -20, `power2.out` | 10 stops by eye |
| Pull-apart | scroll | Lenis `animatedScroll` / 4.5 viewports | 322473 | Timeline rotation, scale 1.75 to .275, progress, y .165; text beats at .15 to .35 and .65 to 1 | 11 stops by eye, equal |
| Pull-apart canvas | pointermove | Window, camera rig module 19490 | 322473 | Strength .25 | By eye. OrbitControls listeners attached and disabled, as on Scale (`ev_a0fc91d8…`) |
| Bridge inset | scroll | ScrollTrigger scrub | 698764 | Width 90% to 100% | By eye |
| Logo marquee | load | CSS animation | 880750 | `startMarquee` on mount | By eye |
| Carousel | drag | Embla (`ev_893a7b9e…`: click, dragstart, touch, mousedown, contextmenu) | 62032 | `loop`, `align: center`, `dragFree: false` | Slide opacity, z-index, scale after a 300px drag equal to .001, one index apart from autoplay |
| Carousel | arrows, dots, ArrowLeft, ArrowRight | React, window keydown | 62032 | 8 slides on desktop, 4 on touch; arrows from `xl` | 8 slides, both |
| Carousel | autoplay | `setInterval` 4500 | 62032 | Stops for good on first interaction | Ported, by eye |
| Carousel card | hover | CSS | 62032 | Image `scale-125`, arrow slides in, 500ms | By eye |
| Sphere | pointerdown, move, up | Canvas (`ev_30313979…`) | 151755 | Rotation `.004 x delta`, inertia `.02`, cursor grabbing | Cursor `grabbing` then empty, both |
| Sphere | pointermove | Window | 151755 | Spin `35e-5 + (x-.5)*24e-5`, `8e-5 - (y-.5)*24e-5` | By eye |
| Sphere | scroll | ScrollTrigger, onScroll | 151755 | Reveal .5 to 1, turn `.82 x (progress-.5)` | By eye |
| Stat section | scroll | ScrollTrigger scrub | 698764 | `yPercent` 20 `power3.in`, opacity 1 to 0 | By eye |
| Testimonials | next, prev, tabs | `mousedown`, click on the button (`ev_6fb4f1b2…`) | 685963 | Shared port, verified earlier | Driven, not re-sampled |
| Pillars, powered cards, trusted panel | scroll | Shared and scrub | 909085, 366838, 270115 | Card x ±160 desktop; panel clip 0 to 5%, image scale 1.5 to 1.25, translate ±20% | By eye |
| Link cards | hover | CSS | 874328 | Fill `scale-y`, 500ms | By eye, tan on card 2 |

## Visual check

Sheets in `new-qa/enterprise`: `clone-1440` 15, `clone-390` 6, `filled-1440` 15, `filled-390` 6, plus `t1` for the recheck. First paint at 3 moments, every 50% of the viewport, every 10% through the hero and pull-apart ranges, real wheel input. All opened with Read.

Found and fixed by eye: the pull-apart's two outline helpers were swapped (markers were wrong), and the intro's dashes and scroll label died under React Strict Mode. Scale's own frames vary with idle clocks and video phase.

Tiles on the sphere looked small in the two full two-tab runs. A one-tab stepped run shows them equal to Scale, with ticks running, so this is a capture artefact of a throttled tab; I did not establish the exact mechanism. The filled sheets were retaken one tab at a time against the clone's Scale frames.

Not reproduced: one `filled-390` run shows stat card icons missing. Two later runs read them fully open and visible. Dev Fast Refresh from a parallel agent's edit is a guess, not confirmed.

The `filled-390` bridge frames show a pale box behind the video at some stops. That run is Chrome with an iPhone agent, which plays the HEVC without alpha. AVFoundation reports alpha in `squares-filled-hevc.mp4`. Not checked in real Safari.

## Copy

Direction: `craft-go-to-market` enterprise table, Mike's no-niche rule. 87 strings by script (`alt` and URLs excluded): 62 verbatim after Scale to Vahue (71%), 14 light (16%), 11 rewritten (13%). The rewritten ones are names, roles, one quote, one stat, one label.

- Pull-apart keeps Scale's live lines, which differ from the wording quoted in the go-to-market table.
- "Life Science" became "Logistics" (advanced biotech).
- "government and defense" became "finance and support".
- "frontier research" became "applied research", as Vahue does not work alongside labs.
- "Dialect" became Vahue.
- "uniquely yours" became "truly yours" in the left column only: "Vahue" is wider and forced a third line at 1280.
- "Generative AI Platform" became "Agentic AI Platform" for the same reason at 1024.

## Placeholders

23 `// PLACEHOLDER` lines in `content.ts`: all logos (tiles at Scale's boxes), 5 stats, 3 quotes with names and roles, the insurer post title, the "trusted by" lines, the compliance claim. "Real customers, real results." stays as Scale's heading above placeholder stats.

## Images

| Slot | Clone | Filled |
|---|---|---|
| Trusted | Pentagon | `trusted-filled.webp`, generated audit trail panel |
| Closing | MRI scanner | `prefooter-filled.webp`, generated report and empty queue |
| Blog 2 | Building with US flags | `blog-evals-filled.webp`, from the site's about image |
| Hero node 6 | Crystals | `hero-logistics.webp`, generated shipments panel |
| Pull-apart centre | Triangle | `pull-apart-logo-filled.png`, vahue wordmark |
| Bridge video | Triangle at centre | `squares-filled.webm` and HEVC, V mark burned in |

The generated panels show labels and no figures. `public/home/app-logistics.webp` in git history is a soldier: do not reuse it.

## Deviations

- **Fonts:** see stack.md.
- **`isDesktop`:** Scale reads react-device-detect. Here `(hover: hover) and (pointer: fine)`, so a touch laptop counts as not desktop.
- **Curves:** `pull-apart-curves.json` is fetched, where Scale bundles the module.
- **Intro:** starts one frame later than Scale, for Strict Mode.
- **Videos:** cables, stacking and squares re-encoded under 3 MB, except `squares-filled.webm` at about 3.2 MB.
- **Blog links:** the two external-style posts go to `/blog`.
- **Category filter:** Scale's sphere buttons come from an empty list, so none render on Scale either. Selection code not ported.

Additive edits in `components/site/shared`: `iconImage` on `LinkCard`, exported `CategoryIcon` with `className`, `evergreen` in `HeadlineCta`, `backgroundColor` on `ResponsiveImage`.

## Gaps

- Scale's triangle stays small in the pillars video, the cables video and the pull-apart markers. It is also the site's bullet motif. Mike to decide.
- `platform.webp` is Scale's product screenshot. No logo in it.
- The cell tower video and photo, oil rig, X-ray and surgeon stay as ordinary industry visuals.
- Motion marked "by eye" has no numeric sample.
- `capture_browser_scenario` was not used: `observe_web_execution` plus Playwright covered the interactions.
