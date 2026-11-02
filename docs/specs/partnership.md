# /partnership

Live source: https://scale.com/partnership, read 2026-11-02 at 1440x900 and 390x844. Geometry also at 320, 640, 767, 768, 1024, 1280, 1920, for the filled page only. Menu label: Partnerships. QA sheets: scratchpad `new-qa/partnership/` (clone and filled).

## Stack
Next 16.4.2 App Router route, no page-specific library. Scale renders this page entirely on the server: the RSC payload holds plain markup for both sections, and the only client modules are the theme setter 243385, the header 511174 and the watcher 995634. No GSAP, Lenis effect, reveal or scrub belongs to the page, so nothing needed porting. See [../stack.md](../stack.md) for the chrome.

Files: `app/partnership/page.tsx`, `components/pages/partnership/` (`PartnershipPage.tsx`, `content.scale.ts`, `content.ts`, `types.ts`), `public/partnership/`.

The payload passes `border: true` to the header. The rendered header on this page has no border class, and the sheets match, so nothing was added.

## REA evidence
Private headless Chrome on 9291 (9283 was busy with another process and was left alone), closed and deleted after use.

| Tool | Scope | Evidence |
|---|---|---|
| `analyze_web_bundle`, script sources on | 48 of 48 scripts parsed, no parse failures, Next and React fingerprints | `ev_9f8aab3daf0759bf…` |
| `inspect_web_page` | Page inventory. Passive, and most sections were policy filtered without an origin list, so the HTML and RSC payload were read with `curl` instead | `ev_1d66c61d7024f96a…` |
| `inspect_web_event_listeners` | `section.PartnershipList` | `ev_a2ad6114d0d0119b…`: none |
| same | Card section | `ev_ac819ae66111b137…`: none |
| same | First card link | `ev_eabb66d5048de1d1…`: HubSpot `mousedown`, React root `click` |
| same | Second card link | `ev_2752afb3823e7935…`: same two |
| same | First card "Learn more" row | `ev_63bd95a4fd06033e…`: none |
| same | `html` | `ev_9069e1bbdf7a6317…`: OneTrust `keydown` and `click` |
| same | `body` | `ev_52923561845dbc83…`: passive `touchstart` (`1h0nvyhf5gbrf.js`) |
| `observe_web_execution`, 16 s during hover, wheel and Tab | `ev_27db9ca7c57ca493…` | Chrome and analytics modules only. Mapping ranges to modules counted 672 calls in 511174, 230 in 995634, 73 in 892855, 169 in 463059, and none in 681201 (`useScrubTrigger`) or 210104 (`useInViewTrigger`). The mapping finds module boundaries by pattern, so read the counts as indicative |

The observe response exceeded the MCP budget, so the session was exported (888 MB), the one record extracted, and the export deleted. Not used, as there is no motion or module graph to trace on this page: `capture_browser_scenario`, `trace_web_source_location`, `trace_web_module_imports`, `compare_web_captures`, `compare_web_screenshots`. Sheets were compared by eye and geometry by script.

## Sections
1. Header block (`PartnershipList`): `h1` and body, `md:flex-row`. 360 tall at 1440, 341.5 at 390.
2. Card row: 2 links, `h-[486px]`, `#839CB2` and `#A8927C`, 86px black tile with a 55x36 logo box. 566 tall at 1440, 1060 at 390.

## Interaction inventory

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Arrow | hover on the "Learn more" row, enter | CSS, `group-hover:translate-x-1`; no listener on the row, `ev_63bd95a4…` | Page markup | `translate` 0 to 4px, 300ms, `ease-out` | 2.14, 3.18, 3.63, 3.94, 4 at 67, 130, 194, 257, 323ms vs 1.77, 2.98, 3.63, 3.94, 4 at 63, 124, 187, 249, 312ms. Same curve: the start phase differs |
| Arrow | leave | Same | | Same | 2.23, 1.02, .37, .11, 0 vs 2.23, 1.02, .37, .06, 0 |
| Arrow | re-enter, then leave mid-way | Same | | Reverses from the current value | 2.26, 1.06, .30, .02 vs 2.26, 1.06, .30, .02 |
| "Learn more" row | hover | CSS, `hover:opacity-70` | Page markup | `transition-colors` does not cover opacity, so it steps | 1 to .7 and back on the first sample, both |
| Card | hover outside the row | None | | Background, transform and opacity unchanged, `cursor: pointer`, arrow stays still | Equal |
| Card | click, tap | React root `click`, `ev_eabb66d5…` | `next/link` | Client navigation | Tap at 390 reached the card's URL, both. Scale's destinations are its sub-pages; ours are in Copy below |
| Card | Tab | Native | | Browser default ring, `auto 1px rgb(0, 95, 204)` | Equal, second card next in order |
| Page | wheel | Lenis, shared | `2d7ykwtxp` | See stack.md | Stops 450, 900, 964 at 1440, equal |

