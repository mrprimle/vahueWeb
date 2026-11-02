# /about

Live source: https://scale.com/about, 2026-11-01 and 02. Stack: [../stack.md](../stack.md). Scale's strings: `components/pages/about/content.scale.ts`. Rendered strings: `content.ts`. Menu label: About.

REA, in a one-tab headless Chrome on port 9331, closed and deleted afterwards:
- `analyze_web_bundle` with sources: `ev_7e7d1607…`, 56 of 56 scripts parsed, no parse failures.
- `observe_web_execution` over 28s of real input (wheel through the page, link card hover, slider drag, tile hover): `ev_c9e14f9f…`. The result exceeded REA's response budget, so the bundle was exported (678 MB), the record extracted, its coverage read per module, and the export deleted. See "Execution coverage".
- `inspect_web_event_listeners`: see the inventory.
- `capture_browser_scenario` not run: `observe_web_execution` covers the requirement. Trace tools not needed: no source maps are shipped and modules were read directly from curl'd chunks.

## Sections

Tops and heights equal to Scale at 1440 and 390, clone and filled. Filled also equal at 589, 590, 768, 1023, 1024, 1279, 1280, 1441, 1920, apart from the two items under "Differences".

| # | Section | Module | 1440 top, height | 390 top, height |
|---|---|---|---|---|
| 0 | Hero, `pb-10! pt-24!` wrapper | 478135 non-globe branch, 540431 with `startPercentage` 0 | 39.3, 856 | 101.8, 616 |
| 1 | Section with HeadlineWithCta (mission, `h1`) | 698764, 925107 | 895.3, 482.7 | 717.8, 421.1 |
| 2 | Headquarters photo | inline in the page payload | 1378, 788.6 | 1138.8, 321.4 |
| 3 | Trusted by, SectionTitle and 4 logos | 1900, 970272 | 2166.6, 436 | 1460.2, 347.5 |
| 4 | ScrollRevealSection with CardGrid "What we do" | 756386, 540409, 874328 | 2602.6, 689.8 | 1807.7, 869.5 |
| 5 | Section with stat CardGrid, dark, `parallaxFadeOut` | 698764, 540409 | 3292.4, 792 | 2677.2, 1032.8 |
| 6 | Office carousel | 939985, CSS module 333470 | 4084.4, 336.8 | 3710, 219.4 |
| 7 | BlogPreview, 5 tiles | 808358 | 4421.1, 994.2 | 3929.4, 1360.2 |
| 8 | FullBleedMediaSection, careers | 540431 | 5415.3, 720 | 5289.6, 480 |
| 9 | Spacer | inline | 6135.3, 32 | 5769.6, 32 |

Layout changes checked by width: the slider switches at 590, 1024 and 1441 (`perView` 1.4, 2.5, 3.3, 4; loop off below 590). Cards stack below `lg`. BlogPreview switches at `lg` and drops to 4 tiles on phones. Logos become a marquee below `md`.

New here: `OfficeCarousel.tsx` (page-level port of 939985, `showVideo` false branch only) and the page's copy of the Section slice. Everything else is a shared port.

RichText catch: a plain block must be passed as `{ style, text }`. The `children` form adds a wrapper `<span>` Scale doesn't have, which changes SplitText's line boxes and made the mission and card text 2 to 7px shorter. Fixed here by using `text`. The stat descriptions keep `children` for the `highlightGray` mark; their heights are equal.

## Interaction inventory

Listeners read directly on the node. All section roots have none: animation is ScrollTrigger on Lenis, hover is CSS or React delegated.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero and careers `.FullBleedMediaSection` | load, scroll | None `ev_408367…`; `.ClipScrollSection` none `ev_82a280…` | 540431, 656598 | Hero clip start 0, careers start 10%; radius 1.5rem; image scale 1.25 to 1, `top bottom` to `center center` | 28 wheel stops at 1440, 30 at 390: `clipPath` and media transform equal in every row |
| Headline `h1` | scroll into view | `.HeadlineWithCta` none `ev_ab1a14…` | 925107, 947153 | Word opacity 0 to 1, colour from `#72ce7b` through purple to black | At 100ms steps from trigger: opacity .18, .50, .74, .87, .94 vs .24, .54, .77, .89, .95; same colour path, ours about 20 to 30ms ahead |
| Trusted by section | none | `section.py-[72px]` none `ev_db7abd…` | 970272 | Static row at `md`+; marquee below | 390: `--duration` 10.64s, 2 rows, 148px child, equal |
| What we do panel | scroll | `.ScrollRevealSection` none `ev_5a6804…` | 756386 | `scaleX` from `1 - 2*24/w`, radius 16 to 0, `top bottom` to `top top` | `transform` and radius equal in every row |
| Link cards | scroll, hover | `.LinkCard` none `ev_72ddfe…` | 874328, 317967 | No link and no hover colour on this page: `div.CMSLink`, cursor auto, background stays `#f2f2f2` | Equal; card transform and opacity equal in every row |
| Stat section | scroll | `.Section` none `ev_bbac67…`; `.Card` none `ev_7c6dc4…` | 698764 | `yPercent` 20 `power3.in`, opacity 1 to 0, `bottom 100%` to `bottom top` | Transform and opacity equal in every row (390: 27.323, .3959 at y 3375) |
| Header theme | scroll | Lenis, 995634 | 995634 | Dark over the stat section | `data-theme` equal in every row |
| Carousel | mouse drag | `.keen-slider`: click capture, dragstart, ksDrag*, mouse*, touch* `ev_31a8f7…`; `.keen-slider__slide` none `ev_bebb69…` | 939985, keen-slider | Scale's four breakpoints, `loop`, cursor grab and grabbing | 300px drag at 1440: -120, -270, release -372, -430, snap -440 on both; cursor sequence equal. 390: snap -284 on both |
| Carousel | touch drag at 390 | Same | same | 200px via CDP touch | -459 during, snap -569, both |
| Blog tile | scroll | `.BlogPreviewTile`: only HubSpot `mousedown` on Scale `ev_d57648…`, not ported | 808358 | Scale 1.08 to 1 | Within .05px of `translate` at one row, otherwise equal |
| Blog tile image | hover | CSS | 808358 | `scale` 1.05, 1000ms | 1.020, 1.034, 1.042, 1.047, 1.049, 1.05 vs 1.022, 1.034, 1.042, 1.047, 1.049, 1.05; leave 1.025, 1.012, 1.005 vs the same |
| Careers CTA | hover, focus | React, shared | 892855 | Wash and arrow 600ms | -61.2%, -34.8%, -18.2%, -7.8% vs -61.2%, -34.8%, -18.2%, -7.8%; focus ring solid 1px `#86bff2`, equal |
| Blog tiles, careers CTA | Tab | Native links | 808358, 892855 | No key handlers on the page's own sections | Real Tab from the first tile: 5 tiles (`_blank`), then 2 links with a solid 1px ring, same sequence on both. Carousel has no focus stops |

