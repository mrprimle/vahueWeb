# /labs/leaderboard (labs.scale.com/leaderboard)

Live source: https://labs.scale.com/leaderboard on 2026-11-02, 1440x900 and 390x844, plus 640, 768, 1024, 1280, 1450. Stack: [../stack.md](../stack.md), section labs.scale.com. Chrome: [labs.md](labs.md). Scale's strings and data: `components/pages/labs-leaderboard/content.scale.ts`. Rendered: `content.ts` beside it. All data is a static snapshot; `?category=` is read on the server, nothing is fetched at runtime.

## Sections
Page is module 218341 `Home` in `2jo7h7vmxpuz6.js`, server-rendered from a flight payload of 45 boards. No reveal, no Lenis (wheel 500 lands on 500 at once on both). Heights equal to Scale at 390, 640, 768, 1024, 1280, 1440, 1450, clone and filled, measured on every section and all 20 cards.

| Section | 1440 | 390 | Notes |
|---|---|---|---|
| Hero | 555.56 | 570.55 | `[heading]`, h1, body, CTA, two stats |
| Tabs and panel, All | 2419.5 | 7877 | 20 cards, 3 / 2 / 1 columns at `lg` / `sm` |
| Agentic, Safety, Workflow panels | doc 2542, 1862, 2483 | doc 5644, 2847, 5511 | 9, 2, 9 cards, no bottom padding unlike All |
| Three features | 256.5 | 614.5 | Mountain, PencilRuler, Shield |
| Deprecated | 88 closed | 88 closed | Opens to 3085 / 9508.5 on Scale (25 boards); 2755 / 9150 here (24) |
| Evaluate | 335 | 413 | Mailto, button, dialog |
| Footer | 175 | 283 | From the labs chrome |