No drag, tabs, carousel, pointer-move effect, reveal or scrub exists on this page: no section root has a listener and the executed code has none.

## Layout at widths, filled page vs Scale
At 1440 and 390 every section and card box is equal, apart from the arrow below. Stops at 390 are 422, 844, 1266, 1688, 1996, equal. At 320, 640, 767, 768, 1024, 1280 and 1920 the header block and card row are equal, with no horizontal scroll. At 768 the `h1` column is 232.6 wide vs 234.8 from the word "Vahue", with the total height unchanged. At 320 the second card body wraps to 3 lines vs 4, inside the same fixed card.

Footer at 320, 768, 1024: 1360.3 vs 1412.3, 1444.2 vs 1472, 1130.6 vs 1151.6. That is the shared chrome. 768 and 1024 are the known issue the lead handles; 320 was not in that note.

The clone with Scale's copy was measured at 1440 and 390 only, and was equal there apart from the arrow.

## Visual check
Sheets: `clone-1440` 7, `clone-390` 7, `filled-1440` 7, `filled-390` 7, Scale left, ours right. First paint at 700ms and 2s, then every 50% of the viewport, plus hover and focus at 1440. All opened with Read. The filled sheets are from after the last copy edit.

Found by eye:
- The arrow is longer than Scale's on every card. See Gaps.
- `h3` glyphs sit about 1px lower than Scale's at 390 with equal boxes. Font metrics.
- The second card's body is cut by `line-clamp-2` at 390 on both pages, on ours after "Vahue Support and…". Scale's cuts after "Scale GenAI…".
- The logo tile's "Logo" label is small and dim on the black tile, as a placeholder should be.

Scale's logo is a mark and ours a wordmark, as on every page. Otherwise frame by frame the two match, including rounded corners from first paint and what the header covers.

## Copy
Rule from `vahue-positioning-copy-source.md` §0. 8 visible strings: 3 verbatim after the brand swap (`h1`, both "Learn more"), 2 light (body: "model" to "agent"; second card body: "open-weight model" to "agent", product name swapped), 3 rewritten (both partner names, first card body). The 80% aim is missed because this page is mostly partner names Vahue can't claim. Of the 4 strings that aren't about a partner, 3 are verbatim and 1 changes one word.

Google Cloud and NVIDIA became partner types from the research's channel hypotheses (CRM and field-service implementers, telephony and contact-centre firms). Those are hypotheses, not partners. Scale's sub-pages `/partnership/google-cloud` and `/partnership/nvidia` return 200 live, but no such routes exist here, so the filled cards link to the products they name: `/generative-ai-data-engine` (For Back-office Sync) and `/donovan` (Support and Voice Agents).

## Placeholders
6 lines with `// PLACEHOLDER` in `content.ts`: 2 logo tiles, 2 card titles, 2 card bodies. `google-cloud.png` and `nvidia.svg` stay in `public/partnership/` for `content.scale.ts` only; the filled page does not load them.

## Gaps
- **Arrow glyph:** 14.2px wide vs 9.2px, from `font-unicode`, with Aeonik in place of Aeonik Pro. It is visibly longer. Whether our Aeonik has its own arrow or the browser falls back to `system-ui` was not checked. Other pages with this class share the gap, so it was not patched here.
- **Fonts:** Aeonik vs Aeonik Pro, see stack.md. "Learn more" is .25px narrower.
- **Colour string:** `text-black/60` computes to `lab(0 0 0 / 0.6)` on Scale and `oklab(0 0 0 / 0.6)` here. Same colour, Tailwind's serialisation.
- **Not run:** at 390 scroll stops used `window.scrollTo`, not touch input. Hover was sampled on the first card only; the second has identical markup. Keyboard Enter on a card, desktop click and the second card's row listeners were not driven. `window` listeners can't be selected by `inspect_web_event_listeners`.
- **Chrome:** not re-verified on this page beyond the sheets. Scale's OneTrust was blocked in all sessions.
