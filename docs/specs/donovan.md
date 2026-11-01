# /donovan

Live source: https://scale.com/donovan, 2026-11-01. Menu label here: Support and Voice Agents. Page: `app/donovan/page.tsx`, `components/pages/donovan/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). No WebGL, pinning, Keen, Embla or pointer effects on this page, though Scale preloads the three.js chunks. Headless UI `Tab` drives the tabs.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `LogoCloud`, `FeaturesWithIcons`, `GlowBackground`, `PageThemeSetter`.

New and shared: `shared/TabsWithImages.tsx` (753553, 11972, 647980, 582844) with `TabsWithImages.module.css` (Scale's `_5VC0Rq`, `dB_njW`, `it_l1W`, `_1N8NtW` rules). Page-only: `Mocks.tsx`, generated from the RSC payload with Scale's classes and inline styles; every string and bar width is a prop.

## Sections
Heights, Scale then filled, measured after hydration and image load.

| # | Section | 1440 | 1100 | 390 |
|---|---|---|---|---|
| 1 | Hero (478135, non-globe, `startPercentage` 0) | 856, 856 | 856, 856 | 616, 616 |
| 2 | Logo cloud, 5 logos | 159, 159 | 159, 159 | 159, 159 |
| 3 | Overview, 3 mock cards | 1104.3, 1104.3 | 1074, 1074 | 1958.8, 1958.8 |
| 4 | Foundation, 3 + brace + 6 cards | 1190, 1190 | 1554, 1554 | 2218.4, 2218.4 |
| 5 | Tabs, 5 panels | 784.9, 784.9 | 618.5, 618.3 | 664.1, 665.1 |
| 6 | Overmatch, 6 features | 848, 848 | 872, 872 | 1883.6, 1883.6 |
| 7 | Trusted, 3 features | 536, 536 | 536, 536 | 896.4, 896.4 |
| 8 | Pre-footer (`startPercentage` 10) | 752, 752 | 752, 752 | 512, 512 |

Clone also measured at 1920, 1450, 1280, 1279, 1024, 1023, 900, 768, 767, 640, 480: no overflow, every section equal apart from:
- 1px on the tabs section below `lg`: the dots row is 25 tall on Scale and 26 here. Line box from font metrics, font gap.
- 1024 Trusted: 560 vs 536. "DISA IL4 and FedRAMP High Authorized" wraps on Scale in Aeonik Pro. Font gap.

Filled, final copy, at 1920, 1440, 1280, 1024, 1023, 768, 767, 640 and 390: section heights equal the clone's result, so the same two font gaps remain. Exceptions: 1100 and 480, where card 1 body or the overview subtitle takes one line fewer (26.4px, 25.6px).

Layout changes by width: tabs pill from `lg`, dots below; panel grid `1.5fr 2fr`, `1.2fr 2fr` from `xl`; figure above the text below `lg`; cards 1, 2, 3 columns at `md`, `lg`; features `basis-1/4` from `lg`; logos marquee below `md`.

## Interaction inventory
Same script on both sites (`inter.cjs` in `new-qa/donovan`). React handlers sit on the root, so element-level REA results show HubSpot `mousedown` plus React `click`. Wait for `__reactProps` before driving Scale: it hydrates after 4 to 7s under load, and the first runs here read the unhydrated page as a difference.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero text, CTA | load | ScrollTrigger, retroactive | 540431, 947153, 961870 | Shared | First-paint frames equal by eye |
| Hero media | scroll | Scrub, `.FullBleedMediaSection` none `ev_16cce3ec` | 656598, 540431 | `startPercentage` 0, scale 1.25 to 1 | `inset(0%)`, `matrix(1.0139)` at scroll 0, identical |
| CTA | hover, leave | React, `a`: `ev_c49cc613` | 892855 | Shared | Driven in the coverage window; curves verified on `/data-engine` |
| Logos | mount, below `md` | CSS animation, section none `ev_bf9c6ea3` | 970272, 922998 | 50px/s | 11.4s, equal |
| Cards, foundation, features | hover, click, scroll | None: grid `ev_fadb8f5a`, `.bg-gray-50` `ev_14071ce0`, figure `ev_e8749ba9` | static | No reveal | Pointer grid at 3 scroll depths changes nothing, both |
| Tab pill | click, arrows | gsap in effect, tablist none `ev_8567d179` | 753553 | `left`, `width`, `height`, .2s, `Power2.inOut` (not a GSAP name, so the default `power1.out` runs) | Same curve at a shifted click phase: 4, 80, 120, 193, 260 ... 479 vs 4, 88, 137 ... 479 |
| Tab | click, mousedown | React, `ev_813c39ce` | 970554 | Focuses tab, selects | Selection, focus and roving tabindex equal |
| Tab | Home, End, arrows, PageUp, PageDown, Enter, Space, Tab | Headless UI | 970554 | Wraps, activates on focus | 13-key sequence identical |
| Tab label, divider | selection | CSS | 753553 | `transition-colors` .2s, divider `scale-y-0` on selected and previous | Same. `lab` vs `oklab` serialisation of the same colour |
| Tab | hover | None | | No style change, pointer cursor | Same |
| Panels | selection | Headless UI, panel none `ev_be80b189` | 753553 | Unselected panels are placeholders | 5 panel boxes and figures equal at 1440 |
| Panels | swipe below `lg` | React `onTouch*` | 753553 | 50px threshold, no wrap | From the figure: 1, 2, 3, 2, 3, 4, 4, 4, 3, identical |
| Bullets | swipe that starts on text | Same | 753553 | Inline `li` component remounts on each state change, so the touch target detaches and `onTouchEnd` never fires. Coverage: bullet render 38, panel render 8. Kept | 3, 3, 3 (no change), identical |
| Dots | click | React, `ev_1eebac12` | 753553 | `transition-width` is not in Scale's CSS, so `all .3s` | 16, 10.4, 6.4, 4.6, 4 vs 16, 10.4, 6.4, 4.4, 4 |
| Panels | min-height below `lg` | Effect | 753553 | Measures the target while it is a placeholder, so it clears on the first change | `""`, 387.4, `pan-y`, identical |
| Video overlay | click, `lg` up | React | 647980 | `absolute inset-0 z-10`, opens modal | Box 672 x 378, pointer cursor, equal |
| Play trap | tap below `lg` | React | 647980 | First tap sets `pointer-events: none`, no modal | auto then none, equal |
| Modal | open | React | 582844 | Overlay .35s, dialog `scale(1.1)` .35s delay .55s, `body` overflow hidden, close button hidden | Opacity per 100ms identical; box 1008 x 581 at 216, 159.5 |
| Modal | Escape, click outside | `document` keydown, React | 582844 | Unmounts, overflow restored | Same |
| Pre-footer clip | scroll | Scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | 10 stops at 1440 and 5 at 390, identical strings |
| Gradient tiles | none | | Mocks | Scale's CSS has `bg-gradient-to-br`, `to-indigo-600`, `to-red-600` and no other stop for these tiles, so 2 of 6 tiles draw transparent to colour and the others nothing. Reproduced by leaving the others out | Computed `backgroundImage` strings equal |

Not on this page: drag and drop, pinned ranges, canvas, cursor effects, reveals below the hero.

## Visual check
Pairs at first paint (4 frames over 4.2s) and every 50% of the viewport with real wheel input, plus panels and modal. Clone at 1440 and 390; final fill at 1440, 1100 and 390, 21 sheets. Opened on the final fill: 4 of 9 at 1440, 2 of 5 at 390, and 1 of 3 state sheets. Clone: 5 of 9 at 1440, 2 of 5 at 390. Earlier fill sheets were opened for the same stops, before the copy rule changed. The 7 final sheets at 1100 were not opened; heights there are in the table. Pre-footer steps inside the scrub come from the numeric run, not pairs.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, reveal order. Differences by eye:
- **Foundation icons.** Scale loads them after hydration, so its figures are empty for the first seconds. Here they are inline from the first paint.
- **Pre-footer on Scale.** Its large image often shows only a top band over `#193A29` in headless runs while it loads. Not a layout effect. Same for Wistia frames at 390, blank until the iframe loads.
- **Hero headline at 390.** "Support and Voice Agents" takes 2 lines where "Donovan" takes 1, because it must match the menu label. Hero height is unchanged.
- **Player.** Filled videos use `LocalPlayer`: poster, one play button, native controls only in the modal once playing. Scale's is Wistia's player with its own bar.
- **Copy and imagery:** expected, below.

## REA evidence
- Bundle, 58 of 58 scripts: `analyze_web_bundle` `ev_f0d61a40c4d5aa581dc69fdf593442d797e96542dd18ca62e2e59555ed1436cc`. Page: `inspect_web_page` `ev_820610702d3181b5cda1fc85c41f0f0196a898cc4df271b57487e646b13edb32`.
- Listeners found: `[role=tab]` `ev_813c39ce55ad725ec8afc14f578ded6a4a7b388f4d8814369a6f47616744765a`, dots `ev_1eebac12d54cbddc0186ba4da3b07ceb6caa5b573d23a1bb7dbbf9c3143692b8`, `.FullBleedMediaSection a` `ev_c49cc6139d9f3c8fce8eae8b6bb130e42ab274188562bbaab631d27f890611d6`. Each is HubSpot `mousedown` capture plus React `click`.
- No listeners: tablist `ev_8567d179e1638e0ce20f0d8b1c415e255f5f214d4bec436520ba7859a4b7e407`, tabpanel `ev_be80b1895e70c5b3ee5f8e09ac5c78c936337fec25f400baea37586e0a6722af`, `.FullBleedMediaSection` `ev_16cce3ec942ce17d0a304484183a03f2c9d231c95f231a2f60e79888a09e8fc5`, logo section `ev_bf9c6ea37c9b0a4934cfee4356b3a4659f51a3edb574f3bf9d8a3db63070607e`, card grid `ev_fadb8f5a55a4189a6c21c9a3cf382214a7b86fe24fc0ef6e843590b60e021cf7`, `.bg-gray-50` `ev_14071ce06a4a1803ebae552ca96fe3f470faf79f921a4da9ecff4d17f5b0d4aa`, foundation figure `ev_e8749ba9055c9548374973c52d1df0764d586ab53fd2d854eabb229501aee4fd`.
- `html` `ev_2e5f4765aba08b6f44e54108158a27645d8a21bc215a338a6b8c2d5d4df11d49`: passive `scroll` (ScrollTrigger, `1h0nvyhf5gbrf.js`) and OneTrust `keydown`. `body` not run.
- Execution, 45s precise coverage on Scale with a raw CDP driver on the same target: `ev_7202d13939e8dc9e6073bc526ceb6f6ed08695d0d0b24ce762a521ae2a18da96`, read from `export_evidence_bundle`, then deleted (448 MB). Driven: wheel, all five tabs, arrows, End, Home, video overlay, Escape, click outside, both pre-footer CTAs. Counts in 753553 and 11972: panel render 8, pill effect 8, tab render 116, bullet render 38, modal toggle 2, close 2.
- Earlier windows, treat as idle or partial: `ev_6bcb2cbcd7a62570561d5d6b060edc9e0c6a538ad63935abda9ce231dbee540c` (driver failed to attach), `ev_9dd608ff639c302b8fcc1487b582112cc561ebdcfba34df9344794f7a5c9e240` (wheel only), `ev_f1e67fe9581f192fad9dcf236cc589625ba20ffe116c4b7d6ebe0e75ca3465c6` (driver ran before the window).
- Not run: `capture_browser_scenario` (coverage used instead), `observe_web_session`, `trace_web_source_location` (no maps), `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`, `export_web_scripts`. Chunks came from `curl` and REA's bundle. Playwright `connectOverCDP` timed out on the shared Chrome, so the driver talks to the page target directly.

## Deviations from Scale
- **Fonts:** see stack.md.
- **Videos:** clone keeps Scale's three Wistia iframes. Filled uses local mp4s.
- **Images replaced at fill:** `hero.webp` (military operator), `ingest.png` (vendor logos), `agent-arsenal.webp` (Scale's product). Redrawn at the same size. Removed from `public/`: recover from commit 5a6c592 to re-check the clone.
- **Agent Library image and videos:** drawn screens with support scenarios, so they read closer to the menu label than the copy beside them.
- **Footer height:** chrome, not this page. Footer below the last section differs at 1279 (1015 vs 1054), 1024 (1152 vs 1170), 768 (1511 vs 1483) and 480 (1383 vs 1422). Equal at 1920 and 1440. For the lead.

## Copy mapping
Follows Mike's copy rule and `vahue-positioning-copy-source.md` (§0, §5, §6 "/donovan: keep the platform template"), not `research.ts`. Keep first, swap a few words second, rewrite last.

Compared by script, 134 strings: 91 identical, 11 brand swap only (Scale or Donovan to Vahue), 28 changed by a few words, 4 rewritten. 76% unchanged, under the 80% aim: the page is written for defense, and the 14 strings carrying Scale's "SI" became "AI".

Swaps:
- "Super Intelligence (SI)" and "SI" to "AI": Vahue doesn't claim super intelligence. "Support and Voice Agents" in the section title, to tie the page to its menu label.
- Military: warfighters, combat, DoW, combatant command, Joint Task Force, task force, COAs and SITREPs, adversaries, the U.S., classified, Artillery, J1, DoD, Theatre. Each swapped for one or two words in place.
- SGP to "orchestration layer and connectors", from the source's control-plane language. Defense Llama to Meta Llama.

The 4 rewrites: meta title, meta description, hero headline (menu label), and the certification line (placeholder).

Kept on purpose: "mission-critical", "Agent Factory", "Agent Arsenal", "Overmatch", tab labels including "Agentic RAG" (a tab, not a headline), and CTAs "Book a Demo", "Get started" per §5.

## Placeholders
`// PLACEHOLDER` in `content.ts`: 5 logo tiles, mock output preview, 8 metric values, 8 bar widths (same values as Scale's), certification line, 3 videos, Agent Library image. No quotes or case studies on this page.

## For Mike
- **"SOC 2 Type II and ISO 27001 Certified" is a placeholder for Scale's "DISA IL4 and FedRAMP High Authorized".** It must not ship unless true.
- Public-sector lines stay where Scale has them ("our public sector engagements", per §5 and the source's vertical list). Confirm.
- GDELT, a public events dataset, stays in the mock cards and one bullet because the line can stay, but it reads public-sector. Flashpoint Chat and Mission Analyst likewise.
- The copy now leans to the agent platform, with support and voice only in the headline, section title and images. Say if you want more support words.
- Real demo videos and a real product screenshot go in the tab slots. The hero is drawn, not a photo.

## Gaps
- Real iOS not driven: touch runs through CDP. `oml:` landscape not driven. No production build measured.
- Wistia inline playback in the clone not driven past the poster.