## Interaction inventory
REA: `analyze_web_bundle` `ev_82b00229…` (10 of 22 scripts within 20s, see Gaps), page `inspect_web_page` `ev_bf78c57f…`, execution during wheel, tabs, tooltip, CTA, switch and dialog `observe_web_execution` `ev_5798e01e…` (14s, one-tab Chrome on 9271 driven through CDP; response over the 10 MB stdio budget, record retained, code read from chunks instead). Listeners: `html` `ev_54dc6089…`, `body` `ev_b25340f0…`, CTA `ev_9180b995…`, tablist `ev_e68893a6…`, card link `ev_74217235…`, switch `ev_65cdd582…`, model name `ev_89cfc46d…`, `#leaderboards` `ev_16b8538a…`, `#deprecated` `ev_330b3fc5…` (all 0, React delegated); tab `ev_8238ed69…`, bar `ev_e3badc6a…`, warning button `ev_9817ce0a…`, info `ev_c17f231d…`, Evaluate `ev_b5aec0ec…` (React's noop click in `3k3q0u73winx8.js`); tabpanel `ev_ff8e6943…` (Presence animation listeners in `2ri_cj1i8zivb.js`).

| Element | Input | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|
| Start Exploring | click | 218341 | `#leaderboards` `scrollIntoView` smooth, `scroll-mt-20` | Ends 533, top 79.56, equal; frames within sample phase |
| Tab | mousedown, focus, Enter, Space | 795322, Radix Tabs | Selects; click only writes the URL (`replaceState`, `?category=`, none for All) | Heights, counts and URLs equal |
| Tab list | arrows, Home, End, PageUp, PageDown | Radix RovingFocus | Loop on; Up and Down ignored; keyboard selection leaves the URL | Same sequence: Agentic, Agentic, Workflow, All, Enter writes, Shift+Tab out |
| Tab focus | Tab | 795322 | White 2px, `rgb(18,18,18)` 4px | Equal |
| Page order | Tab | | CTA, active tab, panel, first card, then its tooltips | Equal |
| Card | hover | CSS | Background to neutral-100 and label to ink over .2s, underline at once (`html.loaded *`) | rgb 255, 251, 246, 245 at 80ms steps vs same in lab() |
| Model name | hover | 41336 | Tooltip 300ms, side top, offset 5 | Opens at 300, 117,772 for the same name; 176 wide, 35 tall |
| Bar | hover | 41336 | Tooltip 300ms, offset 4: Score, ±, Range | 209,752, 169.75 x 77 equal |
| Warning button | hover, click, tap | 41336 | Tooltip 0ms, 400 wide; press closes, click reopens, no navigation | 484,401 clone; 0,310,358 x 98 on tap at 390 equal |
| Info | hover, click | 218341 | Tooltip 700ms (provider default); press closes | Opens at 700; 643,339, 400 x 98 clone |
| Tooltip | move to it, leave, Esc, scroll, re-enter | Radix Tooltip | Grace polygon; Esc and scroll close; 300ms skip window | All equal. No animation on Scale (no `animate-in` CSS) |
| Switch, label | click | 218341, Radix Switch | Colour .2s, thumb 20px at once | Mid-frame rgb(172,172,173) both, then rgb(24,24,27) |
| Deprecated grid | toggle | 218341 | `mt-12`, same grid; `Icon` branch never renders (lucide forwardRefs fail its typeof test), flags do, grayscale | All 25 cards equal in clone; 5 flags 20 x 20 |
| Evaluate | click | 385368 | Dialog 672 wide, Radix focuses Submit | 384,146.25, 672 x 607.5; all field rects equal at 390, 480, 640, 767, 768, 1440 |
| Form layout | width | CSS module `94toCW` | Two columns only from 1024, 32 under rows, 24 under singles, legal 14/21 from 768, 16/24 below | Equal |
| Form | Submit empty, bad email | HubSpot | Error text under fields, height unchanged; email error has no 2.39px offset | Text boxes within 1px, copy equal |
| Dialog | Esc, overlay, close | LabsDialog | Closes; focus returns to the button | Scale drops focus to body; ours returns it |

## Deviations from Scale
- **Radix:** Tabs, Tooltip and Switch are not installed (the brief keeps agents out of `package.json`). `LabsTabs.tsx` and `LabsTooltip.tsx` port the behaviour above, including Radix's hull and pointer-in-polygon. Position is flip plus clamp, not floating-ui.
- **HubSpot:** rebuilt from measurements, sends nothing. Valid submit shows the thanks text. **Mike needs a form backend.**
- **Detail pages:** Scale links each card to `/leaderboard/<id>` (full tables, `?tab=`). They are not built. Filled cards link to `/labs/leaderboard`.
- **Data:** only the top 3 rows per board are kept, the only ones the cards show. Bar colours are stored resolved (module 371198); checked against all 60 bars in the server HTML, 0 differences.
- **Tab width:** "Workflow" is 10.4px wider than "Frontier", so the tab list is 256.6 wide, not 246.2. Heights unaffected.
- **URL:** the Workflow tab still writes `?category=frontier`, Scale's internal value.
- **Fonts, arrow:** same as `/labs`. Submit is 1.4px wider, `→` glyph.
- **Header mount:** in the layout here, inside the page on Scale. Same geometry, `text-xs` wrapper starts below it.

## Copy mapping
Keep rule, counted path by path against `content.scale.ts`, without score rows and URLs: 137 strings, 85 verbatim after Scale to Vahue, 49 light, 3 rewritten (IntakeBench body, Fortress body, OnboardBench body). Verbatim share is 62%, below the 80% aim: this page's text is mostly benchmark names and one-liners about coding and models, which the swap dictionary sends to evals, agents and workflows. Hero title and CTA, Scaling with Human Expertise, HiL-Bench, MCP Atlas, AudioMultiChallenge, Professional Reasoning, Remote Labor Index and MultiChallenge stay as they are. Menu name applies: `[AGENT EVALS]`. First five boards match the names `/labs` lists. Niche topics replaced: Fortress (national security), SciPredict, TutorBench, DrugDiscoveryBench, DistressBench (crisis support).

Score rows: 132 rewritten as placeholders. Scale's rows name real models with real results, so fake scores would have read as claims about those products. Labels are neutral (`Model A` to `Model J`, `Agent Run`, `Agent Kit`); numbers and bar lengths stay Scale's so the layout holds; warnings use the vendor-neutral wording.

## Placeholders
182 `// PLACEHOLDER` lines: 132 score rows, 44 board names, 2 descriptions (`PartnerCo`, 82 tasks), 3 hero stat lines (20+, 100+, the labs list), the contact address. Deprecated boards: 24 of Scale's 25 (`Humanity's Last Exam Text Only (Preview)` dropped), the brief's cap on long lists.

## Gaps
- `analyze_web_bundle` returned 0, 2 and 10 of 22 scripts at 0.5, 4 and 20s on a busy machine; the rest were read with curl (`37yhmp3ou6exv.js`, `2jo7h7vmxpuz6.js`, `2ri_cj1i8zivb.js`, `3j59e9cio-0ok.css`). A 30s curl truncated the 812 KB chunk once, so retry large chunks with a longer timeout.
- `inspect_web_page`: section status `policy_filtered`, only the script and resource counts read.
- `capture_browser_scenario`: not run, `observe_web_execution` covers the requirement and `/labs` saw it fail with `cleanup_failed`. `compare_web_screenshots`, `trace_web_module_imports`, `trace_web_source_location`, `export_web_scripts`: not used, no source maps and Turbopack ids are not ES imports.
- `prefers-reduced-motion`: not sampled here; handled by the shared chrome rule.
- Search: the other 15 live boards are added to `searchIndex.ts`; deprecated boards are not, as on the page's default state.
- QA sheets are outside the repo (scratchpad `new-qa/labs-leaderboard/`: `clone/sheets`, `filled/sheets`, `interact`); all opened.