`html` (`ev_c57953…`): `scroll` from GSAP's cache bump in `1h0nvyhf5gbrf.js`, plus OneTrust `click` and `keydown`, which are not built here. `body` (`ev_a34f3e…`): ScrollTrigger's `touchstart`. CTA (`ev_0d3bee…`): HubSpot `mousedown` capture, not built, and React root `click`. Window listeners can't be selected by REA's CSS match, so they weren't read on this page; the Lenis ones are in `_chrome.md`.

### Execution coverage (`ev_c9e14f9f…`)

Read per module over the driven window: 808358 `onUpdate` and the 1.08 to 1 setter 207 calls, `onToggle` 14; 756386 `onUpdate` 51; 540431 media `onUpdate` 16; 656598 clip update 16; 947153 split and intro paths ran once each; 970272 logo render ran on load. Module 939985 reported no executed functions in this window, so that run did not confirm the drag callbacks; the drag was then proved by separate Playwright sampling (cursor flips to `grabbing` and slide positions match, table above). I did not establish why coverage missed them: either the driver's drag missed the slider in that session, or a second copy of the module ran.

## Visual check

Sheets in `new-qa/about`: `clone-1440` 5, `clone-390` 3, `filled-1440` 5, `filled-390` 3. Three first-paint moments, then every 50% of the viewport with real wheel input, Scale left, ours right. All opened with Read.

The filled sheets were taken before the last copy edit (Evaluations card back to Scale's wording, "agent" to "model"), so that card still reads "agent" in them. Geometry was rechecked after the edit at 1440, 390 and 767.

Found by eye, not by numbers: nothing structural. Frame by frame the two match, including rounded corners from first paint and what the header covers.

## Differences

- **767 only, filled:** "What we do" is 25.9px shorter. The third card's text wraps to 2 lines, on Scale 3, as "scale-ups" is shorter than "governments". Checked at 589, 590, 767, 768: only this one narrow band showed it. The exact start of the band was not measured.
- **768, 1023, 1024:** page bottom 21 to 28px off with all sections equal, so it is the footer. Known shared issue, the lead's.
- **First paint:** at 700ms Scale had no announcement bar in one run and ours did; at other runs both had it. Known shared issue, the lead's.
- **Carousel images:** ours are sharper than Scale's on phones. Scale asks Next for `sizes="30vw"`, which yields a very soft image at 390. Ours use `unoptimized` local files at 1024 wide. Kept: it only looks better.
- **Fonts:** see stack.md. No line-wrap change on this page.
- **Logo tiles:** neutral tiles at Scale's boxes (100x20, 108x18, 72x37, 60x24).
- **Blog tile links:** press links are removed and go to `/blog`, still in a new tab as on Scale.

## Copy

Rule from `vahue-positioning-copy-source.md` §0. 41 strings: 15 verbatim after the brand swap, 24 changed lightly, 2 rewritten (both placeholder press titles). Of those, 23 are placeholder facts or press. Among the 18 strings that are real copy: 10 verbatim, 8 light, and 127 of 146 words kept (87%). Scale's About is mostly about labs, governments and training data, so whole-string verbatim sits below the 80% aim, while word-level sits above it.

Changed lines worth checking: "the world's most important workflows" (footer already uses it, and "work" lost a line at 768), "the world's busiest teams" ("workflows" wrapped to 2 lines at `md`+), Scale's "Data at Scale" became "Context Engine" (the brand pun has no equivalent; matches the menu), governments became scale-ups, "Contributors" became "Experts".

## Placeholders

22 `// PLACEHOLDER` lines in `content.ts`: headquarters image, alt and caption (3), logos (4), stats (5), office alts (5), press tiles (5). "2016" matches the home page's placeholder.

Images: the San Francisco skyline became a neutral interior crop. CEO portraits, the Axios and HumanX stages and the Mayo Clinic building became neutral photos from this and other pages' assets. Hero, carousel and pre-footer are still Scale's own office photos, with no brand in them.

## Gaps

- Mike to supply real office photos: the page now captions Scale's interiors as Vahue's.
- No `/news` route exists, so press tiles point at `/blog`.
- `tsc` passed with no errors. It ran with memory at 36%, under the 40% gate, by my mistake; it finished in about 4s.
