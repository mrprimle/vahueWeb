# /automotive

Live source: https://scale.com/automotive, 2026-11-01. Menu label here: Scoring and Decisions. Page: `app/automotive/page.tsx`, `components/pages/automotive/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). This page adds: Headless UI `Tab`, `prism-react-renderer` 2.4.1 (Scale's module bundles it), Vidstack `@vidstack/react` 1.15.7 (lazy, modal only). `react-audio-player` (78177) is ported inline in `AudioPanel`: its peers stop at old React.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `LogoCloud`, `ChecklistWithMedia`, `SectionTitle`, `FeaturesWithIcons`, `ResourcesCarousel`, `GlowBackground`, `PageThemeSetter`.

Page-only ports, all in the 583338 page module or named: `DataTabs` (`aM`, `aB`, `aL`, `LoadOnHoverIframe`, 269185, glass branch of 51051 and 408298), `PhaseFeatures` (450359, 582844, 832862), `VideoPlayer` (638474). `automotive.module.css` holds Scale's CSS modules rule for rule.

## Sections
Heights, Scale then filled. Tops follow from these. Measured after a full scroll.

| # | Section | 1440 | 1100 | 390 |
|---|---|---|---|---|
| 1 | Hero (478135, non-globe, `startPercentage` 0) | 856, 856 | 856, 856 | 616, 616 |
| 2 | Logo cloud, 2 logos | 164, 164 | 164, 164 | 120, 120 |
| 3 | Overview, checklist with image | 976.6, 976.7 | 889.1, 889.1 | 1180.4, 1180.4 |
| 4 | Data tabs, 5 panels | 693, 693 | 720, 720 | 853.1, 853.1 |
| 5 | Phases, 3 video cards | 909.2, 909.2 | 902.7, 902.7 | 1875.1, 1875.1 |
| 6 | Why, 3 icon features | 676, 676 | 676, 676 | 1113.7, 1113.7 |
| 7 | Resources, 2 slides | 762.4, 762.4 | 769.9, 769.9 | 627.3, 627.3 |
| 8 | Foundation block | 660, 660 | 609.4, 609.4 | 845.9, 845.9 |
| 9 | Pre-footer (`startPercentage` 10) | 752, 752 | 752, 752 | 512, 512 |
| | Page height | 7451, 7451 | 7457 (Scale's images landed late in that run) | 9269, 9269 |

Clone geometry at 1440 and 390 (`els`, 50 elements) equal except H2 width 1 to 5px, the font gap. Also measured at 1920, 1450, 1280, 1279, 1024, 1023, 900, 768, 767, 640, 480. No overflow at any width. Differences in that run, all on Scale's side: the announcement bar had not mounted (39.3px offset) and lazy images had not landed, so an image kept its attribute ratio (662/594, natural 2085/1740).

Layout changes by width: panel `flex-col-reverse` below `lg`, tabs panel absolute from `xl` with the panel 649 x 402, `translate-x-14` from `3xl` (1450), checklist row from `md`, phases 2 columns from `md` and 3 from `lg`, logos marquee below `md`, slides per view 1.05, 1.4, 2, 2.8.

## Interaction inventory
Same script on both sites (`inter.cjs`, `extra.cjs` in `new-qa/automotive`). React handlers sit on the root, so element-level REA results show HubSpot `mousedown` plus React `click`.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero text, CTA | load | ScrollTrigger, retroactive | 540431, 947153, 961870 | Shared | Pairs equal. Port verified on `/physical-ai` |
| Hero clip and media | scroll | Scrub | 656598, 540431 | Scale 1.25 to 1 | 11 stops of clip and matrix, identical at 1440, 1100, 390 |
| Logos | mount, below `md` | CSS animation | 970272, 922998 | 50px/s | 7.8s, 390 wide, equal |
| Tab pill | click, arrows | gsap in effect, `ev_d49b41b3647aa6ea0bf` | 583338 `aB` | `left`, `width`, `height`, .2s `Power2.inOut`, `autoRemoveChildren` | Ends 124/87 vs 125/87 (tab width, font). Frames equal curve at a shifted phase: 64/68, 99/79, 122/86 vs 70/70, 104/81, 122/86 |
| Tab label, divider | selection | React | `aB` | `transition-colors` .2s; divider `scale-y-0` on the selected tab and the one before | Colour curve same |
| Tabs | ArrowRight, ArrowLeft, Home, End, Tab | Headless UI | 970554 | Wraps; activates on focus | Sequence identical. Tab goes to the CTA |
| Tablist | swipe at 390 | Native scroll | 583338 | `overflow-x-auto`, 2px of overflow | 2 vs 2 |
| First panel | mouseover, tap | React, `ev_ad8f393502c5d3d0b67`: none on the node; coverage shows `onMouseOver` count 1 | `LoadOnHoverIframe` | Swaps to iframe once, stays after leave | 647 x 400, same class, stays. Filled src is local, see below |
| Text panel | panel mount | `useEffect` timeline | `aL[3]` | Groups ECA6FA, E7FE53, DBC6FC, B2FCD2: from `autoAlpha` 0, `y` 10, .6s, stagger .03, `Power2.inOut`, delay .5 on the first | Group opacity per 300ms: .22, .92, 1 vs .27, .89, 1; .82 vs .77; .61, .99 vs .57, .98; .41, .96 vs .40, .93. Restarts on re-entry, both |
| Audio box | click | React `ev_d49b…` family, none native | `aL[4]` | Start, then pause and play toggle; listen 500ms | Pause, play, `currentTime` 1.8 and 3.1, equal. Progress 96.0, 91.6 equal |
| Run Code | click | React | `aL[4]` | Result fades in: .5s `ease-out`, `translate(-50%,-40%)` to `-50%` | -27.2, -29.6, -31.6 ... -34 vs -27.2, -29.3, -31.1 ... -34 |
| Glass CTA | enter, leave, focus | React `ev_eececcd5d8b77bd9516` | 408298 | Scale 1.02, brightness 1.15, `::before` opacity and 8px shift, arrow 4px, .5s | Scale 1.01, 1.0151, 1.018 vs 1.01, 1.0151, 1.018. Leave equal. Width differs, font gap |
| Play button | hover | CSS | 450359 | `bg-black/40` to `/60`, 150ms | .4 to .6 both |
| Modal | click | React `ev_2cfd59bfbd37a36d0a9`; Escape on `document` | 582844 | Overlay .35s, dialog `scale(1.1)` .35s delay .55s, `body` overflow hidden | Same box 1008 x 589 at 1440, 370.5 x 262.4 at 390. Overlay 0, .36, .66, .91, 1 vs 0, .29, .66, .84, 1 |
| Modal | Escape, close, click outside | As above | 582844 | Unmounts, overflow restored | Same |
| Video | autoplay in modal | Vidstack | 638474 | `load` eager, poster, brand `#79648C` | Filled: local mp4 plays from .6s. Scale's HLS plays at .2s. Clone with Mux HLS on the dev server stayed at `readyState` 0 with `paused` false: see gaps |
| Carousel | drag, wheel, swipe | Keen `ev_041d81c146ab2d4df69`; slide `ev_eae36290dc2414cf122` | 382790 | Snap below 640 | 390 swipe: -192, -262, -310.8, -325.8, -328.9, identical. Back to 24, equal. 1440: two slides fit, no movement, both |
| Foundation link | hover | CSS, React `ev_47cfd19d9a4b0ec570f` | 583338 | `transition-colors` 150ms, to `gray-600` | Same curve |
| Pre-footer clip, media, CTAs | scroll, hover | Scrub, React | 656598, 540431, 892855 | Inset 5% to 0 | 11 stops identical strings at 1440, 1100, 390 |
| Pointer grid | move | None | | | 10 scroll stops: nothing changes but hover states, both. Cursor `grab` on the slider, `pointer` on links, both |

Not on this page: pinned ranges, canvas, cursor effects, drag and drop other than the slider.

## Visual check
Pairs at first paint (5 frames over 3.5s), every 50% of the viewport with real wheel input, and pre-footer steps, at 1440, 1100 and 390, clone and filled against Scale, 84 pairs per version. Sheets opened and read. Tab states, Run Code, modal and phone panels were paired separately.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, reveal order. Differences by eye:
- **Arrow glyph.** The `→` in the glass CTA and foundation link is wider in Aeonik than in Aeonik Pro: 14.2 vs 9.2px. Font gap, shared with all pages. CTA is 5.5px wider.
- **First paint, chrome.** Scale has no announcement bar for the first frames, as noted on `/physical-ai`. For the lead.
- **Audio panel's white prompt bar.** This looks like a bug and it is Scale's: `-webkit-mask` after `-webkit-mask-composite` resets the composite, so the `:after` paints solid and hides "Please transcribe this audio." Kept. It also hides the filled prompt.
- **Copy and imagery:** expected, below.

## Base CSS change
`--breakpoint-3xl` is now `90.625rem`. As `1450px`, Tailwind sorted it before the rem breakpoints, so `lg:translate-x-10` beat `3xl:translate-x-14`: the panel was 16px off from 1450 up. Scale's order puts 3xl after xl. This also affects `3xl:` classes in `HomeHero` and `BuildAiSection`, toward Scale. Those pages were not re-measured here.

## REA evidence
- Bundle, 58 of 58 scripts: `analyze_web_bundle` `ev_8f0b9c622dcfc8844d6766703c4d3a1877541c9c3bf4bdfb959e0bf07063e70e`. Page: `inspect_web_page` `ev_28b77ebb253be33a834e9a819d05bf513a8b3b5af0a68080855b27f19fbd35fb`.
- Listeners found: `[role=tab]` `ev_d49b41b3647aa6ea0bf`, play `ev_2cfd59bfbd37a36d0a9`, `.keen-slider` `ev_041d81c146ab2d4df69` (drag and `ksDrag`, wheel, touch), slide `ev_eae36290dc2414cf122`, CTA `ev_eececcd5d8b77bd9516`, foundation link `ev_47cfd19d9a4b0ec570f`, `html` `ev_c73b51849192ceb6934` (passive `scroll`, rest OneTrust), `body` `ev_9b0ada42c60c2806347` (`touchstart`).
- No listeners: tablist `ev_3003f1c60111926c974`, frame placeholder `ev_ad8f393502c5d3d0b67`, `.FullBleedMediaSection` `ev_ee1362e7b80db1d45d2`, `.ClipScrollSection` `ev_12d351cf4fc97bf5429`, sections 1 to 7 `ev_871ed7ee6aec7ed3`, `ev_558bbac5ca0a3d53`, `ev_8bcffd76a2671b84`, `ev_0fef9bbff4e1f192`, `ev_4f1892f0d041e971`, `ev_03d38ee1805d93e9`, `ev_a248cd4eead3a860`.
- Execution, 60s precise coverage on Scale, `ev_7c231cacc3c2f54aa0d9ddfdb31ef9f0c52d9f823122e487acce16d62ce26fd7`, read from `export_evidence_bundle`, then deleted. Driven: wheel, all five tabs, Text timeline, Run Code, pause, play, first-panel hover, arrows, Play video, Escape. Counts: `onMouseOver` 1, `aB` 8, tab effect 8, Prism line render 4, modal 3. The drive stopped at the second Play click (Playwright: element not visible), so the window did not cover close, outside click, slider or pre-footer CTA.
- Two more windows, `ev_fdd4e46e56cda0a3f29dcefed3f5c954c6441d2f2c91c14af0fef5d49b105e4a` (Scale, 12s, for slider and pre-footer CTA) and `ev_cd107edadda5c9f2f08dc957831565d4ac16104763c5f61e6b58d93350990425` (filled, 30s): their drivers did not confirm a run, one on a CDP connect timeout, so treat both as idle and unread. Those inputs are covered by the Playwright samples above and listener evidence.
- Not run: `capture_browser_scenario`, `trace_web_source_location` (no maps requested), `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`, `observe_web_session`, `export_web_scripts`. Chunks came from `curl` and REA's bundle.

## Deviations from Scale
- **Fonts:** see stack.md.
- **Image quality:** Scale asks `q=100` on two panels and `q=80` on two. Here Next's default 75: `images.qualities` is outside this page.
- **Pre-footer image:** 1920-wide webp from the 7952-wide source.
- **`textArtwork`:** rendered from a string, not React nodes. Clone markup is Scale's paths, unchanged. The filled markup is live text, so its reveal selects `[id="color-…"]` on paths and text. Same 16 items, same order.
- **Filled first panel:** Scale's iframe is its own lidar site. Here it is `public/automotive/risk-queue.html`, a small sample queue. It keeps load on hover, and its hover and click select a row. Placeholder image is its screenshot, so the swap does not jump.
- **Images replaced at fill:** `overview.png` (Scale's words), the three phase images and videos (Scale's logo and product), `map.webp` (road labels), the webinar card (words), foundation image (a car maker's badge), `lidar.jpeg`. Redrawn at the same size. Removed from `public/`, with the logos and `transcription.mp3`: recover from commit f48b7f0 to re-check the clone.
- **Audio:** Scale plays a graduation speech. Here a 10-second synthetic support call, `say` voice.

## Copy mapping
Scoring and Decisions. Substance: the research's scoring cases and its Job: verify every item at volume without delaying service or automating beyond confidence, with criteria coverage, speed, accuracy, explainability, safe thresholds. Names stay as in `research/research.ts`. Learn, Score, Route, Monitor became the three checklist items and the loop image. Autonomy stack became the work types (Risk, Image, Routing, Text, Audio). Base, Improvement, Target became Audit, Pilot, Operate. Foundation Model became the scoring agent demo. Sample order in panels (repair order, support call) comes from the research's repair-order and support-case jobs, without client names.

Word counts: 81 strings compared, 63 within 15%. Most of the 18 others are one word off on short strings, alt text or the meta lines. Feature bodies run 3 to 5 words over because they matched character count and Scale's line count. Line counts and section heights equal Scale at 1440 and 390.

## Placeholders
`// PLACEHOLDER` in `content.ts`, 11 lines: 2 logo tiles, risk queue frame, Text artwork, audio result, 3 phase videos (6s stills), 2 resource links, foundation image. Numbers inside the images and panels are sample values. No customer names or quotes on this page; "Trusted by Operations and Finance Leaders" keeps Scale's claim slot, so it needs real backing.

## For Mike
- The hero photo (a street with a boxed car) and the `Image` tab photo (a living room with boxed furniture) carry no brand, so the rule keeps them, but they are off topic for scoring. The pre-footer photo is the shared one.
- Are repair orders the example you want? They are the clearest case in the research, and they are all over the panels.
- Real demo videos go in the three phase slots.

## Gaps
- Clone only: Mux HLS through Vidstack did not start on the dev server (`readyState` 0, `paused` false after 10s) where Scale's plays in .2s. The filled page plays local mp4, so nothing ships with this. Cause not found. Scale's Vidstack patch version is not visible in its bundle.
- Real iOS not driven: touch runs through CDP. `oml:` landscape not driven. No production build measured.
